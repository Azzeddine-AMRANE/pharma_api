import { Request, Response } from "express";
import * as MongoHelper from "../config/mongo";
import { check, validationResult } from "express-validator";


/**
 * GET /getByCIP/:cip
 * Get the informations by CIP passed in request params.
 */
export const getByCIP = async (req: Request, res: Response) => {
 
    await check("cip","is not valide cip number").isLength({ min: 13, max: 13 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }

    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.aggregate([
        {$match : {cip13 : req.params.cip}},
        {$lookup: {from: "CIS",localField: "cis",foreignField: "cis",as: "CIS"}},
        {$lookup: {from: "CIS_COMPO",localField: "cis",foreignField: "cis",as: "COMPO"}}
    ]).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};


/**
 * GET /getByCIS/:cis
 * Get the informations by CIS passed in request params.
 */
export const getByCIS = async (req: Request, res: Response) => {
 
    await check("cis","is not valide cis number").isLength({ min: 8, max: 8 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }

    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.aggregate([
        {$match : {cis : req.params.cis}},
        {$lookup: {from: "CIS",localField: "cis",foreignField: "cis",as: "CIS"}},
        {$lookup: {from: "CIS_COMPO",localField: "cis",foreignField: "cis",as: "COMPO"}}
    ]).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};

/**
 * GET /getByName/:name
 * Get a liste of medics that contains the name passed in request params.
 */
export const getByName = async( req: Request, res: Response) => {

    await check("name","is Empty").notEmpty().isLength({min: 1}).run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }
    const collection = await MongoHelper.getCollection("CIS");
    collection.find({name : new RegExp( req.params.name )}).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};

/**
 * Get /getAllByManufacturer/:manufacturer
 * Get all medics made by one given manufacturer 
 */
export const getAllByManufacturer = async ( req: Request, res: Response) => {

    if(!req.params.owner) {
        res.status(400).end({error : "You have to give owner name"});
    }else {
        const collection = await MongoHelper.getCollection("CIS");
        collection.find( {owner: req.params.owner}).toArray((err: any , doc: any[]) => {
            if (err) console.log(err);
            if ( doc !== undefined && doc[0] !== undefined ) {
                res.status(200).end(JSON.stringify(doc));
            }else{
                res.status(200).json({response : "no result found in the database"});
            }
        });   
    } 
};


/**
 * Get /getByAdministration/:type
 * Get liste of medics by administration type
 */
export const getByAdministration = async ( req: Request, res: Response) => {
    await check("Type","is Empty").notEmpty().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }
    const collection = await MongoHelper.getCollection("CIS");
    collection.find({administration : req.params.type}).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};



/**
 * Get /getByPriceEquals/:price
 * Get all medications whose price equals that passed in parameter
 */
export const getByPriceEquals = async ( req: Request, res: Response) => {
    await check("price","is Empty or not a number").notEmpty().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.find({price : req.params.price}).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};

/**
 * Get /getByPriceLess/:price
 * Get all medications whose price below that passed in parameter
 */
export const getByPriceLess = async ( req: Request, res: Response) => {
    await check("price","is Empty or not a number").notEmpty().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.find({price : {$lte: req.params.price}}).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};

/**
 * Get /getByPriceGreater
 * Get all medications whose price higher that passed in parameter
 */
export const getByPriceGreater = async ( req: Request, res: Response) => {
    await check("price","is Empty or not a number").notEmpty().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    collection.find({price : {$gte: req.params.price}}).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};


/**
 * Get /getByRepayment/:rate
 * Get all medications whose repayment rate equals that passed in parameter
 */
export const getByRepayment = async ( req: Request, res: Response) => {
    await check("rate","is Empty or nor valide").notEmpty().isLength({min: 2, max: 4}).run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }
    const collection = await MongoHelper.getCollection("CIS_CIP");
    // eslint-disable-next-line @typescript-eslint/camelcase
    collection.find({repayment_rate : req.params.rate}).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};


/**
 * Get /getBySubstanceName/:subsName
 * Get all medications by SubstanceName
 */
export const getBySubstanceName = async ( req: Request, res: Response) => {
    await check("substance name","is Empty").notEmpty().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }
    const collection = await MongoHelper.getCollection("CIS_COMPO");
    // eslint-disable-next-line @typescript-eslint/camelcase
    collection.find({substance_name: req.params.subsName}).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};

/**
 * Get /getBySubstanceCode/:code
 * Get all medications by SubstanceCode
 */
export const getBySubstanceCode = async ( req: Request, res: Response) => {
    await check("substance code","is Empty").notEmpty().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()});
    }
    const collection = await MongoHelper.getCollection("CIS_COMPO");
    // eslint-disable-next-line @typescript-eslint/camelcase
    collection.find({code_substance: req.params.code}).toArray((err: any , doc: any[]) => {
        if (err) console.log(err);
        if ( doc !== undefined && doc[0] !== undefined ) {
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(200).json({response : "no result found in the database"});
        }
    });
};




 