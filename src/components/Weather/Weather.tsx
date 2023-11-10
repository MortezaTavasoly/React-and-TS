import "./weather.css";
import useWeather from "../../hooks/useWeather";
import { useState } from "react";
import { WeatherData } from "../../hooks/useWeather";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";

export default function Weather(): JSX.Element {
  const [serachValue, setSearchValue] = useState("");
  const { t } = useTranslation();

  const { data, isLoading, error } = useWeather(
    "http://ip-api.com/json/?fields=country,city,lat,lon,timezone",
    serachValue
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchValue(e.target.firstElementChild.value);
  };
  const defaultData: WeatherData | undefined = data;

  return (
    <div className="weather" data-testid="weather">
      <form id="form" onSubmit={handleSubmit} data-testid="search-form">
        <input
          type="search"
          placeholder={`${t("searchCity")}`}
          className="search"
          data-testid="search"
        />
        <button className="search-btn">
          <SearchIcon />
        </button>
      </form>
      {isLoading && <h2 className="loading">{t("loading")}</h2>}
      {error && <h2 className="error">{t("error")}</h2>}
      {defaultData && (
        <div className="weather-container" data-testid="weather-container">
          <h2 className="location">{data && data.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            alt=""
          />

          <h2 className="temp">
            {data && Math.round(data.main.temp - 273.15) + " °C"}
          </h2>
          <h2 className="detail">{data?.weather[0].main}</h2>
        </div>
      )}
    </div>
  );
}
