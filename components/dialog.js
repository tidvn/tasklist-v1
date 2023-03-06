import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import axios from "axios";

export default function Panel(props) {
  const { item, onRemove,onEdit } = props;
  const [open, setOpen] = useState(false)  
  const Status_Options = [
    {
      label: "Todo",
      value: '0',
    },
    {
      label: "Doing",
      value: '1',
    },
    {
      label: "Done",
      value: '2',
    },
  ];
  const [formdata, setFormdata] = useState({
    Title: item.Title,
    Content: item.Content,
    Status: item.Status.toString(),
  });
  console.log(formdata)
  function handleChange(e) {    
      setFormdata({ ...formdata, [e.target.name]: e.target.value });    
  }
  async function Edit_Item() {

    try {
      const id = item._id 
      const res = await axios.put(`/api/task/${id}`,
      {
        Title: formdata.Title,
        Content: formdata.Content,
        Status:formdata.Status
      });
      await onEdit(id,res.data.data);
      setOpen(false)
    } catch (error) {
      console.error(error);
    }
  
  }

  async function Delete_Item() {
    try {
      const id = item._id     
      await axios.delete(`/api/task/${id}`);     
      await onRemove(id);
      setOpen(false)
    } catch (error) {
      console.error(error);
    }
  
  }
   return (
    <div className="bg-white p-2">
      {open && (
        
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                         Todo App
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        
                        
                        
                        
                      <div className="mt-5 md:col-span-2 md:mt-0">
      <form action="#" method="POST">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">

              <div className="col-span-6 lg:col-span-8">
                <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
               Title
                </label>
                <input type="text" name="Title"  onChange={handleChange} value={formdata.Title} placeholder="Untitled"  className="input input-bordered input-success w-full" />

              </div>
              <div className="col-span-6 lg:col-span-8">
              <label htmlFor="Content" className="block text-sm font-medium text-gray-700">
              Content
              </label>
              <textarea  type="text"  name="Content" onChange={handleChange} value={formdata.Content}  className="textarea textarea-accent w-full" />
            </div>

              
            <div className="col-span-6 lg:col-span-8">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  Asset
                  </label>
                  <select  className="select select-primary w-full" onChange={handleChange} name="Status" value={formdata.Status}>
                 
                  {Status_Options &&
                    Status_Options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                  ))}
                  </select>                 
                </div>




            </div>
          </div>
          
           
          <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => Edit_Item()}
             
            >Edit</button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => Delete_Item()}
            
            >Delete</button>
          
        </div>
      </form>
    </div>  
                        </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      
      )}
<div  onClick={() => setOpen(true)} className="bg-white shadow-md rounded py-4 px-6 hover:bg-slate-100">{item.Title}

</div>
</div>
)
}