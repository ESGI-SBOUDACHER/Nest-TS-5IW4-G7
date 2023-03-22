# Nest-TS-5IW4-G7

## Prerequisites

- Having Docker installed localy on your machine

## Installation steps

1. Run the app :

```bash
make start
```

2. create **.env** file in /api based on **.env.example** with the following dev logs :

```env
DATABASE_URL="postgresql://admin:admin@db:5432/db?schema=public"
```

3. Execute all database migrations :

```bash
make migrate
```

## How to use

- Go to http://localhost:3000 to interact with the API
- Go to http://localhost:8080 to interact with the database with adminer
