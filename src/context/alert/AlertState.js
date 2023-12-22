import AlertContext from "./alertContext";
import { useState } from "react";
const AlerState = (props) => {
  const [alert, setAlert] = useState(null);
  const showAlert = (massage, type) => {
    setAlert({
      msg: massage,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <AlertContext.Provider value={{ showAlert, alert }}>
      <div style={{ height: "50px",position:'fixed',top:'50px',left:'0px',width:'100%' }}>
        {alert && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
          >
            <strong>{capitalize(alert.type)}</strong>: {alert.msg}
          </div>
        )}
      </div>
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlerState;
