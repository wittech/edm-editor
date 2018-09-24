import React from 'react'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentUtil'
import store from 'stores'
import styler from 'util/styler'
import { sturctureGroup } from '../manager/StructureManager'


@observer
export default class Canvas extends React.Component {
  handleContextMenu = e => {
    e.preventDefault()
  }

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

  render() {
    const { path, children, style } = this.props

    return (
      <Selectable path={path}>
        <table
          onDrop={this.handleDrop}
          onContextMenu={this.handleContextMenu}
          style={{ borderCollapse: 'collapse' }}
          className={`main-canvas ${store.canvasStore.currentSelect.path === path ? 'current-select' : ''}`}
          onDragOver={e => e.preventDefault()}
          onDragEnter={this.handleDragEnter}
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
