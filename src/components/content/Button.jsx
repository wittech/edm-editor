import React from 'react'
import { observer } from 'mobx-react'
import { Selectable, Dragable } from '../builder/ContentUtil'
import store from 'stores'
import styler from 'util/styler'

@observer
export default class Text extends React.Component {
  render() {
    const { path, style, text } = this.props

    return (
      <Selectable path={path}>
        <Dragable>
          <button
            className={`main-button ${store.canvasStore.currentSelect.path === path ? 'current-select' : ''}`}
            style={styler({ ...style })}
          >
            {text}
          </button>
        </Dragable>
      </Selectable>
    )
  }
}
