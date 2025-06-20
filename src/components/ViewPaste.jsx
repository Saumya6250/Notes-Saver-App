import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="px-6 py-8">
      <div className="flex gap-4 items-center mb-6">
        <input
          className="flex-1 border border-gray-300 px-4 py-2 rounded-md shadow-sm bg-gray-100 text-gray-600"
          type='text'
          placeholder='Enter title'      //  TITLE BOX
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)} //Updates the title on every keystroke
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 relative min-w-[500px]">
        {/* Chrome-style buttons */}
        <div className="flex space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full h-80 outline-none resize-none bg-gray-100 text-gray-700 placeholder-gray-400"
          value={paste.content}
          placeholder='Write Your Content Here...'         // CONTENT BOX
          disabled
          onChange={(e) => setContent(e.target.value)}
        />

       
      </div>
    </div>
  );
}

export default ViewPaste;
