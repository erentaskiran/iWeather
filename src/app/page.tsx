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

interface Option {
  value: string;
  label: string;
  latitude: number;
  longitude: number;
}

interface Weather {
  label: string;
  weather: string;
  icon: string;
  temp: number;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
  cloud: number;
  maxTemp?: number;
  minTemp?: number;
  dt?: number;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [weather, setWeather] = useState<Weather[] | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [weatherCurrent, setWeatherCurrent] = useState<Weather | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const LoadingIndicator = () => <Spinner />;

  const getOption = async () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const response = (
          await axios.get("/api/geoApi?searchQuery=" + searchQuery)
        ).data.data;
        setOptions(
          response.data.map((city) => ({
            value: city.city,
            label: city.city + " " + city.countryCode,
            latitude: city.latitude,
            longitude: city.longitude,
          }))
        );
      } catch (error) {
        console.error(error);
        setOptions([]);
      }
    }, 1000);
  };

  const getWeatherData = async (lat, lon, label) => {
    setIsLoading(true);
    try {
      axios
        .get("/api/weatherApi?lat=" + lat + "&lon=" + lon)
        .then((response) => {
          setWeatherCurrent({
            label: label,
            weather: response.data.data.current.weather[0].main,
            icon: response.data.data.current.weather[0].icon,
            temp: response.data.data.current.temp,
            windSpeed: response.data.data.current.wind_speed,
            humidity: response.data.data.current.humidity,
            uvIndex: response.data.data.current.uvi,
            cloud: response.data.data.current.clouds,
          });
          setWeather(
            response.data.data.daily.map((data) => ({
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
    setSearchQuery(option ? option.label : "");
    if (option) {
      setIsSelected(true);
      getWeatherData(option.latitude, option.longitude, option.label);
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
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        try {
          axios
            .get("/api/geoApiCoordinates?lat=" + latitude + "&lon=" + longitude)
            .then((response) => {
              if (response.data.success == false) {
                alert("Api  rate limit exceeded. Please try again later.");
                setWeather(null);
                setShowDetails(false);
                return;
              }
              const label =
                response.data.data[0].city +
                " " +
                response.data.data[0].countryCode;
              getWeatherData(latitude, longitude, label);
            });
        } catch (error) {
          console.error(error);
          setWeather(null);
          setShowDetails(false);
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
              placeholder="Search location"
            />
            <IoLocation
              className="min-w-12 min-h-12"
              color="BFBFD4"
              onClick={handleLocation}
            />
          </div>
        )}

        {showDetails && (
          <div className="flex min-h-72 w-full flex-col justify-between rounded-lg bg-cover mt-32">
            <IoArrowBackOutline
              color="white"
              width={96}
              height={96}
              className="min-h-8 min-w-12"
              onClick={handleBackButtonClick}
            />
            <WeatherDetailHeader
              weather={weather}
              weatherCurrent={weatherCurrent}
            />
            <WeatherDetail weather={weather} weatherCurrent={weatherCurrent} />
            <WeatherDetailFooter weather={weather} />
          </div>
        )}
      </div>
    </div>
  );
}
