import React, { createContext, useEffect, useState } from 'react';
import { MdHowToVote, MdLocalGroceryStore, MdOutlinePayment, MdSpaceDashboard } from 'react-icons/md';
import { FaStore, FaUsers, FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AdminLogoutButton from './AdminLogoutButton';
import { useNavigate } from "react-router-dom";

export const SidebarLinkContext = createContext();

const mainlinks = [
  { title: 'Dashboard', path: '/dashboard', icon: <MdSpaceDashboard className="text-xl" /> },
  { title: 'New Item', path: 'new-item', icon: <MdLocalGroceryStore className="text-xl" /> },
  { title: 'Items', path: 'items', icon: <FaStore className="text-xl" /> },
  { title: 'Order', path: 'order', icon: <MdLocalGroceryStore className="text-xl" /> },
  { title: 'Customers', path: 'customers', icon: <FaUsers className="text-xl" /> },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();  

  return (
    <div className="relative">

      <div className={`h-screen overflow-y-auto pb-5 z-20 bg-white text-gray-400 fixed lg:static ${isOpen ? 'w-64' : 'w-0'} transition-all duration-300`}>
        <div className="px-5 py-4 flex items-center w-full  lg:justify-center justify-between bg-pink-600 rounded-b-2xl">
          <Link to={'/'}>
            <h1 className="lg:text-2xl text-xl text-center font-bold text-white">Hardayfunkeh</h1>
          </Link>
          <button onClick={toggleSidebar} className="text-2xl bg-white rounded-xl lg:hidden focus:outline-none" aria-label="Close Sidebar">
            <IoClose className={'text-pink-600'}/>
          </button>
        </div>
        <nav className="flex flex-col gap-4 mx-2 mt-10 navlink">
          {mainlinks.map((link, index) => (
            <Link key={index} to={link.path} className={`flex items-center gap-2 px-3 py-2 rounded-md font-normal duration-200 ${location.pathname === `/dashboard/${link.path}` ? 'bg-pink-600 text-white font-semibold' : 'text-gray-800 hover:bg-pink-600 hover:text-white'}`}> 
              <span className={`${location.pathname === `/dashboard/${link.path}` ? '' : 'icon'}`}>
                {link.icon}
              </span>
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-full py-3 mx-auto bg-pink-600 rounded-t-3xl">
          <AdminLogoutButton/>
        </div>
      </div>
    </div>
  );
};

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const routeTitle = location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard';

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <header className="text-white z-10 top-0 sticky bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-gray-500 capitalize font-medium">{routeTitle}</h2>
        <button onClick={handleBack} className="py-2 px-6 text-white rounded-md hidden lg:block bg-pink-600">
          Back
        </button>
        <button onClick={toggleSidebar} className="text-2xl p-2 text-slate-900 lg:hidden focus:outline-none" aria-label="Open Sidebar">
          ☰
        </button>
      </div>
    </header>
  );
};

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col relative max-h-[100vh]">
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="overflow-x-hidden h-[100vh] flex-1 overflow-y-auto bg-slate-200 text-black">
          <Header toggleSidebar={toggleSidebar} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
