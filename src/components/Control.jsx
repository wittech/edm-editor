import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('testStore')
@observer
export default class Control extends React.Component {
  render() {
    const { add } = this.props.testStore
    return (
      <div className="main-control">
        <button onClick={add}>add</button>
      </div>
    )
  }
}
