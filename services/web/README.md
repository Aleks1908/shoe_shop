# Front-End Documentation

Welcome to the online store frontend. This project serves as the user-facing interface for a modern e-commerce platform selling shoes, clothes, hats, accessories, and more. Below, you'll find comprehensive details on setup, features, technologies, and project structure.

---

## Table of Contents

- [Front-End Documentation](#front-end-documentation)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
    - [User Features](#user-features)
  - [Technologies](#technologies)
    - [Core Technologies](#core-technologies)
    - [Additional Libraries](#additional-libraries)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
  - [Code Style](#code-style)
- [API IntegrationS](#api-integrations)
- [Testing](#testing)
  - [Run Tests](#run-tests)
- [Coverage](#coverage)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
    - [Dependency Errors](#dependency-errors)
    - [API Errors](#api-errors)
- [License](#license)

---

## Project Overview

The online store frontend is a React-based web application that delivers a dynamic and user-friendly shopping experience. It allows users to:

- Browse products by categories.
- View product details with images, descriptions, and pricing.
- Manage user accounts, including registration and login.
- Use filters and search to find products easily.

---

## Features

### User Features
- **Product Browsing**: Browse by category, featured items, or best sellers.
- **Search and Filters**: Powerful search with filters for size, color, price range, and more.
- **Product Details**: Detailed product pages with multiple images, reviews, and specifications.
- **Cart Management**: Add and remove items, view a real-time cart summary, and proceed to checkout. ???????
- **Wishlist**: Save products for future purchases.
- **User Accounts**: Secure registration, login, and account management.
- **Responsive Design**: Design adjusted to mobile devices.

---

## Technologies

### Core Technologies
- **React**: For building the user interface.
- **React Router**: Client-side routing.
- **SCSS**: Advanced and modular styling. 
- **Bootstrap**: Responsive grid layout and UI utilities. 

### Additional Libraries
- **React Query**:  For data fetching.
- **React Testing Library & Jest**: Testing frameworks.
- **React Responsive**: Different styles to components based on the screen size
- **React Hook Form**: Helps to manage complex forms
- **React Icons**: Popular icons to enhance user interface
- **TanStack Query**: Declarative up-to-dateauto-managed queries

---

## Installation

### Prerequisites
- Node.js (>=14.x)
- npm or yarn
- Code editor (e.g., Visual Studio Code)

### Steps
1. **Clone the repository:**
      ```bash
      git clone <repository-url>
      cd <project-folder>
      ```

2. **Install dependencies:**
     ```bash
     npm install
     # or
     yarn install
     ```

3. **Start the development server:**
     ```bash
     npm start
     # or 
     yarn start
     ``` 

# Project Structure

 ```bash
 shoe_shop/
 ├── services/                                    # Various backend/front-end services
 │   ├── express-api/                             # Backend API service built using Express.js
 │   ├── web/                                     # Front-end web application service
 │        ├── src/                                # Source code directory for the web front-end
 │           ├── Assets/                          # Holds images, fonts, and static resources
 │           ├── Assets/                          # React components making up the UI
 │           ├── Components/        
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
 │                ├── Pages/                      # Directory for page-level components (e.g., Login, Home, Register)
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

# Development Guidelines

## Code Style

- Adhere to React best practices and functional components.
- Write descriptive names for components, variables, and functions.

# API IntegrationS

- The frontend interacts with a RESTful API built with Express.js, a fast and lightweight Node.js framework. It is provided in the "express-api".


# Testing

## Run Tests
To run tests, use:
```bash
npm test
# or
yarn test
```


# Coverage
To check coverage:
 ```bash
 npm test -- --coverage
 ```


# Troubleshooting

## Common Issues

### Dependency Errors
   Delete `node_modules` and reinstall:
   ```bash
      rm -rf node_modules
      npm install
   ```

### API Errors

Check environmnet for correct API URLs and keys.

# License

This project is licensed under the MIT License. See the `LICENSE` file for details.
