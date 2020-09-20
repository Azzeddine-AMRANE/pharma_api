"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = __importStar(require("mongodb"));
const secrets_1 = require("../util/secrets");
let clientConnection;
const connect = () => {
    return new Promise((resolve, reject) => {
        mongo.MongoClient.connect(secrets_1.MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                reject(err);
            }
            else {
                clientConnection = client;
                resolve(client);
            }
        });
    });
};
exports.connect = connect;
const disconnect = () => {
    clientConnection.close();
};
exports.disconnect = disconnect;
const getCollection = async (collection) => {
    return clientConnection.db("Pharmacie").collection(collection);
};
exports.getCollection = getCollection;
//# sourceMappingURL=mongo.js.map