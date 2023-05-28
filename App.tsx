import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducers";
import BananaScreen from "./src/screens/BananaScreen";

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <BananaScreen />
    </Provider>
  );
};

export default App;
