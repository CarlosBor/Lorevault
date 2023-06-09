import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import {ObjectId} from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    //Ensuring query is a string
    let query;
    if(typeof req.query._id==="object"){
        query = req.query._id[0];
    }else{
        query = req.query._id;
    }

    let { db } = await connectToDatabase();
    //In here, the object inside the .find function filters results
    console.log(req.query, "This is the request query");
    const objectId = new ObjectId(query);
    const entries = await db.collection("LorevaultEntries").findOne(objectId);
    res.status(200).json(entries);
}
