import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import Weather from "../components/Weather";
import Spinner from "../components/Spinner";

export default function Home() {
  // Cliente HTTP baseado em promessa para navegador e node.js axios
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
    setCity("");
    setLoading(false);
  };

  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <div>
        <Head>
          <title>Weather - Next</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[1]"></div>
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
          layout="fill"
          alt=""
          className="object-cover"
        ></Image>
        {/* Search */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4  text-white z-10">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none text-2xl placeholder:"
                type="text"
                placeholder="Search city"
              ></input>
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={20}></BsSearch>
            </button>
          </form>
        </div>

        {/* Weather */}
        {weather.main && <Weather data={weather} />}
      </div>
    );
  }
}
