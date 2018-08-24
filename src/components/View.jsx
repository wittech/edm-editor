import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('testStore')
@observer
export default class Control extends React.Component {
  render() {
    const {count} = this.props.testStore
    return (
      <div className="main-view">
        {count}
      </div>
    )
  }
}
