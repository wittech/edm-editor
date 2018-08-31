import React from 'react'
import { inject, observer } from 'mobx-react'
import { DeleteControl, FiledControl } from '../builder/ControlUtil'
import { Button } from 'ui'

@inject('canvasStore')
@observer
export default class RowManager extends React.Component {
  handleAddCell = () => {
    const { insertContent } = this.props.canvasStore
    insertContent({
      type: 'cell',
      width: '30%',
    })
  }

  render() {
    return (
      <div className="form-group">
        <div className="form-control">
          <FiledControl attr="height" />
        </div>
        <div className="form-control">
          <DeleteControl />
        </div>
        <div className="form-control">
          <Button type="primary" onClick={this.handleAddCell}>Add Cell</Button>
        </div>
      </div>
    )
  }
}
