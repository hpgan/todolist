# ToDoList
Objective: Build a To-do List Web API with .NET, using clean architecture principles. If possible, add a basic React frontend to interact with the API.

[Backend WebAPI - Azure service](https://todolistapi-gmh5fmgmeuadb4c8.malaysiawest-01.azurewebsites.net/swagger/index.html)  
[Frontend WebApp - Azure service](https://todoclient-e8exdbevh2brc0gt.malaysiawest-01.azurewebsites.net)  


![Web Application](animate-client.gif)

## Web API (Backend):


-  [x] Endpoints: Implement a RESTful API with endpoints for managing a To-do List (Create, Read, Update, Delete).  
       [TodoListController](todolist.Server/Controllers/TodoListController.cs)
       

-  [x] Swagger: Add Swagger (OpenAPI) documentation to the API to provide an interactive interface and detailed documentation of each endpoint.  
       [Deployed webapi to azure service](https://todolistapi-gmh5fmgmeuadb4c8.malaysiawest-01.azurewebsites.net/swagger/index.html)  

-  [x] Clean Architecture: Structure the solution with layers such as Core, Application, Infrastructure, and API to maintain separation of concerns.  
       [Presentation layer](todolist.client)  
       [Application layer](todolist.Server/Controllers)  
       [Infrastructure layer](todolist.Server/Models)  

-  [x] Data Storage: Use a lightweight database (SQLite or in-memory) for storing to-do items.  
       [Auto create local sqlite database](todolist.Server/ToDoList.db)

-  [x] Validation: Ensure input validation (e.g., to-do item content cannot be empty).  
       [Method: ValidateDto](todolist.Server/Controllers/TodoListController.cs#L23)  

-  [x] Unit Tests: Cover core business logic with unit tests.  
       [Webapi.Test](Webapi.Test)  

## Frontend (Good to have): React UI: If implemented, create a basic React frontend to:

-  [x] Display a list of to-dos.

-  [x] Add, update, and delete to-dos items.

-  [x] API Integration: Ensure the frontend interacts with the backend API using HTTP requests.

-  [x] User Experience: Create a simple and functional UI design for the user to manage to-dos.
