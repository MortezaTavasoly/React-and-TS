import "./App.css";
// در این قسمت هوک های درونی ریکت وارد شده

import { useContext, useEffect, useState } from "react";

// در این قسمت موارد لازم از ری اکت روتر وارد شده

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// کامپوننت تیتر که در خود قسمت بازیابی تنظیمات پیشفرض را دارد و لوکال استورج را پاک و صفحه را ریفرش میکند
// در صورت کم شدن عرض تصویر منوی کشوی را نشان میدهد
// قسمت لوگوی سایت

import Appbar from "./components/Appbar/Appbar";

// قسمت اسلاید بار که برای جابجایی بین روت هاست در اینجا وارد شده
// هنگامی ک عرض صفحه کم شود این قسمت با منوی کشویی جایگزین میشود

import Slidbar from "./components/Slidbar/Slidbar";

// قسمت داشبورد که ساعت را به همراه سه پیام مختلف که بسته به ساعت ورود نشان میدهد
// هنگام صبح و ظهر و شب پیام های متفاوت است

import Dashboard from "./components/Dashboard/Dashboard";

// قسمت لیست کار ها که میتوان در آن یک کار را ذخیره کرد و به آن کار تیک انجام شده زد و یا آن را حذف کرد

import Todos from "./components/Todos/Todos";

// قسمت پروفایل که در آن میتوان نام را تغییر داد و همچنین تم و زبان نیز از این قسمت تغییر میکنند

import Profile from "./components/Profile/Profile";

// قسمت آب و هوا که قابلت این را دارد که موقعیت جغرافیایی را به صورت خودکار دریافت کند و دما و حالت هوا را نشان دهد
// همچنین قابلیت جست و جو مکان های دیگر به دو زبان فارسی و انگلیسی را دارد

import Weather from "./components/Weather/Weather";

//این قسمت فقط هنگامی نمایش داده میشود ک ما نام خود را وارد نکرده باشیم و فقط نام را دریافت و در لوکال استورج ذخیره میکند

import Popup from "./components/Popup/Popup";

// این قسمت داده های گلوبال ما را وارد این کامپوننت میکند

import { ThemeContext, ThemeState } from "./context/ThemeContext";

// این فانکشن هنگام اجرا فعال میشود و مقدار ریترن شده ی آن در استیت ها ذخیره میشوند برای زمانی که صفحه ریفرش میشود
// در صورتی ک در لوکال استورج مقداری داشته باشد آن مقدار باز گردانده میشود
const getThemeValues = () => {
  const storedValues = localStorage.getItem("theme");
  if (!storedValues) {
    return "light";
  }
  return storedValues;
};
const getLanguageValues = () => {
  const storedValues = localStorage.getItem("language");
  if (!storedValues) {
    return "english";
  }
  return storedValues;
};
// پایان فانکشن های لوکال استورج

//
// کامپوننت اپلیکیشن
//

function App(): JSX.Element {
  // این مقدار باعث نمایش داده شدن پاپ آپ اول میشود
  const [showPopup, setSowPopup] = useState<boolean>(true);
  //نام در این قسمت ذخیره میشود
  const [name, setName] = useState<string>("");
  // حالت شب و روز در این قسمت ذخیره میشود
  const [mode, setMode] = useState<string>(getThemeValues);
  // زبان صفحه در این قسمت ذخیره میشود
  const [language, setLanguage] = useState<string>(getLanguageValues);
  // این قسمت کانتکست ماست ک با آن داده های گلوبال را دریافت میکنیم
  const themeValues: ThemeState = useContext(ThemeContext);

  //این قسمت باعث میشود ک هرگاه ما نامی نداشته باشیم قسمت پاپ اپ نمایش داده بشود تا نام خود را وارد کنیم
  useEffect(() => {
    if (localStorage.getItem("name") !== null) {
      setName(localStorage.getItem("name") as string);
      setSowPopup(false);
    }
    if (localStorage.getItem("theme") !== null) {
      setMode(localStorage.getItem("theme") as string);
    }
    if (localStorage.getItem("language") !== null) {
      setLanguage(localStorage.getItem("language") as string);
    }
  }, []);
  // پایان قسمت استعلام وجود نام

  // این قسمت همواره باعث میشود ک رنگ پس زمینه و تکست تغییر کنند
  if (mode === "light") {
    document.body.style.backgroundColor = themeValues.light.mainBackground;
    document.body.style.color = themeValues.light.text;
  } else {
    document.body.style.backgroundColor = themeValues.dark.mainBackground;
    document.body.style.color = themeValues.dark.text;
  }

  return (
    <div className="my-app">
      <Router>
        {showPopup && (
          <Popup name={name} setName={setName} setShowPopup={setSowPopup} />
        )}
        <div className="appbar-container" data-testid="appbar">
          <Appbar mode={mode} />
        </div>

        <div className="slidbar-content" data-testid="slidbar-and-content">
          <div
            data-testid="slidbar"
            className={
              mode === "light" ? "slidbar-container" : "slidbar-container dark"
            }
            style={
              mode === "dark"
                ? { backgroundColor: themeValues.dark.contentBackground }
                : { backgroundColor: themeValues.light.contentBackground }
            }
          >
            <Slidbar />
          </div>
          <div
            data-testid="content"
            className={mode === "light" ? "content" : "content dark"}
            style={
              mode === "dark"
                ? { backgroundColor: themeValues.dark.contentBackground }
                : { backgroundColor: themeValues.light.contentBackground }
            }
          >
            <Routes>
              <Route path="/" element={<Dashboard name={name} />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/weather" element={<Weather />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    name={name}
                    setName={setName}
                    mode={mode}
                    setMode={setMode}
                    setLanguage={setLanguage}
                    language={language}
                    setSowPopup={setSowPopup}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
