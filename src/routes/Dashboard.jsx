import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import TimeAndLocation from "../components/TimeAndLocation";
import TempAndDetails from "../components/TempAndDetails";
import Forecast from "../components/Forecast";
import Inputs from "../components/Inputs";
import getFormattedWeatherData from "../services/weatherServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function capitalize(string) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}

const Dashboard = () => {
  // Auth state
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  // Weather state
  const [query, setQuery] = useState({ q: "Palmaner" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalize(cityName)}`);
    setLoading(true);

    try {
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Weather data fetched for ${data.name}, ${data.country}`);
      setWeather(data);
    } catch (error) {
      console.error("Error getting weather:", error);
      toast.error("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 30 : 86;
    return weather.temp <= threshold
      ? "from-cyan-600 to-blue-700"
      : "from-yellow-600 to-orange-700";
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-4 px-4 py-5">
      {/* Auth Section */}
      <div className="mb-6 p-4 border rounded-md shadow-sm bg-white">
        <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
        {session?.user?.email ? (
          <>
            <h2 className="text-lg mb-4">Welcome, {session.user.email}</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <button
              onClick={handleSignOut}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Sign out
            </button>
          </>
        ) : (
          <p>Please log in to access the dashboard.</p>
        )}
      </div>

      {/* Weather Section */}
      <div
        className={`py-5 px-4 bg-gradient-to-br shadow-xl shadow-gray-400 rounded-xl text-white ${formatBackground()}`}
      >
        <Inputs setQuery={setQuery} setUnits={setUnits} />

        {loading && (
          <div className="text-center font-semibold mt-10">
            Loading weather data...
          </div>
        )}

        {!loading && weather && (
          <>
            <TimeAndLocation weather={weather} />
            <TempAndDetails weather={weather} units={units} />
            <Forecast title="3 hours step Forecast" data={weather.hourly} />
            <Forecast title="Daily Forecast" data={weather.daily} />
          </>
        )}
      </div>

      <ToastContainer autoClose={2500} hideProgressBar theme="colored" />
    </div>
  );
};

export default Dashboard;
