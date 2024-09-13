Aon test.

Execute o root: 

docker-compose up --build

All servers and database will be created.

Backend:
list of users: GET http://localhost:8000/users/
create user: POST http://localhost:8000/users/create/
{
  "nome": string,
  "email": string, //has to be an valid email format
  "idade": number
}
Return an user GET http://localhost:8000/users/find/:id
Update an user PUT http://localhost:8000/users/update/:id
{
  "nome": string,
  "email": string, //has to be an valid email format
  "idade": number
}
Delete an user DELETE http://localhost:8000/users/delete/:id
Upload a csv POST http://localhost:8000/users/delete/:id // Not tested because of some postman reasons. I used models I find on internet.

Frontend:
http://localhost:3000
