import React from 'react'
import { inject, observer } from 'mobx-react'
import StructureManager from 'manager/StructureManager'
import StyleManager from 'manager/StyleManager'
import ToolManager from 'manager/ToolManager'
import FileManager from 'manager/FileManager'

@inject('canvasStore')
@observer
export default class ControlPanel extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleRemove)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleRemove)
  }

  handleRemove = e => {
    const { remove } = this.props.canvasStore
    if (e.target.className.match('main-button')){
      e.keyCode === 8 && remove()
    }

    if (e.target === document.body){
      e.keyCode === 8 && remove()
    }
  }

  render() {
    return (
      <div className="main-control">
        <ToolManager />
        <FileManager />
        <StyleManager />
        <StructureManager />
      </div>
    )
  }
}
