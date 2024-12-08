# Express API

This project is a RESTful API built with [Express.js](https://expressjs.com/), a fast and lightweight Node.js framework. The API provides endpoints for [your API's purpose].

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

---

## Installation

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. Run the following command to install dependencies:
   ```bash
   npm install
   ```

---

## Usage

To start the API:

- Without hot reloading:
  ```bash
  npm run start
  ```

- With hot reloading enabled:
  ```bash
  npm run watch
  ```

---

## Endpoints

After starting the application, you can access the Swagger API documentation at:
[http://localhost:6969/api-docs/](http://localhost:6969/api-docs/)

### General Endpoint Overview

#### Authentication
- **POST** `/auth/register` - The endpoint for registering the user
- **POST** `/auth/login` - The endpoint for logging the user in
- **POST** `/auth/logout` - The endpoint for logging the user out

#### Favorites
- **GET** `/items/favorites` - Returns a JSON containing all favorite items of a specific user
- **POST** `/items/favorites` - Adds a favorite item for a specific user
- **DELETE** `/items/favorites` - Deletes a favorite item for a specific user

#### Items
- **GET** `/items/shoes` - Returns an array of JSON objects containing all shoes
- **GET** `/items/clothes` - Returns an array of JSON objects containing all clothes
- **GET** `/items/accessories` - Returns an array of JSON objects containing all accessories
- **GET** `/items/hats` - Returns an array of JSON objects containing all hats
- **GET** `/items/slippers` - Returns an array of JSON objects containing all slippers
- **GET** `/items/limited` - Returns an array of JSON objects containing all limited items

---

## Environment Variables

If you encounter issues with environment variables, please contact the team. Use the following sample `.env` file:

```
PORT=
ENV=
ATLAS_URI=
SECRET_ACCESS_TOKEN=
```

---

## Testing

To run the tests:

1. Navigate to the `express-api/tests` directory.
2. Run the following command:
   ```bash
   npm run tests
   ```

