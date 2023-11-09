import "./dashboard.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export type DashboardProps = {
  name: string;
};

export default function Dashboard(props: DashboardProps): JSX.Element {
  const date = new Date();
  const [greeting, setGreeting] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    if (date.getHours() >= 0 && date.getHours() <= 12) {
      const greet1 = t("greeting1");
      setGreeting(greet1);
    } else if (date.getHours() > 12 && date.getHours() <= 18) {
      const greet2 = t("greeting2");
      setGreeting(greet2);
    } else {
      const greet3 = t("greeting3");
      setGreeting(greet3);
    }
  }, [greeting]);

  return (
    <div className="dashboard" data-testid="dashboard">
      <h1>
        {date.getHours() > 0 ? date.getHours() : "00"}:
        {date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}
      </h1>
      <h3>
        {props.name && (
          <>
            {greeting}
            {props.name}
          </>
        )}
      </h3>
    </div>
  );
}
