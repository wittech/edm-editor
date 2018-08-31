import React from 'react'
import { Button } from 'ui'
import { inject, observer } from 'mobx-react'
import { FiledControl } from '../builder/ControlUtil'
// import { autorun } from 'mobx'

@inject('canvasStore')
@observer
export default class CanvasManager extends React.Component {
  state = {
    width: this.props.canvasStore.currentSelect.width,
    height: this.props.canvasStore.currentSelect.height,
  }

  handleAddRow = () => {
    const { insertContent } = this.props.canvasStore

    insertContent({
      type: 'row',
      height: 100,
    })
  }

  render() {
    return (
      <div className="form-group">
        <div className="form-control">
          <FiledControl attr="width" />
        </div>
        <div className="form-control">
          <FiledControl attr="height" />
        </div>
        <div className="form-control">
          <Button type="primary" onClick={this.handleAddRow}>Add Row</Button>
        </div>
      </div>
    )
  }
}
