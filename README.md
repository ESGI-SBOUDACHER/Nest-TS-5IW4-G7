# Nest-TS-5IW4-G7

## Prerequisites

- Having Docker installed localy on your machine

## Installation steps

create **.env** file in /api based on **.env.example** with the following dev logs :

```env
DATABASE_URL="postgresql://admin:admin@db:5432/db?schema=public"
JWT_SECRET="tartipouet"
```

Run the app :

```bash
make start
```

Execute all database migrations :

```bash
make migrate
```

Run the seeds :

```bash
make seed
```

## How to use

- Go to <http://localhost:3000> to interact with the API
- Go to <http://localhost:8080> to interact with the database with adminer
- You can import `postman-requests.json` file into Postman to execute and test the routes (dont forget to update the access_token variable in Postman in order to successfuly use the guarded routes)
- Alternativly go to <http://localhost:3000/api> in order to consult the API docs with Swagger.

## Roles

email :
password :

| Email          | Password | Role  |
| -------------- | -------- | ----- |
| user@user.fr   | password | User  |
| admin@admin.fr | password | Admin |
