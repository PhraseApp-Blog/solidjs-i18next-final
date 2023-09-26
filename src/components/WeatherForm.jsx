import { useTransContext } from "@mbarzda/solid-i18next";
import { createSignal } from "solid-js";

const mockWeatherData = [
  {
    city: "San Francisco",
    country: "USA",
    temperatureCelcius: 18,
    temperatureFahrenheit: 64.4,
    feelsLike: 15,
    humidity: 0.7,
    date: new Date(),
    weatherStations: 11,
  },
  {
    city: "Paris",
    country: "France",
    temperatureCelcius: 5,
    temperatureFahrenheit: 41,
    feelsLike: 3,
    humidity: 0.8,
    date: new Date(),
    weatherStations: 10,
  },
  {
    city: "Berlin",
    country: "Germany",
    temperatureCelcius: 31,
    temperatureFahrenheit: 87.8,
    feelsLike: 33.5,
    humidity: 0.9,
    date: new Date(),
    weatherStations: 7,
  },
  {
    city: "London",
    country: "England",
    temperatureCelcius: 0,
    temperatureFahrenheit: 32,
    feelsLike: 0,
    humidity: 1.0,
    date: new Date(),
    weatherStations: 25,
  },
  {
    city: "Munich",
    country: "Germany",
    temperatureCelcius: 5,
    temperatureFahrenheit: 41,
    feelsLike: 3,
    humidity: 0.8,
    date: new Date(),
    weatherStations: 1,
  },
];

const WeatherForm = () => {
  const [city, setCity] = createSignal("");
  const [weatherData, setWeatherData] = createSignal(null);

  const [t] = useTransContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    const cityWeather = mockWeatherData.find(
      (weather) => weather.city.toLowerCase() === city().toLowerCase()
    );

    if (cityWeather) {
      setWeatherData(cityWeather);
    } else {
      setWeatherData({
        error: `${t("error_message", {
          city: city(),
        })}`,
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="my-5 flex items-center space-x-3"
      >
        <input
          type="text"
          placeholder={t("city_input_placeholder")}
          value={city()}
          onInput={(event) => setCity(event.target.value)}
          className="p-2 rounded border-2 border-blue-400 focus:border-blue-600 outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 font-bold text-white rounded hover:bg-blue-600 transition-colors"
        >
          {t("get_weather_button_label")}
        </button>
      </form>

      {weatherData() && !weatherData().error && (
        <div className="flex flex-row p-10 space-x-12 items-center">
          <h2 className="text-xl font-semibold">
            📍 {weatherData().city}, {weatherData().country}
          </h2>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">
              {t("temperature_celcius", {
                val: weatherData().temperatureCelcius,
                formatParams: { val: { style: "unit", unit: "celsius" } },
              })}
              <br />
              {t("temperature_fahrenheit", {
                val: weatherData().temperatureFahrenheit,
                formatParams: { val: { style: "unit", unit: "fahrenheit" } },
              })}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">
              {t("feels_like", {
                val: weatherData().feelsLike,
                formatParams: { val: { style: "unit", unit: "celsius" } },
              })}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p>{t("humidity")}</p>
            <p className="text-xl font-semibold">
              {t("humidity_number", {
                val: weatherData().humidity,
                formatParams: { val: { style: "percent" } },
              })}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p>{t("date_label")}</p>
            <p className="text-xl font-semibold">
              {t("data_recorded_on_date", {
                val: weatherData().date,
                formatParams: {
                  val: {
                    year: "2-digit",
                    month: "short",
                    day: "numeric",
                  },
                },
              })}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p>{t("weather_stations_label")}</p>
            <p className="text-xl font-semibold">
              {t("station", { count: weatherData().weatherStations })}
            </p>
          </div>
        </div>
      )}
      {weatherData() && weatherData().error && (
        <div>
          <p className="text-red-500">{weatherData().error}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForm;
