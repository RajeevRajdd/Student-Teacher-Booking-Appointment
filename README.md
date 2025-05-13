# Student-Teacher Appointment Booking System

A web-based application that allows students to book appointments with teachers. The system enables teachers to view and manage appointments, with data stored in MongoDB.

## Features

### Student Features
- View list of available teachers
- Request appointments with teachers
- View appointment status (Pending/Accepted/Rejected)

### Teacher Features
- View incoming appointment requests
- Accept or reject requests
- View today's appointments

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- MongoDB Compass (optional, for database management)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student-teacher-appointment-system
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo service mongod start
```

4. Create a `.env` file in the root directory (optional):
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/appointment-system
```

## Running the Application

1. Start the server:
```bash
npm start
```

2. For development with auto-reload:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
student-teacher-appointment-system/
├── models/
│   └── Appointment.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create a new appointment
- `PATCH /api/appointments/:id` - Update appointment status
- `GET /api/appointments/today` - Get today's appointments

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- Additional Tools: MongoDB Compass (optional)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. "# Student-Teacher-Booking-Appointment" 
