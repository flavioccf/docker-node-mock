require('dotenv').config({  
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
})
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const port = process.env.PORT;
const app = express();
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const ProjectController = require('./controllers/ProjectController');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Node Mock API",
      description: "Mock API using Express and PGSql",
      contact: {
        name: "flavioccf"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["src/app.js","src/controllers/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//User Routes
/**
 * @swagger
 * /users:
 *  get:
 *    description: Test User routes
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.use('/users', UserController);
// Post Routes
app.use('/posts', PostController);
// Project Routes
app.use('/projects', ProjectController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log("Running on port: " + port);
});
