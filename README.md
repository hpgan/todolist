# ToDoList
Objective: Build a To-do List Web API with .NET, using clean architecture principles. If possible, add a basic React frontend to interact with the API.

This is a technical assessment requested by TG Malaysia.

## Web API (Backend):


-  [x] Endpoints: Implement a RESTful API with endpoints for managing a To-do List (Create, Read, Update, Delete).  
       [TodoListController](todolist.Server/Controllers/TodoListController.cs)
       

-  [x] Swagger: Add Swagger (OpenAPI) documentation to the API to provide an interactive interface and detailed documentation of each endpoint.

-  [x] Clean Architecture: Structure the solution with layers such as Core, Application, Infrastructure, and API to maintain separation of concerns.
       [Presentation layer](todolist.client)  
       [Application layer](todolist.Server/Controllers)  
       [Infrastructure layer](todolist.Server/Models)  

-  [x] Data Storage: Use a lightweight database (SQLite or in-memory) for storing to-do items.  
       [Auto create local sqlite database](todolist.Server/ToDoList.db)

-  [x] Validation: Ensure input validation (e.g., to-do item content cannot be empty).

-  [x] Unit Tests: Cover core business logic with unit tests.

## Frontend (Good to have): React UI: If implemented, create a basic React frontend to:

-  Display a list of to-dos.

-  Add, update, and delete to-dos items.

-  API Integration: Ensure the frontend interacts with the backend API using HTTP requests.

-  User Experience: Create a simple and functional UI design for the user to manage to-dos.
