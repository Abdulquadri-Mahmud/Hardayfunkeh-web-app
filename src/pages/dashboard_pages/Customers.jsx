import React, { createContext, Suspense, useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export const CustomerlistContext = createContext();
const Customerlists = React.lazy(() => import('../../components/DashboardComp/CustomerLists'));

export default function Customer_page() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://hardayfunkeh-apis.vercel.app/api/user/auth/all-user');
        const users = await res.json();
        if (!res.ok) {
          setError('Error while fetching data!');
        } else {
          setData(users);
          setFilteredData(users);
          processStateData(users);
        }
      } catch (err) {
        setError('Network error!');
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const results = data.filter(user =>
      Object.values(user).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(results);
    processStateData(results);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const processStateData = (users) => {
    const stateCount = users.reduce((acc, user) => {
      acc[user.state] = (acc[user.state] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(stateCount).map(state => ({
      name: state,
      count: stateCount[state]
    }));
    setStateData(chartData);
  };

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className='flex h-[100vh] bg-zinc-200'>
      <div className="flex-1 h-[100vh] overflow-y-scroll overflow-x-hidden p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className='text-xl font-medium'>Customers</h1>
        </div>
        <div className="bg-white p-2 mb-4 rounded-md">
          <input type="text" placeholder="Search by name, phone, email, state, or city" className="w-full p-2 border border-gray-300 rounded bg-pink-100" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="w-full bg-white p-2 rounded-lg overflow-x-auto tables">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-2 py-3 text-start bg-pink-600 text-gray-50 font-medium rounded-tl-md">Firstname</th>
                <th className="px-2 py-3 text-start bg-pink-600 text-gray-50 font-medium">Lastname</th>
                <th className="px-2 py-3 text-start bg-pink-600 text-gray-50 font-medium">Phone</th>
                <th className="px-2 py-3 text-start bg-pink-600 text-gray-50 font-medium">Email</th>
                <th className="px-2 py-3 text-start bg-pink-600 text-gray-50 font-medium">State</th>
                <th className="px-2 py-3 text-start bg-pink-600 text-gray-50 font-medium">City</th>
                <th className="px-2 py-3 text-start bg-pink-600 text-gray-50 font-medium rounded-tr-md">Address</th>
              </tr>
            </thead>
            <tbody>
              <Suspense fallback={'Loading...'}>
                <CustomerlistContext.Provider value={paginatedData}>
                  <Customerlists data={paginatedData} />
                </CustomerlistContext.Provider>
              </Suspense>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button className="px-3 py-2 bg-[#db2777] text-white rounded" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          <span>Page {currentPage} of {Math.ceil(filteredData.length / pageSize)}</span>
          <button className="px-3 py-2 bg-[#db2777] text-white rounded" disabled={currentPage * pageSize >= filteredData.length} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Customer Distribution by State (Bar Chart)</h2>
            <BarChart width={400} height={300} data={stateData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#db2777" />
            </BarChart>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Customer Distribution by State (Pie Chart)</h2>
            <PieChart width={400} height={300}>
              <Pie data={stateData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                {stateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#db2777', '#FF5733', '#581845', '#4BC0C0'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
