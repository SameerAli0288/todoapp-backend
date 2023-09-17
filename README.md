# todoapp-backend


# Simple CRUD API with a Cron Job in Node.js

## Overview

This Node.js application provides a simple CRUD (Create, Retrieve, Update, Delete) API for managing a "To-Do List." Additionally, it features a cron job that automatically deletes completed to-do items at a specified time each day. Instead of using a database, this application stores to-do items in a JSON file for simplicity.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Cron Job](#cron-job)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SameerAli0288/todoapp-backend
   cd todo-list-api
Install the dependencies:

  ```bash
  npm install
  ```

# API Endpoints
Create a New Task
URL: /api/todos
Method: POST
Request Body: JSON
json


{
  "task": "Buy groceries"
}
Response: JSON
json

{
  "id": 1,
  "task": "Buy groceries",
  "completed": false
}

## Retrieve All Tasks 
URL: /api/todos
Method: GET
Response: JSON array of tasks.
Update a Task by ID
URL: /api/todos/:id
Method: PUT
URL Parameters: id (Task ID)
Request Body: JSON (You can update task and completed fields)
Response: JSON
json

{
  "id": 1,
  "task": "Buy groceries",
  "completed": true
}

## Delete a Task by ID
URL: /api/todos/:id
Method: DELETE
URL Parameters: id (Task ID)
Response: JSON
json

{
  "message": "Todo deleted"
}
Cron Job
The cron job is scheduled to run every day at midnight (0 0 * * *).
It deletes all completed tasks from the database.
Usage
Start the server:

```bash
npm start
Access the API at http://localhost:3000/api/todos.
```
Use the provided API endpoints to manage your to-do list.
