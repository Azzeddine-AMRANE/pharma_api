import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import session from "express-session";
import { SESSION_SECRET } from "./util/secrets";
import * as MongoHelper from "./config/mongo";


// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as contactController from "./controllers/contact";
import * as medicationController from "./controllers/medication";

// Create Express server
const app = express();

// Connect to MongoDB
MongoHelper.connect().then( () => {
    console.log(" Connected to the mongoDB on atlas");
}). catch ( err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session( {secret: SESSION_SECRET} ));

app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app Routes.
 */

app.get("/", homeController.index);
app.get("/contact", contactController.getContact);
app.post("/contact", contactController.postContact);


/**
 * Medication Routes
 */
app.get("/getByCIP/:cip", medicationController.getByCIP);
app.get("/getByCIS/:cis", medicationController.getByCIS);
app.get("/getByName/:name", medicationController.getByName);
app.get("/getByAdministration/:type", medicationController.getByAdministration);
app.get("/getByPriceEquals/:price", medicationController.getByPriceEquals);
app.get("/getByPriceLess/:price", medicationController.getByPriceLess);
app.get("/getByPriceGreater/:price", medicationController.getByPriceGreater);
app.get("/getByRepayment/:rate", medicationController.getByRepayment);
app.get("/getBySubstanceName/:subsName", medicationController.getBySubstanceName);
app.get("/getBySubstanceCode/:code", medicationController.getBySubstanceCode);
export default app;
