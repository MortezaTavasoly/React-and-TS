import "./appbar.css";

import { NavLink } from "react-router-dom";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { ThemeContext, ThemeState } from "../../context/ThemeContext";
import { useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import RecyclingIcon from "@mui/icons-material/Recycling";

type AppbarProps = {
  mode: string;
};

export default function Appbar(props: AppbarProps): JSX.Element {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { t } = useTranslation();

  const themeValues: ThemeState = useContext(ThemeContext);


  const handleRestoreSetting = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  return (
    <div className="appbar">
      <RecyclingIcon
        className="restore-default-setting"
        onClick={handleRestoreSetting}
        titleAccess="Restore Default"
      />
      <MenuIcon className="menu-icon" onClick={handleMenu} />
      {showMenu && (
        <div
          className={props.mode === "light" ? "menu" : "menu dark"}
          style={
            props.mode === "dark"
              ? { backgroundColor: themeValues.dark.contentBackground }
              : { backgroundColor: themeValues.light.contentBackground }
          }
        >
          <CloseIcon className="close" onClick={handleMenu} />
          <NavLink to="/">{t("dashboard")}</NavLink>
          <NavLink to="/todos">{t("todos")}</NavLink>
          <NavLink to="/weather">{t("weather")}</NavLink>
          <NavLink to="/profile">{t("profile")}</NavLink>
        </div>
      )}
      <h1 className="title">LOGO</h1>
    </div>
  );
}
