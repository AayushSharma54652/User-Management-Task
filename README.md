A Task Management System where an Admin can add users to a portal, and users must upload authentication documents for verification. The project includes Swagger API documentation, Docker support, and a MongoDB database.

Features include
Admin can add, update, delete users.
Users must upload authentication documents.
Admin can view analytics of user activities.
Users can update their qualifications.
API documentation using Swagger UI.
Dockerized backend with MongoDB as the database.

Installation & Setup
1 Clone the repository
git clone https://github.com/00ayushsingh/admin-user-management.git
cd admin-user-management

2️ Install dependencies
npm install

3 Setup environment variables
Create a .env file in the root directory and add:
PORT=4000
MONGO_URI=mongodb://localhost:27017/admin-user-management
DATABASE_NAME=admin-user-management

4 Run the server
npm run dev
The server will start at http://localhost:4000.


Docker Setup
1️ Build & Run the Docker Containers
docker-compose up --build

This will start:
Backend API at http://localhost:5000
MongoDB at mongodb://mongo:27017

2️ Stop Containers
docker-compose down




