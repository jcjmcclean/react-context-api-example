// Import react dependencies
import * as React from "react";

/** Define user type */
type User = { name: string };
/** Type for users state */
type State = { users: [User] };
/** Type for users state dispatch */
type Dispatch = (action: Action) => void;
/** Type for users reducer action */
type Action = { type: "add"; user: User };
/** Type for users provider properties */
type UsersProviderProps = { children: React.ReactNode };

/** Create users state context */
const UsersStateContext = React.createContext<State | undefined>(undefined);
/** Create users dispatch context */
const UsersDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

/** Reducer for modifying users state */
function UsersReducer(state, action) {
  switch (action.type) {
    // Add user action
    case "add": {
      // Push to copy of state.users
      state.users.push(action.user);
      // Update state
      return { users: state.users };
    }
    // Default action
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/** Container component so children can access users state via context api */
function UsersProvider({ children }: UsersProviderProps) {
  // Create users state reducer hook
  const [state, dispatch] = React.useReducer(UsersReducer, {
    users: [{ name: "Marty McFly" }]
  });

  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

/** Utility function to allow other components to access users state from context api */
function UseUsersState() {
  // Get users state context
  const context = React.useContext(UsersStateContext);

  // If we have data in context (UsersStateContext.Provider value)
  if (context !== undefined) {
    return context;
  }
  throw new Error("UseUsersState must be used within a UsersProvider");
}

/** Utility function to allow other components to access users dispatch from context api */
function UseUsersDispatch() {
  // Get users dispatch context
  const context = React.useContext(UsersDispatchContext);

  // If we have data in context (UsersDispatchContext.Provider value)
  if (context !== undefined) {
    return context;
  }
  throw new Error("UseUsersDispatch must be used within a UsersProvider");
}

export { UsersProvider, UseUsersState, UseUsersDispatch };
