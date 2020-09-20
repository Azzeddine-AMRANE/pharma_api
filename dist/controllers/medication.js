"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoHelper = __importStar(require("../config/mongo"));
const express_validator_1 = require("express-validator");
/**
 * GET /getByCIP/:cip
 * Get the informations by CIP passed in request params.
 */
exports.getByCIP = async (req, res) => {
    await express_validator_1.check("cip", "is not valide cip number").isLength({ min: 13, max: 13 }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.aggregate([
        { $match: { cip13: req.params.cip } },
        { $lookup: { from: "CIS", localField: "cis", foreignField: "cis", as: "CIS" } },
        { $lookup: { from: "CIS_COMPO", localField: "cis", foreignField: "cis", as: "COMPO" } }
    ]).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
/**
 * GET /getByCIS/:cis
 * Get the informations by CIS passed in request params.
 */
exports.getByCIS = async (req, res) => {
    await express_validator_1.check("cis", "is not valide cis number").isLength({ min: 8, max: 8 }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.aggregate([
        { $match: { cis: req.params.cis } },
        { $lookup: { from: "CIS", localField: "cis", foreignField: "cis", as: "CIS" } },
        { $lookup: { from: "CIS_COMPO", localField: "cis", foreignField: "cis", as: "COMPO" } }
    ]).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
/**
 * GET /getByName/:name
 * Get a liste of medics that contains the name passed in request params.
 */
exports.getByName = async (req, res) => {
    await express_validator_1.check("name", "is Empty").notEmpty().isLength({ min: 1 }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS");
    collection.find({ name: new RegExp(req.params.name) }).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
/**
 * Get /getAllByManufacturer/:manufacturer
 * Get all medics made by one given manufacturer
 */
exports.getAllByManufacturer = async (req, res) => {
    if (!req.params.owner) {
        res.status(400).end({ error: "You have to give owner name" });
    }
    else {
        const collection = await MongoHelper.getCollection("CIS");
        collection.find({ owner: req.params.owner }).toArray((err, doc) => {
            if (err)
                console.log(err);
            if (doc !== undefined && doc[0] !== undefined) {
                res.status(200).end(JSON.stringify(doc));
            }
            else {
                res.status(200).json({ response: "no result found in the database" });
            }
        });
    }
};
/**
 * Get /getByAdministration/:type
 * Get liste of medics by administration type
 */
exports.getByAdministration = async (req, res) => {
    await express_validator_1.check("Type", "is Empty").notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS");
    collection.find({ administration: req.params.type }).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
/**
 * Get /getByPriceEquals/:price
 * Get all medications whose price equals that passed in parameter
 */
exports.getByPriceEquals = async (req, res) => {
    await express_validator_1.check("price", "is Empty or not a number").notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.find({ price: req.params.price }).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
/**
 * Get /getByPriceLess/:price
 * Get all medications whose price below that passed in parameter
 */
exports.getByPriceLess = async (req, res) => {
    await express_validator_1.check("price", "is Empty or not a number").notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.find({ price: { $lte: req.params.price } }).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
/**
 * Get /getByPriceGreater
 * Get all medications whose price higher that passed in parameter
 */
exports.getByPriceGreater = async (req, res) => {
    await express_validator_1.check("price", "is Empty or not a number").notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.find({ price: { $gte: req.params.price } }).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
/**
 * Get /getByRepayment/:rate
 * Get all medications whose repayment rate equals that passed in parameter
 */
exports.getByRepayment = async (req, res) => {
    await express_validator_1.check("rate", "is Empty or nor valide").notEmpty().isLength({ min: 2, max: 4 }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    // eslint-disable-next-line @typescript-eslint/camelcase
    collection.find({ repayment_rate: req.params.rate }).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
/**
 * Get /getBySubstanceName/:subsName
 * Get all medications by SubstanceName
 */
exports.getBySubstanceName = async (req, res) => {
    await express_validator_1.check("substance name", "is Empty").notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS_COMPO");
    // eslint-disable-next-line @typescript-eslint/camelcase
    collection.find({ substance_name: req.params.subsName }).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
/**
 * Get /getBySubstanceCode/:code
 * Get all medications by SubstanceCode
 */
exports.getBySubstanceCode = async (req, res) => {
    await express_validator_1.check("substance code", "is Empty").notEmpty().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const collection = await MongoHelper.getCollection("CIS_COMPO");
    // eslint-disable-next-line @typescript-eslint/camelcase
    collection.find({ code_substance: req.params.code }).toArray((err, doc) => {
        if (err)
            console.log(err);
        if (doc !== undefined && doc[0] !== undefined) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            res.status(200).json({ response: "no result found in the database" });
        }
    });
};
//# sourceMappingURL=medication.js.map