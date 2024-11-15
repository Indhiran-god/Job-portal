// Import required modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Define allowed origins
const allowedOrigins = [
    'https://job-portal-9fxj.vercel.app',
    
];

// CORS configuration
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(timeout('30s')); // Set a timeout for requests
app.use((req, res, next) => {
    if (!req.timedout) next();
});

// API Routes
app.use("/api", router);

// Handle CORS preflight requests
app.options('*', cors());

// Set port for Vercel environment
const PORT = process.env.PORT || 8080;

// Start server and connect to DB
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Connected to DB");
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Database connection failed:", err.message);
        process.exit(1); // Exit on critical failure
    });
