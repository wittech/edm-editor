import React from 'react'
import store from 'stores'
import '../styles/index.scss'
import { Provider } from 'mobx-react'
import ViewPanel from '../components/ViewPanel'
import ControlPanel from '../components/ControlPanel'


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
