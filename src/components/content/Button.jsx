import React from 'react'
import { observer } from 'mobx-react'
import { Selectable, Dragable } from '../builder/ContentUtil'
import store from 'stores'
import styler from 'util/styler'

@observer
export default class Text extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Selectable path={data.path}>
        <Dragable>
          <button
            className={`main-button ${store.canvasStore.currentSelect.path === data.path ? 'current-select' : ''}`}
            style={styler({ ...data.style })}
          >
            {data.text}
          </button>
        </Dragable>
      </Selectable>
    )
  }
}
