// Import react dependencies
import * as React from "react";
// Import app dependencies
import { UsersProvider } from "./shared/users.context";
import UserForm from "./user-form/user-form.component";
import UsersList from "./users-list/users-list.component";

/** Renders users page */
function UsersPage() {
  return (
    // Wrap form + list components in context provider
    <UsersProvider>
      <UserForm />
      <UsersList />
    </UsersProvider>
  );
}

export default UsersPage;
