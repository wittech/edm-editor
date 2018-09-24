import React from 'react'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentUtil'
import store from 'stores'
import styler from 'util/styler'

@observer
export default class Text extends React.Component {
  state = {}
  render() {
    const { path, text, style } = this.props

    return (
      <Selectable path={path}>
        <span
          className={`main-text ${store.canvasStore.currentSelect.path === path ? 'current-select' : ''}`}
          style={styler({ ...style })}
          suppressContentEditableWarning={true}
          contentEditable={this.state.eidtable}
          onDoubleClick={this.handleEdit}
        >
          {text}
        </span>
      </Selectable>
    )
  }
}
