import React from 'react'
import { inject, observer } from 'mobx-react'
import CanvasManager from 'manager/CanvasManger'
import RowManager from 'manager/RowManger'
import CellManager from 'manager/CellManager'

@inject('canvasStore')
@observer
export default class Control extends React.Component {
  _renderControl = () => {
    const { currentSelect } = this.props.canvasStore
    switch (currentSelect.type){
      case 'canvas':
        return <CanvasManager />
      case 'row':
        return <RowManager />
      case 'cell':
        return <CellManager />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-control">
        {this._renderControl()}
      </div>
    )
  }
}
