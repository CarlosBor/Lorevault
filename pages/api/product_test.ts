import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  //This in here is just a variable to pass to the db calls
  const {productId} = req.query;

  let { db } = await connectToDatabase();
  //In here, the object inside the .find function filters results
  const products = await db.collection("sales").find({purchaseMethod: productId}).limit(5).toArray();
  res.status(200).json({ products });
}
