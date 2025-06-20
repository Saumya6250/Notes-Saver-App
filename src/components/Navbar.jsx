import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full bg-indigo-500 text-black  flex-1 border-2 px-4 py-4 rounded-md shadow-sm ">
      <div className="flex justify-center gap-8 text-lg font-large font-bold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-white' : 'hover:text-blue-300 transition'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            isActive ? 'text-white' : 'hover:text-blue-300 transition'
          }
        >
          NoteNest
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
