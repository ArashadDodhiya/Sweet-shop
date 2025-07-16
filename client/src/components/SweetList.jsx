import React, { useContext, useState } from 'react';
import { SweetContext } from '../context/SweetContext';

const SweetList = () => {
  const {
    sweets,
    loading,
    error,
    deleteSweet,
    purchaseSweet,
    restockSweet
  } = useContext(SweetContext);

  const [purchaseQuantities, setPurchaseQuantities] = useState({});
  const [restockQuantities, setRestockQuantities] = useState({});

  const handlePurchase = async (id) => {
    const quantity = purchaseQuantities[id] || 1;
    await purchaseSweet(id, quantity);
    setPurchaseQuantities({ ...purchaseQuantities, [id]: '' });
  };

  const handleRestock = async (id) => {
    const quantity = restockQuantities[id] || 1;
    await restockSweet(id, quantity);
    setRestockQuantities({ ...restockQuantities, [id]: '' });
  };

  if (loading) return <div className="p-4 text-gray-600">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sweets.map((sweet) => (
              <tr key={sweet._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {sweet.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sweet.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${sweet.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sweet.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={purchaseQuantities[sweet._id] || ''}
                      onChange={(e) =>
                        setPurchaseQuantities({
                          ...purchaseQuantities,
                          [sweet._id]: parseInt(e.target.value) || ''
                        })
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder="Qty"
                    />
                    <button
                      onClick={() => handlePurchase(sweet._id)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Buy
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={restockQuantities[sweet._id] || ''}
                      onChange={(e) =>
                        setRestockQuantities({
                          ...restockQuantities,
                          [sweet._id]: parseInt(e.target.value) || ''
                        })
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder="Qty"
                    />
                    <button
                      onClick={() => handleRestock(sweet._id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Restock
                    </button>
                    <button
                      onClick={() => deleteSweet(sweet._id)}
                      className="px-3 py-1 border border-red-600 text-red-600 text-sm rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SweetList;