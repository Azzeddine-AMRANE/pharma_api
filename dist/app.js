"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const express_flash_1 = __importDefault(require("express-flash"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const secrets_1 = require("./util/secrets");
const MongoHelper = __importStar(require("./config/mongo"));
// Controllers (route handlers)
const homeController = __importStar(require("./controllers/home"));
const contactController = __importStar(require("./controllers/contact"));
const medicationController = __importStar(require("./controllers/medication"));
// Create Express server
const app = express_1.default();
// Connect to MongoDB
MongoHelper.connect().then(() => {
    console.log(" Connected to the mongoDB on atlas");
}).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});
// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({ secret: secrets_1.SESSION_SECRET }));
app.use(express_flash_1.default());
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
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
exports.default = app;
//# sourceMappingURL=app.js.map