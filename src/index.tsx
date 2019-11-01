// Import react dependencies
import * as React from "react";
import { render } from "react-dom";
// Import app dependencies
import "./styles.css";
import UsersPage from "./modules/users/users.page";

/** Renders app */
function App() {
  return (
    <div className="App">
      <h1>Context API example</h1>
      <UsersPage />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
