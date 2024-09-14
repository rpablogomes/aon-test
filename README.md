# Aon Test

## Setup
To start the servers and database, execute on root:

      docker-compose up --build
      
This will create all necessary servers and the database.

## Backend API
### List of Users:
GET http://localhost:8000/users/
Retrieve a list of all users.

### Create User:
POST http://localhost:8000/users/create/
Create a new user.
Request Body:

      {
        "nome": "string",
        "email": "string",  // Must be a valid email format
        "idade": number
      }
      
### Return User:
GET http://localhost:8000/users/find/:id
Retrieve a user by ID.

### Update User:
PUT http://localhost:8000/users/update/:id
Update a user.
Request Body:

      {
        "nome": "string",
        "email": "string",  // Must be a valid email format
        "idade": number
      }
      
### Delete User:
DELETE http://localhost:8000/users/delete/:id
Delete a user by ID.

### Upload CSV:
POST http://localhost:8000/users/batch/
Upload a CSV file with the following format:
CSV File Content:

      nome,email,idade
      Pablo,teste@teste.com,30
      Joao,joao@teste.com,20

## Frontend
Access the frontend at: http://localhost:3000

#### ---------------------------------------------------------------------------

It was a simple test, and many other validations and functionalities can be applied. For now, I focused on being quick and ensuring the system is functional. I am fully open to discussing my technical decisions and implementing any additional functionalities as requested.
