using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using todolist.Server.Dto;
using todolist.Server.Models;

namespace todolist.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAllOrigins")]
    public class TodoListController : ControllerBase
    {
        private readonly ILogger<TodoListController> _logger;
        public TodoListController(ILogger<TodoListController> logger)
        {
            _logger = logger;
        }



        private (bool flowControl, IActionResult value) ValidateDto(TodoItemDto dto)
        {
            if (string.IsNullOrEmpty(dto.Title))
            {
                return (flowControl: false, value: BadRequest("The Title field is required."));
            }
            if (string.IsNullOrWhiteSpace(dto.Title))
            {
                return (flowControl: false, value: BadRequest("The Title field cannot be empty or whitespace."));
            }
            if (dto.StartDate > dto.EndDate)
            {
                return (flowControl: false, value: BadRequest("The StartDate cannot be later than EndDate."));
            }

            return (flowControl: true, value: null);
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult Get() {
            var db = new nDbContext();
            db.Database.EnsureCreated();
            var todoList = db.TodoItems.Select(s => s).OrderByDescending(s => s.Id);
            if (!todoList.Any()) return NoContent();
            return Ok(todoList);
        }
        [HttpPost]
        [Route("Create")]
        public IActionResult Post([FromBody] TodoItemDto dto)
        {
            (bool flowControl, IActionResult value) = ValidateDto(dto);
            if (!flowControl)
            {
                return value;
            }

            var db = new nDbContext();
            db.Database.EnsureCreated();
            var Item = new TodoItem
            {
                Title = dto.Title,
                Description = dto.Description,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
            };

            db.TodoItems.Add(Item);
            db.SaveChanges();
            return StatusCode(201);
        }

        
        [HttpGet]
        [Route("GetItem/{id}")]
        public IActionResult Get(int id)
        {
            var db = new nDbContext();
            db.Database.EnsureCreated();
            var Item = db.TodoItems.Where(s => s.Id == id).Select(s => s);
            if (!Item.Any()) return NotFound();
            return Ok(Item);
        }

        [HttpPost]
        [Route("Update/{id}")]
        public IActionResult Post(int id, [FromBody] TodoItemDto dto)
        {
            (bool flowControl, IActionResult value) = ValidateDto(dto);
            if (!flowControl)
            {
                return value;
            }
            var db = new nDbContext();
            db.Database.EnsureCreated();
            var Item = db.TodoItems.Where(s => s.Id == id).FirstOrDefault();
            if (Item == null) return NotFound();
            Item.Title = dto.Title;
            Item.Description = dto.Description;
            Item.StartDate = dto.StartDate;
            Item.EndDate = dto.EndDate;
            db.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var db = new nDbContext();
            db.Database.EnsureCreated();
            var Item = db.TodoItems.Where(s => s.Id == id).FirstOrDefault();
            if (Item == null) return NotFound();
            db.TodoItems.Remove(Item);
            db.SaveChanges();
            return Ok();
        }
    }
}
