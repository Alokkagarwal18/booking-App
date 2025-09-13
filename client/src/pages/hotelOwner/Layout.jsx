// import React from 'react';
// import Navbar from '../../components/hotelOwner/Navbar';
// import Sidebar from '../../components/hotelOwner/Sidebar';
// import { Outlet } from 'react-router-dom';

// const Layout = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar />
//       <div className='flex h-full'>
//         <Sidebar />
//         <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React from 'react';
import Navbar from '../../components/hotelOwner/Navbar';
import Sidebar from '../../components/hotelOwner/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar with border */}
        <Sidebar className="h-full border-r border-gray-300" />

        {/* Main Content */}
        <div className="flex-1 p-4 pt-10 md:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;




// import React from 'react';
// import Navbar from '../../components/hotelOwner/Navbar';
// import Sidebar from '../../components/hotelOwner/Sidebar';
// import { Outlet } from 'react-router-dom';

// const Layout = () => {
//   return (
//     <div className="flex flex-col min-h-screen"> {/* allow page to grow */}
//       <Navbar />
//       <div className="flex flex-1"> {/* take remaining height */}
//         <Sidebar />
//         <div className="flex-1 p-4 pt-10 md:px-10"> 
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;


// Layout.jsx
// import React from "react";
// import Sidebar from '../../components/hotelOwner/Sidebar';
// import Dashboard from "./Dashboard";


// const Layout = () => {
//   return (
//     <div className="flex min-h-screen">
   
//       {/* Sidebar */}
//       <div className="w-64 border-r border-gray-300 bg-white flex flex-col">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <main className="flex-1 p-6 overflow-y-auto">
//           <Dashboard />
//         </main>

//       </div>
//     </div>
//   );
// };

// export default Layout;
