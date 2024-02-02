import { useState } from "react";
import WEATHER_API_KEY from "./apikey.js";
export const WheaterApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = WEATHER_API_KEY;
  const difKelvin = 273.15;
  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);
  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };
  const fetchClima = async () => {
    try {
      // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error("Ocurrio un error", error);
    }
  };

  return (
    <div className="container p-4 col-md-4 text-center">
      <h1 className="text-3xl font-bold p-4">Aplicación de clima</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto ">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex-1 ">
            <input
              type="text"
              value={ciudad}
              onChange={handleCambioCiudad}
              placeholder="Ingresar ciudad"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              Buscar
            </button>
          </div>
        </div>
      </form>

      {/* <div className="grid justify-items-center"> */}
      {dataClima && (
        <div className="max-w-sm mx-auto mt-2">
          <div className="p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <img
                    className="mx-auto border bg-sky-400 border-gray-200 rounded-full"
                    src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
                  />
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex flex-row justify-between gap-2">
                    <div>
                      <h2 className="text-1xl">Lugar:</h2>
                    </div>
                    <div>
                      <h2 className="text-1xl">{dataClima.name}</h2>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex flex-row justify-between gap-2">
                    <div>
                      <h2 className="text-1xl">Temperatura:</h2>
                    </div>
                    <div>
                      <p className="text-1xl">
                        {parseInt(dataClima?.main?.temp - difKelvin)}°C
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex flex-row justify-between gap-2">
                    <div>
                      <h2 className="text-1xl">Condición meterológica:</h2>
                    </div>
                    <div>
                      <p className="text-1xl">
                        {dataClima.weather[0].description}
                      </p>
                    </div>
                  </div>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
//https://openweathermap.org/
