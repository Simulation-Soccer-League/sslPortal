import React, { useState, useEffect } from 'react';

const ApiComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if data is already cached in the state
    if (!data) {
      fetchData();
    }
  }, [data]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Render your data here */}
          {data && <p>{data}</p>}
        </div>
      )}
    </div>
  );
};
