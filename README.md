User-Auth: Bun TypeScript Prisma Authentication API

This project is a boilerplate API built using Bun, TypeScript, Prisma, Express, and JWT for user authentication. It supports secure user registration, login, token-based authentication (using access and refresh tokens), and protected routes.
Features

    Bun: High-performance runtime.
    Express: For handling API routes.
    TypeScript: Static type-checking.
    Prisma: ORM for database management.
    JWT: Secure, token-based authentication.
    bcrypt: Password hashing.
    SQLite: Lightweight database setup (but easily adaptable to other Prisma-supported databases).

Project Structure

/src
├── /controllers # Handles API logic
├── /middleware # JWT and other middlewares
├── /models # Prisma client setup
├── /routes # API route definitions
├── /services # Business logic (e.g., token generation)
├── /utils # Utility functions (e.g., validation)
├── /config # Environment variables or configuration
├── app.ts # Express app setup
└── index.ts # Main entry point

Getting Started
Prerequisites

    Bun installed.
    Prisma setup using SQLite (or any other Prisma-compatible database).

1. Clone the Repository

git clone https://github.com/yourusername/user-auth.git
cd user-auth

2. Install Dependencies

Use Bun to install dependencies:

bash

bun install

3. Set up Environment Variables

Create a .env file in the root directory and provide the following environment variables. Here’s an example:

bash

JWT_SECRET=your_jwt_secret_key
DATABASE_URL="file:./dev.db"

    JWT_SECRET: A secret key used for signing JWT tokens.
    DATABASE_URL: Your SQLite database file (or another database connection string).

4. Set up Prisma

Ensure Prisma is correctly set up with SQLite by running the following commands:

bash

bun prisma migrate dev --name init
bun prisma generate

The migration command sets up the SQLite database and applies the initial schema. 5. Running the Application

Start the server using Bun:

bash

bun run src/index.ts

The server will run on http://localhost:3000.
API Endpoints

1. POST /auth/register

Register a new user.
Request Body:

json

{
"email": "user@example.com",
"password": "Password123!"
}

Response:

json

{
"message": "User created",
"user": {
"id": 1,
"email": "user@example.com"
}
}

2. POST /auth/login

Login a user and get an access token.
Request Body:

json

{
"email": "user@example.com",
"password": "Password123!"
}

Response:

json

{
"message": "Login successful",
"token": "your-jwt-token"
}

3. POST /auth/refresh

Generate a new access token using the refresh token stored in cookies.
Response:

json

{
"token": "new-jwt-token"
}

4. GET /auth/protected

Access a protected route. Requires a valid JWT token in the Authorization header.
Request Headers:

bash

Authorization: Bearer your-jwt-token

Response:

json

{
"message": "Protected route accessed"
}

Prisma with SQLite

This project uses SQLite as the default database for simplicity. You can find the SQLite database file in the root directory (dev.db).

You can change the DATABASE_URL in the .env file to connect to other supported databases like PostgreSQL, MySQL, etc. Prisma supports various databases and you can easily adapt this project to work with them.
Environment Variables

    JWT_SECRET: The secret key used to sign JWT tokens.
    DATABASE_URL: Connection string for your SQLite database or other Prisma-supported databases.

Running Tests

You can use tools like Postman or cURL to test the API endpoints.

Example cURL request for login:

bash

curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"user@example.com", "password":"Password123!"}'

Deployment
Option 1: Deploy on Replit

You can easily deploy this project to Replit by following these steps:

    Fork the repository to your GitHub account.
    Connect your Replit account to your GitHub.
    Import the repository into Replit and follow the instructions for deployment.

Option 2: Deploy on Netlify

For deploying the frontend or serving the API with Netlify, you can create a build command in the Netlify dashboard or use Netlify CLI to deploy.
Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.
License

This project is licensed under the MIT License - see the LICENSE file for details.
Contact

    GitHub: yourusername
    Email: your.email@example.com

Conclusion

This project is a basic authentication API boilerplate that can be extended with additional features like email verification, password recovery, or OAuth support. Feel free to customize it according to your needs!
