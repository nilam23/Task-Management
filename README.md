## Description

Demonstration of CRUD operations along with user authentication and authorization in a Task Management system implemented using NestJS, TypeScript and Postgresql database.

## Routes

### 1. Auth routes

`POST /auth/signup`: To sign up a new user.

`POST /auth/signin`: To sign in an existing user.

### 2. Task routes

`GET /tasks`: To fetch either all tasks from database or tasks based on some search parameters.

`POST /tasks`: To create a new task.

`GET /tasks/:id`: To fetch a task by it's id.

`PATCH /tasks/:id`: To update a task corresponding to an id.

`DELETE /tasks/:id`: To delete a task corresponding to an id.


## Database schemas

### 1. User schema

`id (type: number)`: This column denotes a unique id for a user which is also the Primary Key for the table.

`username (type: string)`: This column denotes the unique username of a user.

`password (type: string)`: This column denotes the user's hashed password.

`salt (type: string)`: This column denotes the salt used during the hashing of the user's plaintext password.

### 2. Task schema

`id (type: number)`: This column denotes a unique id for a task which is also the Primary Key for the table.

`title (type: string)`: This column denotes the title of a task.

`description (type: string)`: This column denotes the description of a task.

`status (type: string)`: This column denotes the current status of a string.

`userId (type: number)`: This column denotes the id of an existing user who created the task, which is the Foreign Key of the table.

## Environment variables

### 1. Environment variables for database configurations
`DB_HOST` `DB_PORT` `DB_USER` `DB_PASSWORD` `DB_NAME`

### 2. Other environment variables
`DEV_PORT` `JWT_SECRET` `JWT_EXPIRY`

## Steps to run

### 1. Getting the repository

```
1. Make sure that you have Node installed.
2. Clone the repository.
3. Move into the project's directory.
4. Create a .env file and set the environment variables.
```

### 2. Installation

```bash
$ npm install
```

### 3. Running the app

```bash
$ npm run start:dev
```
