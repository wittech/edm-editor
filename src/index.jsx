import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/Main'


const root = document.createElement('div')
document.body.appendChild(root)

const renderApp = App => ReactDOM.render(<App />,root)

renderApp(App)
module.hot && module.hot.accept(
  './pages/Main', () => {
    const App = require('./pages/Main').default // eslint-disable-line global-require
    renderApp(App)
  }
)
