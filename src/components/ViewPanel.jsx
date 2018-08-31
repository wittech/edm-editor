import React from 'react'
import { inject, observer } from 'mobx-react'
import { mapContent } from 'util/calc'


@inject('canvasStore')
@observer
export default class Control extends React.Component {
  render() {
    const { content } = this.props.canvasStore

    return (
      <div className="main-view">
        {mapContent(content)}
      </div>
    )
  }
}
