import "./popup.css";

//  این قسمت تعیین کننده ی مقادیری است که به عنوان پراپس به این کانپوننت داده میشود
export type PopupProps = {
  name: string;
  setName: any;
  setShowPopup: any;
};

export default function Popup(props: PopupProps): JSX.Element {
  // این فانکشن هرگاه سابمیت اتفاق بیفتد اجرا میشود و مقادیر را در لوکال استورج و استیت مربوط به نام ذخیره میکند
  // واگر خالی باشد قبول نشده و ارور داده میشود
  const handleName = (e: any) => {
    e.preventDefault();
    if (e.target.firstElementChild.firstElementChild.value.trim() !== "") {
      props.setName(e.target.firstElementChild.firstElementChild.value);
      props.setShowPopup(false);
      localStorage.setItem(
        "name",
        e.target.firstElementChild.firstElementChild.value
      );
    } else {
      alert("input is empty!");
    }
  };

  return (
    <div className="popup" data-testid="popup">
      <form onSubmit={handleName} data-testid="popup-form">
        <label>
          What Is Your Name?
          <input type="text" data-testid="popup-input" />
        </label>
        <button data-testid="popup-butt">submit</button>
      </form>
    </div>
  );
}
