import React from "react";
import Image from "next/image";
import { backgroundImageIds, imageIconIds } from "./imageIds";
export default function WeatherDetailsHeader(props) {
    const weather = props.weather;
    return (
        <div className="bg-base-600 p-2 rounded-lg">
              <div
                className={"min-w-72 min-h-min rounded-lg bg-cover"}
                style={{
                  backgroundImage: `url('${
                    backgroundImageIds[weather[0].icon]
                  }')`,
                }}
              >
                <div className="p-5">
                  <h1 className="heading-md">{weather[0].label}</h1>
                  <p className="text-xs">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-row space-x-12">
                  <div className="m-5 flex flex-col items-start">
                    <h1 className="heading-lg mt-24">
                      {Math.round(weather[0].temp.day)}°C
                    </h1>
                    <h2 className="heading-xs">
                      {Math.round(weather[0].maxTemp)}°C/
                      {Math.round(weather[0].minTemp)}°C
                    </h2>
                    <p className="text-sm">{weather[0].weather}</p>
                  </div>
                  <div className="m-5 flex flex-col mt-24">
                    <Image
                      src={imageIconIds[weather[0].icon]}
                      className="w-24 h-24"
                      width={96}
                      height={96}
                      alt="123"
                    />
                  </div>
                </div>
              </div>
            </div>
    );}