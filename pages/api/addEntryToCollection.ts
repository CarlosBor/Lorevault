import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //req.body has the form information
    const parsedRequest = JSON.parse(req.body);
    let { db } = await connectToDatabase();
    const LorevaultEntries = await db.collection("LorevaultEntries");
    const result = await LorevaultEntries.insertOne(parsedRequest);
    res.status(200).json(result);
    
}