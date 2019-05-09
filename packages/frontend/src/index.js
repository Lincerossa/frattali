import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { store, persistor } from './Redux'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import * as serviceWorker from './serviceWorker'
import Routes from './Routes'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
})

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
