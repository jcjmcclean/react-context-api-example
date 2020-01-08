# Context API example

## Overview
Following this example, you can see how to effectively use React's context API to create, edit and share data between components through a context provider.

## Sample code
Code for this example can be found below:

 - [Code sandbox](https://codesandbox.io/s/github/jcjmcclean/react-context-api-example/)
 - [Github repo](https://github.com/jcjmcclean/react-context-api-example/)

## Files
This example has a users module, containing a users page, users list component, user form component and a users context.

### users.context.ts `UsersContext`
This provides context (data/state/functions) to components (or pages) wrapped in `UsersProvider`.

Use React's context API to create state and dispatch contexts and set their initial states to `undefined`.
```js
/** Create users state context */
const UsersStateContext = React.createContext<State | undefined>(undefined);
/** Create users dispatch context */
const UsersDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);
```

Create a reducer for the users module. Later we can dispatch messages to this reducer, which can call functions within the `switch` statement based on their `action.type`. Here we have an `add` function to add a new user, which pushes the user's details into the user's state.
```js
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
```

The `UsersProvider` creates a wrapper/container component which we must wrap around the component(s) which we wish to provide the users context to. This allows us to access the users state and dispatch from within child components.
```js
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
```

`UseUsersState` is a utility function which we can import into components which have been wrapped with the `UsersProvider` component. We then call it to access the current users state, set in `UsersStateContext`.
```js
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
```

`UseUsersDispatch` is a utility function which we can import into components which have been wrapped with the `UsersProvider` component. We then call it to update the current users state, using `UsersDispatchContext`.
```js
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
```

### users.page.tsx `UsersPage`
A function component which renders the users page.

Create the users page and return the JSX to render it. 
```js
function UsersPage() {
  return (
	...
  );
}
```

We wrap the `UserForm` and `UsersList` components in `UsersProvider` to provide access to  `UsersStateContext` and `UsersDispatchContext`.  `UsersStateContext` allows us to read the users state. `UsersDispatchContext` allows us to dispatch a new users state through a reducer.
```js
// Wrap form + list components in context provider
<UsersProvider>
  <UserForm />
  <UsersList />
</UsersProvider>
```

### users-list.component.tsx `UsersList`
A function component which renders a users list. Arguably the exported function here should be named `UsersListComponent` - to be discussed.

Create the users list component and get users state from the users context and return the JSX to render.
```js
function UsersList() {
	// Get users state
	const usersState = UseUsersState();
	return (
		<ul>
			...
		</ul>
	);
}
```

Loop through the users array from users state and output each user's name as a list item.
```js
{/* Loop through each user */}
{usersState.users.map(function(user, index) {
  return <li key={index}>{user.name}</li>;
})}
```

### user-form.component.tsx `UserForm`
A function component which renders an add user form and handles events from the form. Arguably the exported function here should be named `UserFormComponent` - to be discussed.

Create the user form component, access user's dispatch from the user-context file and create a userName state hook on this component.
```js
function UserForm() {
  // Access users dispatch
  const dispatch = UseUsersDispatch();

  // Create username state hook
  const [userName, setUserName] = React.useState("");
  ...
}
```

Handle the submission event of the user form by dispatching a message to the users context reducer, set to add a user - with the username from the component's state. After message dispatch, we clear out the username state on the component.
```js
/** Form submission event handler */
const handleSubmit = event => {
  event.preventDefault();
  // Dispatch new add user
  dispatch({ type: "add", user: { name: userName } });
  // Clear out username state
  setUserName("");
};
```

Handle value changes to the username input field. On change, update the component's username state to the value of the input field.
```js
/** Username input change event handler */
const handleChange = event => {
  // Update username state to input value
  setUserName(event.target.value);
};
```

Render the user form.
```js
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
```
