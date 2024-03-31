"use client";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import axios from "axios";
import searchStyle from "./(components)/searchConfig";
import Image from "next/image";
import { IoLocation } from "react-icons/io5";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null);

  const weatherApi = "d0d4226e5271316e765f3deaed1eabcc";

  const geoApiOptions = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    headers: {
      "X-RapidAPI-Key": "5bdecb8602msh8098995f2ea99c8p1a52eajsn69059f229df6",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };
  const option = {
    ...geoApiOptions,
    params: {
      minPopulation: "100000",
      namePrefix: searchQuery,
      limit: "5",
    },
  };
  const getOption = async () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const response = (await axios(option)).data.data;
        setOptions(
          response.map((city) => ({
            value: city.city,
            label: city.city,
          }))
        );
      } catch (error) {
        console.error(error);
        setOptions([]);
      }
    }, 1000);
  };

  const getWeatherData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApi}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  };

  const handleChange = (option) => {
    setSelectedOption(option);
    setSearchQuery(option ? option.value : "");
    if (option) {
      getWeatherData(option.value);
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };

  const onInputChange = (inputValue) => {
    console.log(inputValue);
    setSearchQuery(inputValue);
    getOption();
  };

  const handleLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApi}&units=metric`
        )
        .then((response) => {
          setSelectedOption({
            value: response.data.name,
            label: response.data.name,
          });
          setWeather(response.data);
          setIsSelected(true);
        })
        .catch((error) => {
          console.error(error);
          setWeather(null);
        });
    });
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        className=""
        src="/logo.png"
        alt="logo"
        width={300}
        height={75}
        priority={true}
      />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-32 gap-4">
        <div className="space-y-2 text-center">
          <h1 className="heading-md">
            Welcome to <span className="text-base-blue"> TypeWeather</span>
          </h1>
          <p className="text-s text-base-200">
            Choose a location to see the weather forecast
          </p>
        </div>
        {isClient && (
          <div className="flex flex-row items-center justify-center">
            <Select
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              styles={searchStyle}
              defaultMenuIsOpen={!isClient}
              onInputChange={onInputChange}
              onChange={handleChange}
              options={options}
              value={selectedOption}
              placeholder="Ülke veya Şehir Girin..."
            />
            <IoLocation  className="min-w-12 min-h-12" color="BFBFD4" onClick={handleLocation}/>
          </div>
        )}

        {weather && isSelected && (
          <div>
            <h2>{weather.weather[0].description}</h2>
            <h3>{weather.weather[0].main}</h3>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
}
