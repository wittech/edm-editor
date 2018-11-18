import React from 'react'
import { observer } from 'mobx-react'
import store from 'stores'
import { Selectable } from '../builder/ContentUtil'
import styler from 'util/styler'
import axios from 'axios'
import { defaultContent } from '../manager/ToolManager'
import classnames from 'classnames'


@observer
export default class Cell extends React.Component {
  handleDrop = e => {
    e.persist()
    e.preventDefault()
    const type = e.dataTransfer.getData('type')
    const files = e.dataTransfer.files

    if (type === 'row-move' || type === 'row-insert') {
      return false
    }

    const { insertContent } = store.canvasStore
    if (type === 'content-insert') {
      const contentType = e.dataTransfer.getData('content-type')
      insertContent(defaultContent[contentType], this.props.path)
    }


    if (files && files[0]) {
      const formData = new FormData()
      formData.append('file', files[0])
      axios.post('https://api.justdodo.cn/upload/xiaohan', formData, { headers: { 'vf': 'xiaohangogogo' } })
        .then(res => {
          const url = res.data.data[0]
          insertContent({
            type: 'image',
            src: url,
            style: {
              width: '100%',
            },
          }, this.props.path)
        })
    } else {
      return false
    }
  }

  handleContextMenu = e => {
    e.preventDefault()
    store.canvasStore.select(this.props.path)
    store.canvasStore.showContextMenu(e)

    const _removeHandler = e => {
      store.canvasStore.hiddenContextMenu(e)
      e.currentTarget.removeEventListener('click', _removeHandler)
    }
    e.currentTarget.addEventListener('click', _removeHandler)
  }

  render() {
    const { path, style, children, id, selected } = this.props
    const { width, cellspacing, ...rest } = style

    return (
      <Selectable path={path}>
        <td
          id={id}
          dragable={'true'}
          style={styler({ width, cellspacing })}
          className={classnames('main-cell', selected && 'selected')}
          onDragOver={e => {
            e.preventDefault(); e.stopPropagation()
          }}
          onDrop={this.handleDrop}
          onContextMenu={this.handleContextMenu}
        >
          <div style={styler({ ...rest })}>
            {children}
          </div>
        </td>
      </Selectable>
    )
  }
}
