import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// **Register Required Chart.js Components**
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState({
    totalItems: 0,
    abaya: 0,
    jalab: 0,
    jewellery: 0,
    fabrics: 0,
    totalOrders: 0,
    totalCustomers: 0,
    customers: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch('https://hardayfunkeh-apis.vercel.app/api/products/all-products');
        const products = await productRes.json();

        const abaya = products.filter(item => item.category === 'Abaya').length;
        const jalab = products.filter(item => item.category === 'Jalab').length;
        const jewellery = products.filter(item => item.category === 'Jewellery').length;
        const fabrics = products.filter(item => item.category === 'Fabric').length;

        const orderRes = await fetch('https://hardayfunkeh-apis.vercel.app/api/order/all_orders');
        const orders = await orderRes.json();

        const customerRes = await fetch('https://hardayfunkeh-apis.vercel.app/api/user/auth/all-user');
        const customers = await customerRes.json();

        setData({
          totalItems: products.length,
          abaya,
          jalab,
          jewellery,
          fabrics,
          totalOrders: orders.length,
          totalCustomers: customers.length,
          customers,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // **Pagination Logic**
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = data.customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // **Chart Data**
  const barChartData = {
    labels: ['Abaya', 'Jalab', 'Jewellery', 'Fabrics'],
    datasets: [
      {
        label: 'Total Items per Category',
        data: [data.abaya, data.jalab, data.jewellery, data.fabrics],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const pieChartData = {
    labels: ['Abaya', 'Jalab', 'Jewellery', 'Fabrics'],
    datasets: [
      {
        data: [data.abaya, data.jalab, data.jewellery, data.fabrics],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Products: {data.totalItems}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Orders: {data.totalOrders}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Customers: {data.totalCustomers}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Abaya: {data.abaya}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Jalab: {data.jalab}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Jewellery: {data.jewellery}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Fabrics: {data.fabrics}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Products Distribution (Bar Chart)</h2>
          <Bar data={barChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Products Distribution (Pie Chart)</h2>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Customers</h2>
          {/* See More Link */}
          <div className="text-right mt-4">
            <Link to="customers" className="text-[#C70039] underline">See More Customers</Link>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="bg-linear-to-b from-[#C70039] to-red-500 text-start font-semibold text-white px-2 py-3 rounded-l-md">Firstname</th>
              <th className="bg-linear-to-b from-[#C70039] to-red-500 text-start font-semibold text-white px-2 py-3">Lastname</th>
              <th className="bg-linear-to-b from-[#C70039] to-red-500 text-start font-semibold text-white px-2 py-3">Phone</th>
              <th className="bg-linear-to-b from-[#C70039] to-red-500 text-start font-semibold text-white px-2 py-3">Email</th>
              <th className="bg-linear-to-b from-[#C70039] to-red-500 text-start font-semibold text-white px-2 py-3">State</th>
              <th className="bg-linear-to-b from-[#C70039] to-red-500 text-start font-semibold text-white px-2 py-3">City</th>
              <th className="bg-linear-to-b from-[#C70039] to-red-500 text-start font-semibold text-white px-2 py-3 rounded-r-md">Address</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr key={index} className="text-center">
                <td className="py-3 text-start text-gray-600 border border-gray-300 p-2">{customer.firstname}</td>
                <td className="py-3 text-start text-gray-600 border border-gray-300 p-2">{customer.lastname}</td>
                <td className="py-3 text-start text-gray-600 border border-gray-300 p-2">{customer.phone}</td>
                <td className="py-3 text-start text-gray-600 border border-gray-300 p-2">{customer.email}</td>
                <td className="py-3 text-start text-gray-600 border border-gray-300 p-2">{customer.state}</td>
                <td className="py-3 text-start text-gray-600 border border-gray-300 p-2">{customer.city}</td>
                <td className="py-3 text-start text-gray-600 border border-gray-300 p-2">{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(data.customers.length / customersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === i + 1 ? 'bg-linear-to-b from-[#C70039] to-red-500 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
