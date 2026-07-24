require('dotenv').config(); 

const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const swaggerUi = require ('swagger-ui-express');
const swaggerJsdoc = require ('swagger-jsdoc');
const musicRoutes = require('./routes/music.routes')

const app = express();

app.use(express.json());

app.use(cookieParser());
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Musify API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/auth.routes.js'], // make sure this path matches your folder structure!
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ⚠️ Make sure this line is executed!
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/auth',authRoutes)
app.use('/api/music',musicRoutes)


module.exports = app;