import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import viewIcon from '../images/view.png';
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import copyIcon from '../images/copy.png';


const Paste = () => {

  const pastes=useSelector((state)=>state.paste.pastes);

  const[searchTerm,setSearchTerm]=useState('');
    
  const dispatch=useDispatch();

  const filteredData=pastes.filter(
      (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //delete pase
    function handleDelete(pasteId)
    {
      dispatch(deleteFromPastes(pasteId));
    }
    //  copy paste
    const handleCopy = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => toast.success("Copied to clipboard!"))
    .catch((err) => alert("Failed to copy"));

    
};

  return (
  <div className="p-4">
    <input
      className="bg-white min-w-[600px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
      type="search"
      placeholder="Search here"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

{filteredData.length > 0 &&
  filteredData.map((paste) => (
    <div
      key={paste._id}
      className="flex justify-between items-start border p-3 mt-4 rounded shadow bg-gray-50"
    >
      {/* Left: Title + Content */}
      <div className="flex flex-col w-2/3">
        <div className="font-semibold text-base text-black mb-1">
          {paste.title}
        </div>
        <div className="text-gray-700 text-sm line-clamp-2 text-left">
          {paste.content}
        </div>
      </div>

      {/* Right: Buttons + Date */}
      <div className="flex flex-col items-end gap-2 w-1/3">
        <div className="flex gap-2 flex-wrap justify-end">
          <a href={`/?pasteId=${paste._id}`}>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 py-1 text-sm border border-blue-500 hover:border-transparent rounded">
              <img src={editIcon} alt="Edit" className="w-5 h-5" />
            </button>
          </a>
          <a href={`/pastes/${paste._id}`}>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 py-1 text-sm border border-blue-500 hover:border-transparent rounded">
              <img src={viewIcon} alt="Edit" className="w-5 h-5" />
            </button>
          </a>
          <button
            onClick={() => handleDelete(paste._id)}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 py-1 text-sm border border-blue-500 hover:border-transparent rounded"
          >
            <img src={deleteIcon} alt="Edit" className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleCopy(paste.content)}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-3 py-1 text-sm border border-blue-500 hover:border-transparent rounded"
          >
            <img src={copyIcon} alt="Edit" className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-gray-500 mt-1 flex items-center">
          <img
            src="/icons/calendar.png"
            alt="calendar"
            className="w-3 h-3 mr-1"
            onError={(e) => (e.target.style.display = 'none')}
          />
          {new Date(paste.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  ))}

  </div>
);
};

export default Paste
