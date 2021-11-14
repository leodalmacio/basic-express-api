const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDb = require('./config/db');

// Load env vars
dotenv.config({
    path: './config/config.env'
});

connectDb();

// Route Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

// Body parser
app.use(express.json());


// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

const server = app.listen(
    PORT,
    console.log(`Server running in ${ENV} mode on port ${PORT}`.yellow.bold),
);

// Handle unhandled promoise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    // Close server & exit process
    server.close(() => process.exit(1));
});







