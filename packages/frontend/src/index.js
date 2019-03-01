import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Redux";

import theme from "./styles/theme";
import * as serviceWorker from "./serviceWorker";
import Routes from "./Routes";

const initialState = {
  auth: {
    accessToken: "asdasdnasdndacadasd",
    profile: {
      picture: "ciao.png",
      nickname: "marcello",
    },
  },
};

console.log("prova");

const store = createStore(
  rootReducer,
  // initialState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
