import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  //This in here is just a variable to pass to the db calls
  const {searchCriteria} = req.query;

  let { db } = await connectToDatabase();
  //In here, the object inside the .find function filters results
  console.log(req.query, "This is the request query");
  console.log(typeof req.query.categories);
  let entries;
  if(req.query.categories){
    if (!Array.isArray(req.query.categories)){
      req.query.categories = [req.query.categories];
    }
    entries = await db.collection("LorevaultEntries").find({name: req.query.name, infoType:{$in: req.query.categories}}).toArray();
  }else{
    entries = await db.collection("LorevaultEntries").find({name: req.query.name}).toArray();
  }

  res.status(200).json(entries);
}
