import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext)
}

function loadStories() {
  requireAll(require.context('../src', true, /stories\.js?$/))
}

const withGlobal = cb => (
  <React.Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{cb()}</ThemeProvider>
  </React.Fragment>
)

addDecorator(withGlobal)

configure(loadStories, module)
