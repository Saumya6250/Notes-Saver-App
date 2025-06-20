import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // ✅ FIXED: added RouterProvider
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    )
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    )
  },
  {
    path: "/pastes/:id", // sirf Specific id wala paste nazar ayega
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    )
  }
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <RouterProvider router={router} />
       
    </div>
  );
}

export default App;
