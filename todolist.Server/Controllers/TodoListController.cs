using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
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
        [SwaggerOperation(Summary ="Retrives all Todo list")]
        [SwaggerResponse(200, "Returns the list of Todo items", typeof(IEnumerable<TodoItem>))]
        [SwaggerResponse(204, "No content available")]
        public IActionResult Get() {
            var db = new nDbContext();
            db.Database.EnsureCreated();
            var todoList = db.TodoItems.Select(s => s).OrderByDescending(s => s.Id);
            if (!todoList.Any()) return NoContent();
            return Ok(todoList);
        }
        [HttpPost]
        [Route("Create")]
        [SwaggerOperation(Summary = "Creates a new Todo item.",Description ="Post json data from the request body. Id is auto generate.")]
        [SwaggerResponse(201, "Todo item created successfully")]
        [SwaggerResponse(400, "Invalid input data")]
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
        [SwaggerOperation(Summary = "Retrieves a specific Todo item by ID")]
        [SwaggerResponse(200, "Returns the requested Todo item", typeof(TodoItem))]
        [SwaggerResponse(404, "Todo item not found")]
        
        public IActionResult Get(
            [SwaggerParameter( Description = "The ID of the Todo item to retrieve", Required = true)]
            int id)
        {
            var db = new nDbContext();
            db.Database.EnsureCreated();
            var Item = db.TodoItems.Where(s => s.Id == id).Select(s => s);
            if (!Item.Any()) return NotFound();
            return Ok(Item);
        }

        [HttpPost]
        [Route("Update/{id}")]
        [SwaggerOperation(Summary = "Updates an existing Todo item by ID")]
        [SwaggerResponse(200, "Todo item updated successfully")]
        [SwaggerResponse(400, "Invalid input data")]
        [SwaggerResponse(404, "Todo item not found")]
        [SwaggerResponse(500, "Internal server error")]
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
        [SwaggerOperation(Summary = "Deletes a specific Todo item by ID")]
        [SwaggerResponse(200, "Todo item deleted successfully")]
        [SwaggerResponse(404, "Todo item not found")]
        [SwaggerResponse(500, "Internal server error")]
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
