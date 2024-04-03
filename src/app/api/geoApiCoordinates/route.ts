import axios from "axios";
import { NextRequest , NextResponse} from "next/server";
export async function GET(request: NextRequest) {
    const params = new URL(request.url).searchParams;
    const latitude = Number(params.get("lat"));
    const longitude = Number(params.get("lon"));
    const searchQuery = params.get("searchQuery") as string;
    const geoApiOptions = {
        method: "GET",
        url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        params: {
          minPopulation: "100000",
          namePrefix: searchQuery,
          limit: "5",
          location: `${latitude > 0 ? "+" : ""}${latitude.toFixed(4)}${
            longitude > 0 ? "+" : ""
          }${longitude.toFixed(4)}`,
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.RAPID_API_HOST ,
        },
      };
      
      try {
        const response = await axios(geoApiOptions);
        return NextResponse.json({ success: true, data: response.data.data });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Bir hata oluştu." });
      }
    
}