import React, { useContext } from 'react'
import { CustomerlistContext } from '../../pages/dashboard_pages/Customers';

export default function Customerlists() {
      const data = useContext(CustomerlistContext);
    
      return (
        <>
            {
                data.length > 0 && data.map((data) => {
                    return (
                        <tr key={data._id}>
                            <td class="px-2 lg:py-3 py-2 border border-gray-200 text-sm text-start text-gray-700 font-medium">{data.firstname}</td>
                            <td class="px-2 lg:py-3 py-2 border border-gray-200 text-sm text-start text-gray-700 font-medium">{data.lastname}</td>
                            <td class="px-2 lg:py-3 py-2 border border-gray-200 text-sm text-start text-gray-700 font-medium">{data.phone}</td>
                            <td class="px-2 lg:py-3 py-2 border border-gray-200 text-sm text-start text-gray-700 font-medium">{data.email}</td>
                            <td class="px-2 lg:py-3 py-2 border border-gray-200 text-sm text-start text-gray-700 font-medium">{data.state}</td>
                            <td class="px-2 lg:py-3 py-2 border border-gray-200 text-sm text-start text-gray-700 font-medium">{data.city}</td>
                            <td class="px-2 lg:py-3 py-2 border border-gray-200 text-sm text-start text-gray-700 font-medium">{data.address}</td>
                        </tr>
                    )
                })
            }
        </>
  )
}
