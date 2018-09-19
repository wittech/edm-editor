import React from 'react'
import { observer } from 'mobx-react'
import store from 'stores'

@observer
export default class Row extends React.Component {
  handleDrag = e => {
    e.stopPropagation()
  }

  handleDragStart = e => {
    store.canvasStore.currentDrag = this.props.path
  }

  handleDragEnter = () => {
    store.canvasStore.currentDragGoal = this.props.path
  }

  handleDragEnd = () => {
    store.canvasStore.dragEnd()
  }

  render() {
    const { path, children } = this.props

    return (
      <table
        style={{ width: '100%' }}
        draggable={(store.canvasStore.dragType === 'row').toString()}
        onDragEnter={this.handleDragEnter}
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      >
        <tbody>
          <tr
            className={`main-row ${store.canvasStore.currentSelect.path === path ? 'current-select' : ''}`}
          >
            {children}
          </tr>
        </tbody>
      </table>
    )
  }
}
