# Patient Management Dashboard API

A comprehensive REST API for managing patient data in healthcare applications. Built with NestJS, MongoDB, and TypeScript.

## Features

- **Patient CRUD Operations**: Create, read, update, and delete patient records
- **Patient Status Management**: Support for Inquiry, Onboarding, Active, and Churned statuses
- **Search Functionality**: Search patients by name, city, or state
- **Data Validation**: Comprehensive input validation using class-validator
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **RESTful API Design**: Standard HTTP methods and status codes
- **Interactive API Docs**: Swagger (OpenAPI) documentation and testing UI

## Patient Data Model

Each patient record includes:

- **Names**: First Name, Middle Name (optional), Last Name
- **Date of Birth**: Required date field
- **Status**: One of: Inquiry, Onboarding, Active, Churned
- **Address**: Street, City, State, Zip Code

## API Documentation (Swagger)

This project includes interactive API documentation using [Swagger UI](https://swagger.io/tools/swagger-ui/).

- After starting the server, visit:
  
  **http://localhost:8000/api**

- You can view all endpoints, models, and try out requests directly from the browser.
- The documentation updates automatically as you change your API code and DTOs.

## API Endpoints

### Base URL
```
http://localhost:8000
```

### Patient Endpoints

#### Create Patient
```http
POST /patients
Content-Type: application/json

{
  "firstName": "John",
  "middleName": "Michael", // optional
  "lastName": "Doe",
  "dateOfBirth": "1990-05-15",
  "status": "Inquiry", // optional, defaults to "Inquiry"
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001"
}
```

#### Get All Patients
```http
GET /patients
```

#### Get Patients by Status
```http
GET /patients?status=Active
```

#### Search Patients
```http
GET /patients?search=john
```

#### Get Available Statuses
```http
GET /patients/statuses
```

#### Get Patient by ID
```http
GET /patients/:id
```

#### Update Patient
```http
PATCH /patients/:id
Content-Type: application/json

{
  "status": "Active",
  "city": "Los Angeles"
}
```

#### Delete Patient
```http
DELETE /patients/:id
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Yarn or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coding-challange-backend
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URL=mongodb+srv://laurence:kI3o9RqcQEEJEKta@cluster0.wrxle56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=8000
   ```

4. **Start the development server**
   ```bash
   yarn start:dev
   ```

The API will be available at `http://localhost:8000`

### Production Build

```bash
yarn build
yarn start:prod
```

## Testing

### Unit Tests
```bash
yarn test

### Test Coverage
```bash
yarn test:cov
```

## API Response Examples

### Successful Patient Creation
```json
{
  "id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "middleName": "Michael",
  "lastName": "Doe",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "status": "Inquiry",
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Available Statuses
```json
{
  "statuses": ["Inquiry", "Onboarding", "Active", "Churned"]
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": ["firstName should not be empty"],
  "error": "Bad Request"
}
```

## Validation Rules

- **firstName**: Required, non-empty string
- **middleName**: Optional string
- **lastName**: Required, non-empty string
- **dateOfBirth**: Required, valid date string (ISO format)
- **status**: Optional, must be one of the predefined statuses
- **street**: Required, non-empty string
- **city**: Required, non-empty string
- **state**: Required, non-empty string
- **zipCode**: Required, non-empty string

## Search Functionality

The search endpoint supports searching across:
- First Name
- Middle Name
- Last Name
- City
- State

Search is case-insensitive and uses partial matching.

## Status Management

Patients can have one of four statuses:
- **Inquiry**: Initial contact/interest
- **Onboarding**: In the process of becoming a patient
- **Active**: Currently active patient
- **Churned**: Former patient who is no longer active

## Error Handling

The API includes comprehensive error handling:
- **400 Bad Request**: Validation errors
- **404 Not Found**: Patient not found
- **500 Internal Server Error**: Server-side errors

## Development

### Project Structure
```
src/
├── patients/
│   ├── dto/
│   │   ├── create-patient.dto.ts
│   │   └── update-patient.dto.ts
│   ├── schemas/
│   │   └── patient.schema.ts
│   ├── patients.controller.ts
│   ├── patients.service.ts
│   └── patients.module.ts
├── app.module.ts
└── main.ts
```

### Adding New Features

1. Create DTOs for data validation
2. Update the schema if needed
3. Add service methods
4. Create controller endpoints
5. Update the module configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

