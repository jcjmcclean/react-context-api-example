// Import react dependencies
import * as React from "react";
// Import app dependencies
import { UseUsersDispatch } from "../shared/users.context";

/** Renders a form to add a user with event handler */
function UserForm() {
  // Access users dispatch
  const dispatch = UseUsersDispatch();

  // Create username state hook
  const [userName, setUserName] = React.useState("");

  /** Form submission event handler */
  const handleSubmit = event => {
    event.preventDefault();
    // Dispatch new add user
    dispatch({ type: "add", user: { name: userName } });
    // Clear out username state
    setUserName("");
  };

  /** Username input change event handler */
  const handleChange = event => {
    // Update username state to input value
    setUserName(event.target.value);
  };

  // Render user form
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={handleChange}
      />
      <button>Add {userName || "user"}</button>
    </form>
  );
}

export default UserForm;
