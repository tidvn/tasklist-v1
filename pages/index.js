import axios from "axios";
import Panel from "@/components/dialog";
import { useState, useEffect } from 'react'
export default function Home() {
  const [Task_List, setTask] = useState([])

  const [isLoading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    axios.get(`/api/task`)
    .then(res => {
      setTask(res.data.data ?? [])
      setLoading(false)
    })
  }, [])
  const removeItem = (id) => {
    setTask(Task_List.filter(item => item._id !== id));
  };


  const EditItem = (id,updatedItem) => {
    // console.log(id,updatedItem)
    const updated_Task = Task_List.map(item => {
      if (item._id == id) {
        return {
          ...item,
          ...updatedItem
        }
      } else {
        return item;
      }
    });
    setTask(updated_Task)
    };
  

  if (isLoading) return <p>Loading...</p>
async function Create_Item(status) {

  try { 
          
    const res = await axios.post(`/api/task`,{Status:status});
    setTask([...Task_List, res.data.data])

  } catch (error) {
    console.error(error);
  }

}

  return (
    <div className="grid grid-cols-3 gap-4">
<div className="col-span-1 py-4 px-6">
   <h3>Task</h3>
    <div className="grid grid-cols-1 gap-4">
      
      {Task_List.filter(item => item.Status == 0).map((item) => 
     (<Panel item={item} key={item._id}  onRemove={removeItem} onEdit={EditItem}  />)
     )}
     
     <div className="bg-white p-2">
    <div  onClick={() => Create_Item(0)} className="bg-white shadow-md rounded py-4 px-6 hover:bg-slate-100">Add new</div>

    </div>
    </div>
  </div>
  <div className="col-span-1 py-4 px-6">
  <h3>Doing</h3>
    <div className="grid grid-cols-1 gap-4">
    {Task_List.filter(item => item.Status == 1).map((item) => 
     (<Panel item={item} key={item._id}  onRemove={removeItem} onEdit={EditItem} />)
     )}
     
    <div className="bg-white p-2">
    <div  onClick={() => Create_Item(1)} className="bg-white shadow-md rounded py-4 px-6 hover:bg-slate-100">Add new</div>

    </div>
    </div>
  </div>
  <div className="col-span-1 py-4 px-6">
  <h3>Done</h3>
    <div className="grid grid-cols-1 gap-4">
  
    {Task_List.filter(item => item.Status == 2).map((item) => 
     (<Panel item={item} key={item._id}  onRemove={removeItem} onEdit={EditItem} />)
     )}
     
         <div className="bg-white p-2">
    <div  onClick={() => Create_Item(2)} className="bg-white shadow-md rounded py-4 px-6 hover:bg-slate-100">Add new</div>

    </div>
    </div>
  </div>
</div>
  )
}

// // This function gets called at build time on server-side.
// // It won't be called on client-side, so you can even do
// // direct database queries.
// export async function getServerSideProps() {
//   const res = await axios.get(`http://127.0.0.1:8081/task`);
//    const data =  res.data 
//    return { props: { data } }
// }

