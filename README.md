# Internship Tracking System (ITS)

A comprehensive web application for managing student internships at Gebze Technical University.

## Overview

ITS is a full-stack application designed to track and manage student internships. It supports multiple user roles (Admin, Commission Chair, Commission Member) and handles internship lifecycle from application to completion.

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM (Object-Relational Mapping)
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React.js** - UI framework
- **CSS3** - Styling

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Verify installations:

```bash
node --version    # Should show v16.x.x or higher
npm --version     # Should show 8.x.x or higher
psql --version    # Should show 14.x or higher
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ITS.git
cd ITS
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Database Setup

### Step 1: Start PostgreSQL

**macOS (Homebrew):**
```bash
brew services start postgresql@14
```

**Linux:**
```bash
sudo service postgresql start
```

**Windows:**
PostgreSQL should start automatically. Check in Services.

### Step 2: Create Database User (if needed)

```bash
# Connect to PostgreSQL
psql postgres

# Create a new user
CREATE USER your_username WITH PASSWORD 'your_password';

# Grant privileges
ALTER USER your_username CREATEDB;

# Exit
\q
```

### Step 3: Create Database

```bash
# Option 1: Using createdb command
createdb -U your_username internship_db

# Option 2: Using psql
psql -U your_username postgres
CREATE DATABASE internship_db;
\q
```

### Step 4: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/internship_db?schema=public"

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

**⚠️ Important:** Replace `your_username` and `your_password` with your actual PostgreSQL credentials.

### Step 5: Run Database Migrations

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev

# This will:
# 1. Create all database tables
# 2. Set up relationships and constraints
# 3. Generate Prisma Client
```

### Step 6: Seed the Database

```bash
# Add test data to the database
npm run prisma:seed
```

This will populate your database with:
- ✅ 3 User Roles (Admin, Chair, Member)
- ✅ 3 Departments (Computer, Electrical, Mechanical Engineering)
- ✅ 14 Users (with hashed passwords)
- ✅ 12 Students
- ✅ 2 Academic Terms
- ✅ 7 Companies
- ✅ Multiple Internship records

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm start
```

Frontend will run on: `http://localhost:3000`

## Database Management

### Prisma Studio - Visual Database Editor

Prisma Studio provides a GUI to view and edit your database:

```bash
cd backend
npx prisma studio
```

This will open: `http://localhost:5555`

**Features:**
- View all tables and data
- Edit records directly
- Add new records
- Delete records
- Filter and search data

### Command Line Database Access

```bash
# Connect to database
psql -U your_username -d internship_db

# Common commands:
\dt              # List all tables
\d "TableName"   # Describe table structure
SELECT * FROM "User";  # Query data
\q               # Quit
```

### Reset Database (Delete all data)
```bash
cd backend

# Method 1: Using Prisma (Recommended)
npx prisma migrate reset
# This will:
# - Drop all tables
# - Recreate schema
# - Run seed automatically

# Method 2: Manual
dropdb -U your_username internship_db
createdb -U your_username internship_db
npx prisma migrate dev
npm run prisma:seed
```

### Making Schema Changes

When you modify `prisma/schema.prisma`:

```bash
# Create and apply migration
npx prisma migrate dev --name descriptive_migration_name

# Example:
npx prisma migrate dev --name add_student_phone_field
```

## 📁 Project Structure

```
ITS/
├── backend/
│   ├── prisma/
│   │   ├── migrations/        # Database migration files
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.js           # Seed data script
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/          # API routes
│   │   └── server.js        # Entry point
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment template
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   │
│   │   ├── assets/          # Images and static media files
│   │   │   └── (örnek: main-page-logo.png)
│   │
│   │   ├── pages/
│   │   │   ├── Admin/       # Administrator (Admin) interfaces
│   │   │   │   ├── AdminMainPage.css
│   │   │   │   ├── AdminMainPage.js     
│   │   │   │   ├── AdminProfile.css     
│   │   │   │   ├── AdminProfile.js
│   │   │   │   ├── CommissionMembers.css
│   │   │   │   ├── CommissionMembers.js
│   │   │   │   ├── MemberAssignment.css
│   │   │   │   └── MemberAssignment.js
│   │   │   │
│   │   │   └── Auth/       # Authentication pages
│   │   │       ├── CodeVerify.css
│   │   │       ├── CodeVerify.js
│   │   │       ├── EmailEntry.css
│   │   │       ├── EmailEntry.js
│   │   │       ├── Login.css
│   │   │       └── Login.js
│   │
│   └── package.json


│       ...
```



## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.
