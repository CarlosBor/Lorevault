import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  //This in here is just a variable to pass to the db calls
  const {searchCriteria} = req.query;

  let { db } = await connectToDatabase();
  //In here, the object inside the .find function filters results
  const entries = await db.collection("LorevaultEntries").find(req.query).toArray();
  res.status(200).json(entries);
}
