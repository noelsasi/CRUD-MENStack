const express = require("express");
const glob = require("glob");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || "development";
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == "development";

  app.set("views", config.root + "/app/views");
  app.set("view engine", "pug");

  // app.use(favicon(config.root + "/public/img/favicon.ico"));
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + "/public"));
  app.use(express.static(path.join(config.root + "/app")));
  app.use(methodOverride());

  // var controllers = glob.sync(config.root + "/app/controllers/*.js");
  // controllers.forEach(controller => {
  //   require(controller)(app);
  // });

  // app.use((req, res, next) => {
  //   var err = new Error("Not Found");
  //   err.status = 404;
  //   next(err);
  // });

  // if (app.get("env") === "development") {
  //   app.use((err, req, res, next) => {
  //     res.status(err.status || 500);
  //     res.render("error", {
  //       message: err.message,
  //       error: err,
  //       title: "error"
  //     });
  //   });
  // }

  // app.use((err, req, res, next) => {
  //   res.status(err.status || 500);
  //   res.render("error", {
  //     message: err.message,
  //     error: {},
  //     title: "error"
  //   });
  // });

  return app;
};
