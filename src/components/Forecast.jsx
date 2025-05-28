import React from 'react';

const Forecast = ({ title, data }) => {
  return (
    <div className="w-full">
      <div className="flex mt-6">
        <p className="font-medium uppercase text-lg">{title}</p>
      </div>
      <hr className="my-2 border-gray-300" />

      {/* Responsive forecast cards */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between mt-4">
        {data.map((d, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-24 sm:w-28"
          >
            <p className="font-light text-sm text-center">{d.title}</p>
            <img src={d.icon} alt="weather icon" className="w-12 my-1" />
            <p className="font-medium text-lg">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
