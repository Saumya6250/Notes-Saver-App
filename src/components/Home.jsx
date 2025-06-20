import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../redux/pasteSlice';


function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {/* Other components / Routes */}
    </>
  );
}

const Home = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes); //get all pastes

   //  Redux to store the paste:  dispatcher
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("inside use effect");
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      console.log("Page Found");
      setTitle(paste.title);
      setContent(paste.content);
    }
  }, [pasteId, allPastes]);

  //logic for button 'create paste'->paste create karke slice ko send karwade
  function handleCreatePaste() {
     if (title.trim() === '' || content.trim() === '') {
    toast.error('Fill all the fields ');
    return;
  }

    const paste = {
      title: title,
      content: content,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

     if(pasteId)
          { 
            //update
            dispatch(updateToPaste(paste));
          }
          else
          {
            //create
            dispatch(addToPaste(paste));

           }
           //after creation or updation the content and title box to be reset to clear
           setTitle('');
           setContent('');
           setSearchParams({});
    }

  return (
    <div className="px-6 py-8">
      <div className="flex gap-4 items-center mb-6">
        <input
          className=" bg-gray-100 text-black flex-1 border-2 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 "
          type='text'
          placeholder='Title'         //  TITLE BOX
          value={title}
          onChange={(e) => setTitle(e.target.value)} //Updates the title on every keystroke
        />

        <button
          onClick={handleCreatePaste}
          className="bg-pink-500 text-white font-semibold px-5 py-2 rounded-md shadow hover:bg-purple-700 transition duration-200"
        >
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="w-full bg-white rounded-xl shadow-md p-4 relative ">
        {/* Chrome-style buttons */}
        <div className="flex space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

       
        <textarea
          className="  bg-gray-100 w-full h-80 outline-none resize-none border-2 px-4 py-2 rounded-md shadow-sm focus:outline-none  text-black placeholder-gray-400 p-3"
          value={content}
          placeholder='Write Your Content Here...'       // CONTENT BOX
          onChange={(e) => setContent(e.target.value)}
        />

      </div>
    </div>
  );
};

export default Home;
