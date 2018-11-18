import React from 'react'
import { observer, inject } from 'mobx-react'


@inject('canvasStore')
@observer
export default class ContextMenu extends React.Component {
  componentDidMount() {

  }

  handleSelectRow(){

  }

  handleSelectCell(){

  }

  render() {
    const contextMenu = this.props.canvasStore.contextMenu
    const { visible, top, left } = contextMenu

    return visible
      ?(
        <div className="main-context-menu" style={{ top, left }}>
          <ul>
            <li className="main-context-menu-item" onClick={this.handleSelectRow}>选取整行</li>
            <li className="main-context-menu-item" onClick={this.handleSelectCell}>选取单元格</li>
          </ul>
        </div>
      )
      : null
  }
}
