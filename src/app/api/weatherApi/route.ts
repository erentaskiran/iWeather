import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = new URL(request.url).searchParams;
    const lat = params.get("lat") as string;
    const lon = params.get("lon") as string;
  const weatherApiOptions = (lat, lon) => {
    return {
      url: "https://api.openweathermap.org/data/3.0/onecall",
      params: {
        units: "metric",
        lat: lat,
        exclude: "daily",
        lon: lon,
        appid: process.env.OPEN_WEATHER_API,
        dt: Math.floor(Date.now() / 1000),
      },
    };
  };
  const response = await axios(weatherApiOptions(lat, lon));
  if (response.status !== 200) {
    return NextResponse.json({ success: false, error: "Bir hata oluştu." });
  }
  return NextResponse.json({ success: true, data: response.data });
}
