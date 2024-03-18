// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter as Router } from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StateProvider } from "./Context/StateProvider";
import { initialState } from "./Context/initialState";
import reducer from "./Context/reducer";
import { UpdateContext, UpdateProvider } from "./Context/updatedFlag";

const root = document.getElementById("root");

const render = () => {
  ReactDOM.unmountComponentAtNode(root);
  createRoot(root).render(
    <React.StrictMode>
      <Router>
        <UpdateProvider>
          <StateProvider initialState={initialState} reducer={reducer}>
            <App />
          </StateProvider>
        </UpdateProvider>
      </Router>
    </React.StrictMode>
  );
};

render();
