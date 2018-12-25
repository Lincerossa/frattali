import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import { Sizeme } from './headless';
import * as serviceWorker from './serviceWorker';
import Art from './page/Art'

const App = () => <Sizeme>
  {({ size }) => 
    <Art {...size} />  
  } 
</Sizeme>


ReactDOM.render(<ThemeProvider theme={theme} ><App /></ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
