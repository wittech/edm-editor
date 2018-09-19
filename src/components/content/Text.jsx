import React from 'react'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentUtil'
import store from 'stores'
import styler from 'util/styler'

@observer
export default class Text extends React.Component {
  state = {}
  render() {
    const { data } = this.props

    return (
      <Selectable path={data.path}>
        <span
          className={`main-text ${store.canvasStore.currentSelect.path === data.path ? 'current-select' : ''}`}
          style={styler({ ...data.style })}
          suppressContentEditableWarning={true}
          contentEditable={this.state.eidtable}
          onDoubleClick={this.handleEdit}
        >
          {data.text}
        </span>
      </Selectable>
    )
  }
}
