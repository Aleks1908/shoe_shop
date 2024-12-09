# Shoe Shop
[![Unit Tests with jest](https://github.com/Aleks1908/shoe_shop/actions/workflows/unit_tests.yml/badge.svg)](https://github.com/Aleks1908/shoe_shop/actions/workflows/unit_tests.yml)

# Online Fashion Store - Product Documentation

## Table of Contents
- [Shoe Shop](#shoe-shop)
- [Online Fashion Store - Product Documentation](#online-fashion-store---product-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Business Requirements Document (BRD)](#business-requirements-document-brd)
    - [Project Overview](#project-overview)
    - [User Stories](#user-stories)
    - [Functional Requirements](#functional-requirements)
    - [Non-Functional Requirements](#non-functional-requirements)
  - [Technical Specifications](#technical-specifications)
    - [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
    - [Database Schema](#database-schema)
    - [Technology Stack](#technology-stack)
    - [Implementation Details](#implementation-details)
    - [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Favorites](#favorites)
  - [Items](#items)
    - [Deployment Documentation](#deployment-documentation)
    - [Testing Documentation](#testing-documentation)
    - [Troubleshooting and Error Handling](#troubleshooting-and-error-handling)
    - [Upgrade and Maintenance Plans](#upgrade-and-maintenance-plans)

---

## Introduction
This documentation provides a comprehensive overview of the proposed **online clothing store**, offering a broad range of products including shoes, clothing, hats, and accessories. The platform is a web-based application designed to be responsive and accessible via desktop and mobile devices. It will provide users with an intuitive shopping experience, secure account management, and efficient order processing.

This README combines a Business Requirements Document (BRD) with extensive Technical Specifications. It aims to guide stakeholders—including developers, testers, business analysts, and project managers—through the system’s objectives, architecture, implementation details, and maintenance strategies.

---

## Business Requirements Document (BRD)

### Project Overview
The online fashion store’s primary objective is to facilitate a seamless shopping experience for customers. Key goals include:

- **Diverse Product Catalog:** Offer a comprehensive range of fashion items, from footwear and apparel to hats and accessories.
- **User-Friendly Interface:** Ensure smooth browsing, searching, filtering, and purchasing.
- **Secure Transactions:** Implement secure user authentication, encrypted data storage, and reliable checkout processes.
- **Scalability:** Enable future growth in product variety and user traffic.

**Assumed Scale:**  
While the exact scale is not defined, the system should be capable of handling moderate nationwide traffic. It will be designed to accommodate increased load as the user base grows.

**Stakeholders:**
- **End Users:** Browse, compare, and purchase products.
- **Store Administrators/Managers:** Manage products, inventory, orders, and promotions.

### User Stories

**As a Customer (Guest User):**  
1. I want to browse products by categories so I can find items easily.  
2. I want to search and filter products (e.g., by size, color, price) to narrow down my options.  
3. I want to view detailed product information (images, description, price, availability).  
4. I want to add multiple items to my cart and review them before purchasing.  
5. I want to proceed through a secure checkout to complete my purchase.  
6. I want to track my order status (e.g., processing, shipped, delivered).

**As a Registered Customer:**  
1. I want to create and manage my profile (username/password), update addresses, and store payment details securely.  
2. I want to view my order history for reference and reordering.  
3. I want to save products to a wishlist for future consideration.

**As an Admin/Store Manager:**  
1. I want to add, modify, or remove products from the catalog.  
2. I want to manage inventory levels, ensuring that stock information is accurate.  
3. I want to handle returns, refunds, or exchanges.  
4. I want to configure discounts, seasonal promotions, and coupon codes.  
5. I want to access sales analytics and performance reports.

### Functional Requirements

**Catalog Management:**  
- The system shall display products categorized (e.g., Shoes, Clothing, Hats, Accessories).  
- The system shall allow users to search and filter products by various attributes.

**Shopping Cart & Checkout:**  
- Users shall be able to add or remove items from a shopping cart.  
- The system shall display updated cart totals in real-time.  
- The system shall guide users through a checkout process, capturing shipping and billing details.

**User Accounts & Orders:**  
- The system shall enable user registration with a username/password login system.  
- The system shall store user profiles, addresses, and payment preferences (if applicable).  
- The system shall allow users to view past orders and current order status.

**Inventory & Admin Management:**  
- Administrators shall be able to create, edit, or delete product listings.  
- The system shall track product stock and update inventory upon order completion.  
- Administrators shall be able to apply discounts, manage coupons, and configure sales.

### Non-Functional Requirements

**Performance:**  
- Product listing pages should load within 2 seconds under standard broadband conditions.  
- The platform should reliably handle up to 1,000 concurrent users without performance degradation.

**Security:**  
- All traffic shall be encrypted over HTTPS/TLS.  
- Passwords shall be securely hashed and stored (e.g., using bcrypt).  
- Implement role-based access control to protect administrative functions.

**Scalability & Availability:**  
- The system shall support horizontal scaling to handle increased traffic and data.  
- Target an uptime of at least 99.9% to ensure high availability.

**Usability:**  
- The interface shall be mobile-responsive, ensuring a smooth experience on phones and tablets.  
- The user interface shall be intuitive, with consistent navigation and clear product imagery.

**Compliance:**  
- If payment integration is added in the future, adhere to PCI DSS standards.  
- Comply with relevant data protection policies (e.g., GDPR) if required based on target regions.

---

## Technical Specifications

### Architecture Overview

The architecture follows a typical three-tier model:

1. **Presentation Layer (Frontend):**  
   - A web-based UI accessible via standard browsers.  
   - Responsive design techniques to ensure mobile-friendliness.

2. **Application Layer (Backend):**  
   - A RESTful API server managing business logic, authentication, and data retrieval.
   - Handles requests from the frontend, interacts with the database, and returns JSON responses.

3. **Data Layer (Database):**  
   - A relational database (e.g., MongoDB or MySQL) to store users, products, orders, and inventory data.

**No Third-Party Integrations (Currently):**  
- No external payment gateways or shipping APIs at this time.  
- Future integrations can be accommodated by exposing integration layers in the backend.

# Project Structure

 ```bash
 shoe_shop/
 ├──.github/
 │   ├── workflows
 │        ├── unit_tests.yml
 │   ├── CODEOWNERS
 ├── services/                                    # Various backend/front-end services
 │   ├── express-api/                             # Backend API service built using Express.js
 │   ├── bin/
 │        ├── www                                 # Entry point script for the Express server
 │   ├── src/                                     # Source code directory for the Express API
 │        ├── controllers/                        # Controllers for handling incoming requests and responses
 │        ├── databse/
 │           ├── models/                          # Data models representing the schema of the database tables
 │           ├── repositories/                    # Repository layers handling data operations (CRUD) on models
 │           ├── db-config.js                     # Database configuration and connection setup
 │        ├── server/
 │           ├── config/
 │           ├── handlers/                        # Request handlers for specific routes or functionalities
 │           ├── middleware/                      # Middleware functions for request/response processing
 │           ├── routes/                          # Express route definitions mapping endpoints to handlers
 │           ├── app.js                           # Main Express app initialization file
 │           ├── swagger.js                       # Swagger documentation setup for API endpoints
 │        ├── utils.js                            # Utility functions and helpers
 │        ├── tests unit-tests/                   # Directory containing unit tests
 │           ├── test-controllers/
 │           ├── test-handlers/
 │           ├── test-repositories/
 │        ├── .dockerignore                       # Specifies files/folders to ignore in the Docker build context
 │        ├── Dockerfile                          # Dockerfile defining how to build the Express API image
 │        ├── jest.config.mjs                     # Configuration file for Jest testing framework
 │        ├── package-lock.json                   # Lock file for Node package versions (Express API service)
 │        ├── package.json                        # Manifest for dependencies and scripts for the Express API         
 │        ├── README.md                           # Documentation and instructions for the Express API
 │   ├── web/                                     # Front-end web application service
 │        ├── src/                                # Source code directory for the web front-end
 │           ├── Assets/                          # Holds images, fonts, and static resources
 │           ├── Components/                          # React components making up the UI       
 │                ├── BannerSection/
 │                ├── CategoryMobile/
 │                ├── DescriptionSection/
 │                ├── FilterSection/
 │                ├── FooterSection/
 │                ├── Navigation/
 │                ├── ProductSection/
 │                ├── SortSection/
 │                ├── content.css
 │                ├── Content.jsx                 # Main content layout/component
 │            ├── Pages/                          # Directory for page-level components (e.g., Login, Home, Register)
 │            ├── index.css
 │            ├── main.jsx                        # Main entry point for the React application
 │       ├── index.html            
 │       ├── logo.png                    
 │       ├── package-lock.json                    # Lock file for Node package versions in the web service
 │       ├── package.json                         # Manifest file specifying dependencies and scripts for the web service
 │       ├── README.md                            # Documentation and instructions for the web front-end
 │       ├── SampleData.json                      # Sample data file for testing or development
 │       ├── vite.config.js                    
 ├── .gitignore                                   # Git ignore file specifying files/folders Git should ignore
 ├── docker-compose.yaml                          # Docker Compose configuration for running multiple services
 ├── LICENSE                                      # Software license file
 ├── package-lock.json                            # Lock file for Node package versions at the root level
 ├── README.md                                    # Main documentation and instructions for the entire project
 ```

### Database Schema

**Core Entities:**

- **Users**:  
  - `user_name` (unique), 
  - `password` (unique),
  - `favourites`

- **Products**:  
  - `id` (PK)  
  - `name`, 
  - `category` (string),
  - `description`,  
  - `color`,  
  - `price` (numeric), 
  - `image` (string), 
  - `stars`

### Technology Stack

**Frontend:**  
- HTML5, CSS3, JavaScript  
- A modern frontend framework such as **React**  
- Responsive CSS frameworks (e.g., Bootstrap)

**Backend:**  
- **Node.js** runtime with **Express.js** framework  
- JSON-based RESTful endpoints

**Database:**  
- Relational database like **MongoDB** for structured data and transactions

**Hosting Environment:**  
- Cloud hosting with a provider like **AWS** (e.g., EC2 for servers, RDS for database)  
- Docker containers for portability

**Security & Sessions:**  
- Session management using JWT stored in HTTP-only cookies or local storage  
- Password hashing with bcrypt

### Implementation Details

**Code Structure (Backend):**  
- **Routes:** Define endpoints (e.g., `/api/v1`, `/auth/register`, `/items/favorites` etc.)  
- **Controllers:** Implement request handling logic  
- **Services:** Business logic and data processing  
- **Data Access (DAOs):** Interact with the database  
- **Models:** Define schema structures and ORM mappings

**Data Flow:**  
- **Frontend → Backend:** User clicks "Register" → sends POST request to `/auth/register` to register new user.  
- **Backend → Database:** Controller calls registerUserController, it register new user.  
- **Database → Backend → Frontend:** Sent back as JSON to frontend, frontend updates UI accordingly.

### API Documentation

**Examples of Endpoints:**

## Authentication
- **POST** `/auth/register` - The endpoint for registering the user
- **POST** `/auth/login` - The endpoint for logging the user in
- **POST** `/auth/logout` - The endpoint for logging the user out

## Favorites
- **GET** `/items/favorites` - Returns a JSON containing all favorite items of a specific user
- **POST** `/items/favorites` - Adds a favorite item for a specific user
- **DELETE** `/items/favorites` - Deletes a favorite item for a specific user

## Items
- **GET** `/items/shoes` - Returns an array of JSON objects containing all shoes
- **GET** `/items/clothes` - Returns an array of JSON objects containing all clothes
- **GET** `/items/accessories` - Returns an array of JSON objects containing all accessories
- **GET** `/items/hats` - Returns an array of JSON objects containing all hats
- **GET** `/items/slippers` - Returns an array of JSON objects containing all slippers
- **GET** `/items/limited` - Returns an array of JSON objects containing all limited items

**Authentication & Authorization:**  
- All protected endpoints require a valid JWT in the `Authorization: Bearer <token>` header.  


### Deployment Documentation

**Prerequisites:**  
- Node.js (>=14.x) and npm  
- MongoDB database instance  
- Environment variables

**Steps:**  
1. **Clone the repository:**  
   `git clone <shoe_shop repository>`

2. **Install dependencies:**  
   `cd shoe_shop`  
   `npm install`

3. **Database Setup:**  
   - Ensure PostgreSQL is running.  
   - Create the database: `createdb online_fashion_store`  
   - Run migrations: `npm run migrate` (if using a migration tool)

4. **Environment Variables:**  
   - Create a `.env` file and set the necessary variables.

5. **Build and Start the Server:**  
   - `npm start`  
   
6. **Access the Application:**  
   - Frontend available at `http://localhost:6969`  
   - Backend API at `http://localhost:6969/api`

### Testing Documentation

**Test Types:**
- **Unit Tests:** Focus on individual functions, components, or services.

**Recommended Tools:**
- **Jest** for unit and integration tests.  

**Test Execution:**
- `npm test` – Run unit and integration tests.  

**Test Reporting:**
- Generate test coverage reports (e.g., `npm run coverage`) to identify untested code paths.

### Troubleshooting and Error Handling

**Common Error Responses:**
- `204 No Content` there is no content to return to the client 
- `User does not exist` you're no longer on the user list.  
- `Incorrect Password` provided incorrect password  

**Troubleshooting Steps:**
- Check server logs for error messages and stack traces.  
- Validate database connections and schema.  
- Confirm that environment variables are correctly set.

### Upgrade and Maintenance Plans

**Versioning:**
- Semantic Versioning (MAJOR.MINOR.PATCH)

**Regular Updates:**
- Keep dependencies up-to-date with periodic checks (e.g., `npm outdated`).  
- Apply security patches promptly.

**Scalability:**
- Add more application servers behind a load balancer as traffic grows.  
- Consider database sharding or replicas to handle read-heavy workloads.

**Security and Compliance:**
- Conduct regular security audits.  
- If future payment processing is integrated, ensure compliance with PCI DSS.  
- Revisit and update privacy policies and data handling for compliance with local laws.

---

**Note:** This documentation serves as a blueprint and living reference. Actual implementation details may vary based on ongoing decisions, resource availability, and evolving business requirements.
