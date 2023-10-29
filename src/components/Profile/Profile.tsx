import { useEffect, useState } from "react";
import "./profile.css";
// این قسمت برای دریافت زبان ها وارد شده است
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// آیکون مربوط به ادیت نام
import EditIcon from "@mui/icons-material/Edit";

// این قسمت تعیین کننده مقادیری است که قرار است به این کامپوننت داده بشود
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
  // مقدار پیشفرض زبان در این قسمت ذخیره میشود
  const [locale, setLocale] = useState(i18n.language);
  const { t } = useTranslation();

  //در این قسمت یک ایونت برای زمانی ک زبان عوض شود تعریف شده است که مقدار استیت زبان را تغییر میدهد
  i18n.on("languageChanged", () => setLocale(i18n.language));
  // این قسمت با هر باری که زمینه یا زبان تغییر کنند اجرا میشود و مقادر درون لوکال استورج را با مقادیر کامپوننت اصلی ذخیره مکند
  useEffect(() => {
    localStorage.setItem("theme", props.mode);
    localStorage.setItem("language", props.language);
  }, [props.mode, props.language]);

  // این قسمت صرفا برای جلوگیری از عمل پیشفرض سابمیت نوشته شده
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  // این قسمت زمانی که نام عوض شود مقادیر را در درون لوکال استورج و استیت اصلی تغییر میدهد

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

  // این قسمت وظیفه تغییر زبان صفحه را به عهده دارد
  const handleLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
    props.setLanguage(e.target.value);
  };

  // 😁این قسمت برای دکوراسیونه😁
  const handleSave = () => {
    alert("Your data saved!");
  };

  // این قسمت استیت زمینه را در درون کامپوننت اصل نمایش میدهد
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
