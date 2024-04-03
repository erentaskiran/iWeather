"use client";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import axios from "axios";
import searchStyle from "./(components)/searchConfig";
import Image from "next/image";
import { IoLocation, IoArrowBackOutline } from "react-icons/io5";
import Spinner from "./(components)/spinner";
import WeatherDetail from "./(components)/weatherDetail";
import WeatherDetailHeader from "./(components)/weatherDetailsHeader";
import WeatherDetailFooter from "./(components)/weatherDetailFooter";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const weatherApi:string=process.env.OPEN_WEATHER_API;
  const geoApi:string=process.env.RAPID_API_KEY;
  const geoHost:string=process.env.RAPID_API_HOST;

  const timeoutRef = useRef(null);
  const LoadingIndicator = () => <Spinner />;

  const geoApiOptions = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    params: {
      minPopulation: "100000",
      namePrefix: searchQuery,
      limit: "5",
    },
    headers: {
      "X-RapidAPI-Key": geoApi,
      "X-RapidAPI-Host": geoHost ,
    },
  };

  const weatherApiOptions = (lat, lon) => {
    return {
      url: "https://api.openweathermap.org/data/3.0/onecall",
      params: {
        units: "metric",
        lat: lat,
        exclude: "daily",
        lon: lon,
        appid: weatherApi,
        dt: Math.floor(Date.now() / 1000),
      },
    };
  };

  const getOption = async () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const response = (await axios(geoApiOptions)).data.data;
        setOptions(
          response.map((city) => ({
            value: city.city,
            label: city.city,
            latitude: city.latitude,
            longitude: city.longitude,
          }))
        );
        if (response.length <= 2 && isSelected) {
          getWeatherData(
            response[0].latitude,
            response[0].longitude,
            response[0].city
          );
        }
      } catch (error) {
        console.error(error);
        setOptions([]);
      }
    }, 1000);
  };

  const getWeatherData = async (lat, lon, label) => {
    setIsLoading(true);
    try {
      axios(weatherApiOptions(lat, lon)).then((response) => {
        setWeather(
          response.data.daily.map((data) => ({
            label: label,
            weather: data.weather[0].main,
            icon: data.weather[0].icon,
            cloud: data.clouds,
            maxTemp: data.temp.max,
            minTemp: data.temp.min,
            temp: data.temp,
            windSpeed: data.wind_speed,
            humidity: data.humidity,
            uvIndex: data.uvi,
            dt: data.dt,
          }))
          
        );
      });
    } catch (error) {
      console.error(error);
      setWeather(null);
      setShowDetails(false);
    }
  };

  const handleChange = (option) => {
    setSelectedOption(option);
    setSearchQuery(option ? option.value : "");
    if (option) {
      setIsSelected(true);
      getWeatherData(option.latitude, option.longitude, option.value);
    } else {
      setIsSelected(false);
    }
  };

  const onInputChange = (inputValue) => {
    setSearchQuery(inputValue);
    setIsSelected(false);
    getOption();
  };

  const handleLocation = async () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const geoApiOption = {
        ...geoApiOptions,
        params: {
          location: `${latitude > 0 ? "+" : ""}${latitude.toFixed(4)}${
            longitude > 0 ? "+" : ""
          }${longitude.toFixed(4)}`,
        },
      };
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        try {
          const response = await axios(geoApiOption);
          const label = response.data.data[0].city;
          getWeatherData(latitude, longitude, label);
        } catch (error) {
          console.error(error);
        }
      }, 1000);
    });
  };

  const handleBackButtonClick = () => {
    setShowDetails(false);
    setSelectedOption(null);
    setIsSelected(false);
    setSearchQuery("");
  };

  useEffect(() => {
    setIsClient(true);
    if (options.length === 0 || isSelected) {
      getOption();
      setSearchQuery("");
    }
    if (weather) {
      setShowDetails(true);
      setIsLoading(false);
    }
  }, [weather]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {!showDetails && (
        <Image
          className=""
          src="/logo.png"
          alt="logo"
          width={300}
          height={125}
          priority={true}
        />
      )}
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-32 gap-4">
        {!showDetails && (
          <div className="space-y-2 text-center">
            <h1 className="heading-md">
              Welcome to <span className="text-base-blue"> TypeWeather</span>
            </h1>
            <p className="text-s text-base-200">
              Choose a location to see the weather forecast
            </p>
          </div>
        )}
        {isClient && !showDetails && (
          <div className="flex flex-row items-center justify-center ">
            <Select
              className="w-72"
              styles={searchStyle}
              defaultMenuIsOpen={!isClient}
              onInputChange={onInputChange}
              onChange={handleChange}
              options={options}
              value={selectedOption}
              isLoading={isLoading}
              isDisabled={isLoading}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
                LoadingIndicator,
              }}
              placeholder="Ülke veya Şehir Girin..."
            />
            <IoLocation
              className="min-w-12 min-h-12"
              color="BFBFD4"
              onClick={handleLocation}
            />
          </div>
        )}

        {showDetails && (
          <div className="flex min-h-72 w-full flex-col justify-between rounded-lg bg-cover">
            <IoArrowBackOutline
              color="white"
              width={96}
              height={96}
              className="min-h-8 min-w-12"
              onClick={handleBackButtonClick}
            />
            <WeatherDetailHeader />
            <WeatherDetail weather={weather} />
            <WeatherDetailFooter weather={weather} />
            
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
}
