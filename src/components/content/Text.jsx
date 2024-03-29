import React from 'react'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentUtil'
import styler from 'util/styler'
import store from 'stores'
import classnames from 'classnames'


@observer
export default class Text extends React.Component {
  $text = React.createRef()
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
    const { path, text, style, id, selected } = this.props
    const { editable } = this.state

    return (
      <Selectable path={path}>
        <p
          ref={this.$text}
          id={id}
          className={classnames('main-text', selected && 'selected')}
          style={styler({ ...style })}
          suppressContentEditableWarning={true}
          contentEditable={editable}
          onDoubleClick={this.handleEdit}
          onBlur={this.handleSave}
          onKeyDown={this.handleKeyDown}
          tabIndex="0"
        >
          {text}
        </p>
      </Selectable>
    )
  }
}
