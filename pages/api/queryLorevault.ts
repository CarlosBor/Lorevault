import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  interface SearchObject{
    //Esto es una ñapa wtf is that any
    name?: string | string[] | any;
    categories?: string[] | any;
} 

  //This in here is just a variable to pass to the db calls
  const {searchCriteria} = req.query;

  let { db } = await connectToDatabase();
  //In here, the object inside the .find function filters results
  console.log(req.query, "This is the request query");

  let searchObject:SearchObject = {};
  let entries;
  
  if(req.query.name){
    searchObject.name = {$regex : req.query.name};
  }

  if(req.query.categories){
    if (!Array.isArray(req.query.categories)){
      req.query.categories = [req.query.categories];
    }
    searchObject.categories = {$in: req.query.categories};
  }
  console.log(searchObject, "This is the search Object");
  entries = await db.collection("LorevaultEntries").find(searchObject).toArray();
  res.status(200).json(entries);
}
