import clientPromise from "../../../lib/mongodb";
export default async (req, res) => {
const client = await clientPromise;
const db = client.db("Todo");
const collection = db.collection("Todos")
    const { method } = req
    switch (method) {
        case 'GET':
          try {
            const result = await collection
                .find({})
                .sort({ metacritic: -1 })
                .limit(1000)
                .toArray();

                res.status(201).json({ success: true, data: result })
          } catch (error) {
            res.status(400).json({ success: false })
          }
          break
        case 'POST':
          try {
            const status =  req.body.Status
            const dataInserts = {
              Title: "Untitled",
              Content: "",
              Status: status,
              CreateOn:new Date()
            }
            const result =await collection
            .insertOne(dataInserts)
            res.status(201).json({ success: true, data: dataInserts })
          } catch (error) {
            res.status(400).json({ success: false })
          }
          break
        default:
          res.status(400).json({ success: false })
          break
      }
}
