import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducers";
import BananaScreen from "./src/screens/BananaScreen";

// Introducing a Redux store, actions, and a reducer to manage the app's state
const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <BananaScreen />
    </Provider>
  );
};

export default App;
