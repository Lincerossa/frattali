import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { store, persistor } from './Redux'
import { getAccessToken } from './Redux/auth/reducer'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import * as serviceWorker from './serviceWorker'
import Routes from './Routes'

function ApolloThing({ children }) {
  const storeState = store.getState()

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    request: operation => {
      operation.setContext(context => ({
        headers: {
          ...context.headers,
          authorization: getAccessToken(storeState),
        },
      }))
    },
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ApolloThing>
          <Routes />
        </ApolloThing>
      </ThemeProvider>
    </PersistGate>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
