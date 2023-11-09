import { useEffect, useState } from "react";
import "./profile.css";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";

export type ProfileProps = {
  name: string;
  setName: any;
  mode: string;
  setMode: any;
  language: string;
  setLanguage: any;
  setSowPopup: any;
};

export default function Profile(props: ProfileProps): JSX.Element {
  const [locale, setLocale] = useState(i18n.language);
  const { t } = useTranslation();

  i18n.on("languageChanged", () => setLocale(i18n.language));
  useEffect(() => {
    localStorage.setItem("theme", props.mode);
    localStorage.setItem("language", props.language);
  }, [props.mode, props.language]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };


  const handleName = (e: any) => {
    if (e.target.parentElement.firstElementChild.value.trim() !== "") {
      props.setName(e.target.parentElement.firstElementChild.value);
      localStorage.setItem(
        "name",
        e.target.parentElement.firstElementChild.value
      );
      e.target.parentElement.firstElementChild.value = "";
    } else {
      alert("Please enter your new name!");
    }
  };

  const handleLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
    props.setLanguage(e.target.value);
  };

  const handleSave = () => {
    alert("Your data saved!");
  };

  const handleTheme = (mode: string) => {
    props.setMode(mode);
  };

  return (
    <div className="profile" data-testid="profile">
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          {t("name")}
          <div className="add-input">
            <input
              data-testid="name-edit-input"
              type="text"
              placeholder={props.name}
              className="name-edit-input"
            />
            <button
              onClick={handleName}
              className="edit-name"
              data-testid="name-edit-btn"
            >
              <EditIcon />
            </button>
          </div>
        </label>

        <label>
          {t("theme")}
          <select
            id="mods"
            onChange={(e) => {
              handleTheme(e.target.value);
            }}
            defaultValue={props.mode}
            data-testid="mode"
          >
            <option value="light">{t("light")}</option>
            <option value="dark">{t("dark")}</option>
          </select>
        </label>

        <label>
          {t("locale")}
          <select
            id="language"
            onChange={handleLanguage}
            defaultValue={props.language}
            data-testid="locale"
          >
            <option value="en">{t("english")}</option>
            <option value="fa">{t("farsi")}</option>
          </select>
        </label>

        <button className="save-btn" onClick={handleSave}>
          {t("save")}
        </button>
      </form>
    </div>
  );
}
