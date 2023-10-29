import "./slidbar.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Slidbar(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="links">
      <NavLink to="/">{t("dashboard")}</NavLink>
      <NavLink to="/todos">{t("todos")}</NavLink>
      <NavLink to="/weather">{t("weather")}</NavLink>
      <NavLink to="/profile">{t("profile")}</NavLink>
    </div>
  );
}
