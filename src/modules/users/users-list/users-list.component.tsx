// Import react dependencies
import * as React from "react";
// Import app dependencies
import { UseUsersState } from "../shared/users.context";

/** Renders a list of users */
function UsersList() {
  // Get users state
  const usersState = UseUsersState();

  // Render users list
  return (
    <ul>
      {/* Loop through each user */}
      {usersState.users.map(function(user, index) {
        return <li key={index}>{user.name}</li>;
      })}
    </ul>
  );
}

export default UsersList;
