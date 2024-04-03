import React from "react";
import Image from "next/image";
import { imageIconIds } from "./imageIds";
export default function WeatherDetailsHeader(props) {
  const weather = props.weather;
  return (
    <div className="min-w-72 h-fit bg-base-700 mt-2 rounded-lg flex">
      {weather.map((data, index) => {
        if (index >= 5) {
          return;
        }
        return (
          <div
            key={index}
            className="flex-col justify-center m-1.5 items-center"
          >
            <div className="flex justify-center">
              {new Date(data.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </div>

            <Image
              src={imageIconIds[data.icon]}
              width={48}
              height={48}
              alt={data.icon}
            ></Image>

            <div className="flex justify-center">
              {Math.round(data.temp.day)} °C
            </div>
          </div>
        );
      })}
    </div>
  );
}
