import React from 'react'
import { inject, observer } from 'mobx-react'
import StructureManager from 'manager/StructureManager'
import StyleManager from 'manager/StyleManager'
import ToolManager from 'manager/ToolManager'
import FileManager from 'manager/FileManager'
import ContextMenu from 'manager/ContextMenu'

@inject('canvasStore')
@observer
export default class ControlPanel extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleRemove)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleRemove)
  }

  render() {
    return (
      <div className="main-control">
        <ContextMenu />
        <ToolManager />
        <FileManager />
        <StyleManager />
        <StructureManager />
      </div>
    )
  }
}
