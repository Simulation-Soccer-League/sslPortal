import React, { useState, useEffect } from "react";

function Achievement() {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/getPlayer?username=Canadice`;

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, [url]);

  return (
    <div className={`widgetCard relative hidden md:flex col-span-2 px-6 py-4 text-center flex-col justify-between ${data[0].Team.replace(/[ .]/g, "")} text-slate-50`} >
      <div className="font-semibold text-slate-800 bg-white max-w-fit mx-auto pt-5 pb-2 px-6 absolute -top-3 rounded-lg left-1/2 -translate-x-1/2 whitespace-nowrap">
        {data ? <pre>{data[0].Name}</pre> : 'Loading...'}
      </div>
      <div className="font-semibold m-auto pt-4">
        <span className="text-lg lg:text-[80px]">{data ? <pre>{data[0].TPE}</pre> : 'Loading...'}</span>
        <span className="text-[14px]">TPE</span>
      </div>
      <p className="text-sm font-semibold">IDR 1.800 M Year to Date</p>
      <p className="text-xs">21 Mei 23 to GS 2023</p>
    </div >
  );
}

export default Achievement;
