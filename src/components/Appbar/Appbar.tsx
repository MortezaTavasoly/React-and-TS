import "./appbar.css";

import { NavLink } from "react-router-dom";
import { useState } from "react";

// با استفاده از این هوک ما مقادیر تعریف شده ی زبان ها را دریافت میکنیم که در فایل های جیسون مقادیر تعریف شده اند
import { useTranslation } from "react-i18next";
import { ThemeContext, ThemeState } from "../../context/ThemeContext";
import { useContext } from "react";

// در این قسمت آیکون های لازم وارد شده اند
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import RecyclingIcon from "@mui/icons-material/Recycling";

// این تایپ تعیین کننده ی این است که مقادیر پراپس شامل چه چیز هایی میشود
type AppbarProps = {
  mode: string;
};

export default function Appbar(props: AppbarProps): JSX.Element {
  // این قسمت برای زمانیست که عرض تصویر کم است و منو به صورا کشویی نمایش داده میشود
  const [showMenu, setShowMenu] = useState<boolean>(false);
  // برای قرار دادن مقادر تعریف شده در هر زبان از این قسمت استفاده میشود
  const { t } = useTranslation();

  const themeValues: ThemeState = useContext(ThemeContext);

  //این فانکشن تمام داده هایی ک در لوکال استورج ذخیره شده اند را حذف و صفحه را ریفرش میکند

  const handleRestoreSetting = () => {
    localStorage.clear();
    window.location.reload();
  };

  // این فانکشن وضیفه ی نمایش داده شدن یا نشدن منوی کشویی را دارد
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
