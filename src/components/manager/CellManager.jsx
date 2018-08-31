import React from 'react'
import { inject, observer } from 'mobx-react'
import { DeleteControl, FiledControl } from '../builder/ControlUtil'

@inject('canvasStore')
@observer
export default class CellManager extends React.Component {
  render() {
    return (
      <div className="form-group">
        <div className="form-control">
          <FiledControl attr="width" />
        </div>
        <div className="form-control">
          <DeleteControl />
        </div>
      </div>
    )
  }
}
