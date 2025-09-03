using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using todolist.Server.Controllers;
namespace Webapi.Test
{
    public class TodoListControllerTest
    {
        [Fact]
        public void GetAllTodoLists_ShouldReturnAllTodoLists()
        {
            var controller = new TodoListController(new LoggerFactory().CreateLogger<TodoListController>());
            var result = controller.Get();
            Assert.IsType<OkObjectResult>(result); 
        }
        [Fact]
        public void GetTodoListById_ShouldReturnNotFound()
        {
            var controller = new TodoListController(new LoggerFactory().CreateLogger<TodoListController>());
            var result = controller.Get(2);
            Assert.IsType<NotFoundResult>(result);
        }
        [Fact]
        public void CreateTodoList_ShouldReturnBadRequest_WhenTitleIsMissing()
        {
            var controller = new TodoListController(new LoggerFactory().CreateLogger<TodoListController>());
            var dto = new todolist.Server.Dto.TodoItemDto
            {
                Description = "Test Description",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(1),
            };
            var result = controller.Post(dto);
            Assert.IsType<BadRequestObjectResult>(result);
        }
        [Fact]
        public void CreateTodoList_ShouldReturnBadRequest_WhenTitleIsWhitespace()
        {
            var controller = new TodoListController(new LoggerFactory().CreateLogger<TodoListController>());
            var dto = new todolist.Server.Dto.TodoItemDto
            {
                Title = "   ",
                Description = "Test Description",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(1),
            };
            var result = controller.Post(dto);
            Assert.IsType<BadRequestObjectResult>(result);
        }
        [Fact]
        public void CreateTodoList_ShouldReturnBadRequest_WhenStartDateIsAfterEndDate()
        {
            var controller = new TodoListController(new LoggerFactory().CreateLogger<TodoListController>());
            var dto = new todolist.Server.Dto.TodoItemDto
            {
                Title = "Test Title",
                Description = "Test Description",
                StartDate = DateTime.Now.AddDays(2),
                EndDate = DateTime.Now.AddDays(1),
            };
            var result = controller.Post(dto);
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
