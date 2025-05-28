import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const TempAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/hr" : "m/s"}`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "Max Temp",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Min Temp",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div className="w-full">
      {/* Weather condition text */}
      <div className="flex items-center justify-center py-4 text-lg sm:text-xl text-cyan-300 text-center">
        <p>{details}</p>
      </div>

      {/* Main temperature display */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-6">
        <img
          src={icon}
          alt="Weather icon representing current condition"
          className="w-20"
        />
        <p className="text-4xl sm:text-5xl font-semibold">{`${temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-2 items-center sm:items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex items-center font-light text-sm sm:text-base"
            >
              <Icon size={18} className="mr-1" aria-label={title} />
              {title}: <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sunrise / Sunset / Min / Max */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-sm sm:text-base">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div
            key={id}
            className="flex items-center justify-center font-light"
          >
            <Icon size={18} className="mr-1" aria-label={title} />
            {title}: <span className="font-medium ml-1">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;
