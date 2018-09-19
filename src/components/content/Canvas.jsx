import React from 'react'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentUtil'
import store from 'stores'
import styler from 'util/styler'

@observer
export default class Canvas extends React.Component {
  render() {
    const { path, children, style } = this.props

    return (
      <Selectable path={path}>
        <table
          style={{ borderCollapse: 'collapse' }}
          className={`main-canvas ${store.canvasStore.currentSelect.path === path ? 'current-select' : ''}`}
        >
          <tbody>
            <tr>
              <td style={styler({ ...style })}>
                {children || '开始编辑吧'}
              </td>
            </tr>
          </tbody>
        </table>
      </Selectable>
    )
  }
}
