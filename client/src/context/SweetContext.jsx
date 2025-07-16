import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const SweetContext = createContext();

export const SweetProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get all sweets
  const getSweets = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/sweets');
      setSweets(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Server Error');
      setLoading(false);
    }
  };

  // Add new sweet
  const addSweet = async (sweetData) => {
    try {
      const res = await axios.post('/api/sweets', sweetData);
      setSweets([...sweets, res.data.data]);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to add sweet'
      };
    }
  };

  // Delete sweet
  const deleteSweet = async (id) => {
    try {
      await axios.delete(`/api/sweets/${id}`);
      setSweets(sweets.filter((sweet) => sweet._id !== id));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to delete sweet'
      };
    }
  };

  // Purchase sweet
  const purchaseSweet = async (id, quantity) => {
    try {
      const res = await axios.patch(`/api/sweets/${id}/purchase`, { quantity });
      setSweets(
        sweets.map((sweet) =>
          sweet._id === id ? res.data.data : sweet
        )
      );
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to purchase sweet'
      };
    }
  };

  // Restock sweet
  const restockSweet = async (id, quantity) => {
    try {
      const res = await axios.patch(`/api/sweets/${id}/restock`, { quantity });
      setSweets(
        sweets.map((sweet) =>
          sweet._id === id ? res.data.data : sweet
        )
      );
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to restock sweet'
      };
    }
  };

  // Search sweets
  const searchSweets = async (searchParams) => {
    try {
      setLoading(true);
      const query = new URLSearchParams(searchParams).toString();
      const res = await axios.get(`/api/sweets/search?${query}`);
      setSweets(res.data.data);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed');
      setLoading(false);
      return { success: false };
    }
  };

  useEffect(() => {
    getSweets();
  }, []);

  return (
    <SweetContext.Provider
      value={{
        sweets,
        loading,
        error,
        addSweet,
        deleteSweet,
        purchaseSweet,
        restockSweet,
        searchSweets,
        getSweets
      }}
    >
      {children}
    </SweetContext.Provider>
  );
};

export { SweetContext };
export default SweetProvider;