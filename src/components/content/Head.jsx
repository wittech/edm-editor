import React from 'react'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentUtil'
import styler from 'util/styler'
import store from 'stores'
import classnames from 'classnames'

@observer
export default class Text extends React.Component {
  state = {
    editable: false,
  }

  handleEdit = () => {
    this.setState({ editable: true }, () => {
      document.execCommand('selectAll',false,null)
    })
  }

  handleSave = e => {
    const { update, remove } = store.canvasStore
    this.setState({ editable: false })
    const text = e.target.innerText
    if (text){
      update({ text: e.target.innerText })
    } else {
      remove(this.props.path)
    }
  }

  handleKeyDown = e => {
    if (this.state.editable){
      e.stopPropagation()
    }
  }

  render() {
    const { path, text, style, id,selected } = this.props
    const { editable } = this.state

    return (
      <Selectable path={path}>
        <h3
          id={id}
          className={classnames('main-text', selected && 'selected')}
          style={styler({ ...style })}
          suppressContentEditableWarning={true}
          onDoubleClick={this.handleEdit}
          contentEditable={editable}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleSave}
        >
          {text}
        </h3>
      </Selectable>
    )
  }
}
