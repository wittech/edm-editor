import React from 'react'
import store from 'stores'
import '../styles/index.scss'

import ViewPanel from '../components/ViewPanel'
import ControlPanel from '../components/ControlPanel'
import { Provider } from 'mobx-react'

export default class Main extends React.Component {
  state = {}
  render() {
    return (
      <Provider {...store}>
        <div className="main">
          <ViewPanel />
          <ControlPanel />
        </div>
      </Provider>
    )
  }
}
