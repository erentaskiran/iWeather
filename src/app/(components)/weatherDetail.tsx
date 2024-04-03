import Image from "next/image";
import React from "react";

export default function WeatherDetail(...prop) {
  const weather = prop[0].weather;
  if (!weather) return null;
  return (
    <div className="min-w-72 h-fit bg-base-700 mt-2 rounded-lg ">
      <div className="m-5 flex justify-between">
        <div className="flex space-x-1 items-center">
          <Image
            src={"/phosphorIcons/thermometer-simple-light.svg"}
            width={24}
            height={24}
            alt="thermometer-simple-light"
          />
          <p>Thermal sensation</p>
        </div>
        <span className="text-md">{Math.floor(weather[0].temp.day)}°C</span>
      </div>

      <div className="flex justify-center">
        <hr className="custom-hr"  />
      </div>

      <div className="m-5 flex justify-between">
        <div className="flex space-x-1 items-center">
          <Image
            src={"/phosphorIcons/cloudy-rain-light.svg"}
            width={24}
            height={24}
            alt="cloudy-rain-light"
          />
          <p>Probability of rain</p>
        </div>
        <span className="text-md"> {weather[0].cloud / 100}%</span>
      </div>
      <div className="flex justify-center">
        <hr className="custom-hr" />
      </div>

      <div className="m-5 flex justify-between">
        <div className="flex space-x-1 items-center">
          <Image
            src={"/phosphorIcons/wind-light.svg"}
            width={24}
            height={24}
            alt="wind-light"
          />
          <p>Wind speed</p>
        </div>
        <span className="text-md"> {weather[0].windSpeed} km/h</span>
      </div>
      <div className="flex justify-center">
        <hr className="custom-hr" />
      </div>

      <div className="m-5 flex justify-between">
        <div className="flex space-x-1 items-center">
          <Image
            src={"/phosphorIcons/drop-light.svg"}
            width={24}
            height={24}
            alt="drop-light"
          />
          <p>Air humidity</p>
        </div>
        <span className="text-md"> {weather[0].humidity}%</span>
      </div>
      <div className="flex justify-center">
        <hr className="custom-hr" />
      </div>

      <div className="m-5 flex justify-between">
        <div className="flex space-x-1 items-center">
          <Image
            src={"/phosphorIcons/sun-dim-light.svg"}
            width={24}
            height={24}
            alt="sun-dim-light"
          />
          <p>UV Index</p>
        </div>
        <span className="text-md"> {weather[0].uvIndex}</span>
      </div>
    </div>
  );
}
