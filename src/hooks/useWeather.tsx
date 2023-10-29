import { useEffect, useState } from "react";

// این قسمت تعیین کننده ی این است که مقداری که به عنوان پرامیس داده ی اب و هوا برمیگردد شامل چیست
export type WeatherData = {
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  name: string;
};

// این قسمت تعیین کننده ی این است که پرامیس داده های موقعیت مکانی شامل چیست
export type LocData = {
  country: string;
  city: string;
  lat: number;
  lon: number;
  timezone: string;
};

export default function useWeather(url: string, city: string = "") {
  // مقدار داده در جواب درخواست در اینجا ذخیره میشود
  const [data, setData] = useState<WeatherData>();
  // اگر اروری باشد در ان قسمت وارد میشود
  const [error, setError] = useState<boolean | string>(false);
  // این قسمت برای زمانی است که درخواست زده شده و پاسخ هنوز نیامده و در این حین لودینگ مایش داده میشود
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // این قسمت نام شهر موقعیت کاربر را نمایش میدهد
  const [loc, setLoc] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    const getLoc = async () => {
      try {
        const req = await fetch(url);
        if (req.status === 200) {
          const json = (await req.json()) as LocData;
          setLoc(json.city);
          setError(false);
          setIsLoading(false);
          return json;
        } else {
          throw new Error("Your Location is Unknown!");
        }
      } catch (err: any) {
        setError(err.massege);
      }
    };

    const getWeather = async (city: string | undefined) => {
      const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=694a16ace6caa2c6d2756d2e2fcb8bf5`;
      setIsLoading(true);
      try {
        const response = await fetch(weatherApi);
        if (response.status === 200) {
          const data = (await response.json()) as WeatherData;
          setData(data);
          setIsLoading(false);
          setError(false);
        } else {
          setIsLoading(false);
          throw new Error("Location Not Found!");
        }
      } catch (err: any) {
        setError(err);
      }
    };

    if (city === "") {
      getLoc().then((e?: LocData) => {
        getWeather(e?.city);
      });
    } else if (city !== "") {
      getWeather(city);
    }
  }, [url, city]);

  return { data, error, isLoading, loc };
}
