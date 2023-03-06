import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Todo");
  const collection = db.collection("Todos")
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    // case 'GET' /* Get a model by its ID */:
    //   try {
    //     const result = collection.find({_id: new ObjectId(id)});
    //     if (!result) {
    //       return res.status(400).json({ success: false,data:null })
    //     }
    //     res.status(200).json({ success: true, data: result })
    //   } catch (error) {
    //     console.log(error)
    //     res.status(400).json({ success: false,data:null })
    //   }
    //   break

    case 'PUT' /* Edit a model by its ID */:
      try {
        let newvalues = {
            Title: req.body.Title,
            Content: req.body.Content,
            Status: req.body.Status,
        };
        const result = await collection
        .updateOne({ _id: new ObjectId( id )}, {$set: newvalues})
        if (!result) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: newvalues})
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const result = await collection
        .deleteOne({ _id: new ObjectId( id )})
         if (!result) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
