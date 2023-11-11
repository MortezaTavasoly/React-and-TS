import "./App.css";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar/Appbar";
import Slidbar from "./components/Slidbar/Slidbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Todos from "./components/Todos/Todos";
import Profile from "./components/Profile/Profile";
import Weather from "./components/Weather/Weather";
import Popup from "./components/Popup/Popup";
import { ThemeContext, ThemeState } from "./context/ThemeContext";

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


function App(): JSX.Element {
  const [showPopup, setSowPopup] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [mode, setMode] = useState<string>(getThemeValues);
  const [language, setLanguage] = useState<string>(getLanguageValues);
  const themeValues: ThemeState = useContext(ThemeContext);

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
