import React from 'react'
import { observer } from 'mobx-react'
import store from 'stores'
import { Selectable } from '../builder/ContentUtil'
import styler from 'util/styler'

@observer
export default class Col extends React.Component {
  handle
  render() {
    const { path, style, children, dragable } = this.props
    const { width, cellspacing, ...rest } = style

    return (
      <Selectable path={path}>
        <td
          dragable={dragable}
          style={styler({ width, cellspacing })}
          className={`main-cell ${store.canvasStore.currentSelect.path === path ? 'current-select' : ''}`}
        >
          <div style={styler({ ...rest, ...{ overflow: 'hidden' } })}>
            {children}
          </div>
        </td>
      </Selectable>
    )
  }
}
