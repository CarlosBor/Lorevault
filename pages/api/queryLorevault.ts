import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  interface SearchObject{
    name?: {
      $regex : string | string[];
    }
    categories?: {
      $in: string[];
    }
  }

  const { db } = await connectToDatabase();
  const searchObject:SearchObject = {};

  if(req.query.name){
    searchObject.name = {$regex : req.query.name};
  }

  if(req.query.categories){
    if (!Array.isArray(req.query.categories)){
      req.query.categories = [req.query.categories];
    }
    searchObject.categories = {$in: req.query.categories};
  }
  try{
    const entries = await db.collection("LorevaultEntries").find(searchObject).toArray();
    res.status(200).json(entries);
  } catch(e){
    res.status(500).json({ errorMessage: "An error occured." });
  }
}
