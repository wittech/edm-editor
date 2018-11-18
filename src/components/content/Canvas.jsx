import React from 'react'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentUtil'
import store from 'stores'
import styler from 'util/styler'
import { sturctureGroup } from '../manager/StructureManager'
// import { defaultContent } from '../manager/ToolManager'

@observer
export default class Canvas extends React.Component {
  handleDrop = e => {
    e.preventDefault()
    e.persist()
    e.stopPropagation()

    const type = e.dataTransfer.getData('type')

    if (type === 'row-insert'){
      const rowType = e.dataTransfer.getData('row-type')
      store.canvasStore.insertRow(sturctureGroup[rowType])
    }
  }

  handleKeyDown = e => {
    e.keyCode === 8 && store.canvasStore.remove()
  }

  handleCopy = () => {
    store.canvasStore.copy()
  }

  handlePaste = () => {
    store.canvasStore.paste()
  }

  handleContextMenu = e => {
    e.preventDefault()
    store.canvasStore.showContextMenu(e)

    const _removeHandler = e => {
      store.canvasStore.hiddenContextMenu(e)
      e.currentTarget.removeEventListener('click', _removeHandler)
    }
    e.currentTarget.addEventListener('click', _removeHandler)
  }

  render() {
    const { path, children, style } = this.props

    return (
      <Selectable path={path}>
        <table
          onDrop={this.handleDrop}
          onContextMenu={this.handleContextMenu}
          style={{ borderCollapse: 'collapse' }}
          className={'main-canvas'}
          onDragOver={e => e.preventDefault()}
          onDragEnter={this.handleDragEnter}
          onKeyDown={this.handleKeyDown}
          tabIndex="0"
          onCopy={this.handleCopy}
          onPaste={this.handlePaste}
        >
          <tbody>
            <tr>
              <td style={styler({ ...style })}>
                {children || <div style={{ padding: 20 }}>开始编辑吧</div>}
              </td>
            </tr>
          </tbody>
        </table>
      </Selectable>
    )
  }
}
