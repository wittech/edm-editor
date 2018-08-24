import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import Main from './pages/Main'
import store from './stores'
import './styles/index.scss'

const root = document.createElement('div')
document.body.appendChild(root)

const renderApp = (App) => {
  ReactDOM.render(
    <Provider {...store}>
      <App />
    </Provider>,
    root
  )
}

renderApp(Main)

if (module.hot) {
  module.hot.accept(
    './pages/Main', () => {
      const nextUpload = require('./pages/Main').default // eslint-disable-line global-require
      renderCom(nextUpload)
    }
  )
}

