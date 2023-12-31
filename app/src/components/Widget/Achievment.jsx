import React, { useState, useEffect } from "react";

function Achievement({ url }) {
  const [data, setData] = useState(null);


  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className={`widgetCard relative md:flex col-span-3 px-6 py-4 text-center flex-col justify-between ${data ? data[0].Team.replace(/[ .]/g, "") : 'NONE'} text-slate-50`} >
      <div className="font-semibold text-slate-800 bg-white max-w-fit mx-auto pt-5 pb-2 px-6 absolute -top-3 rounded-lg left-1/2 -translate-x-1/2 whitespace-nowrap">
        {data ? <pre>{data[0].Name}</pre> : 'Loading...'}
      </div>
      <div className="font-semibold m-auto pt-4">
        <span className="text-xl">{data ? `${data[0].TPE}` : 'Loading...'}</span> TPE
      </div>
      <p className="text-sm font-semibold">Class: {data ? `${data[0].Class}` : 'Loading...'}</p>
      <p className="text-xs">Created on: {data ? `${data[0].Created}` : 'Loading...'}</p>
    </div >
  );
}

export default Achievement;
