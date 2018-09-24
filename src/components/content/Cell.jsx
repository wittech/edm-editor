import React from 'react'
import { observer } from 'mobx-react'
import store from 'stores'
import { Selectable } from '../builder/ContentUtil'
import styler from 'util/styler'
import axios from 'axios'

@observer
export default class Cell extends React.Component {
  handleDrop = e => {
    e.persist()
    e.preventDefault()
    const type = e.dataTransfer.getData('type')
    const files = e.dataTransfer.files

    if(type === 'row-move' || type === 'row-insert'){
      return false
    }

    console.log(files)
    if(files){
      const formData = new FormData()
      formData.append("file", files[0])
      axios.post('https://api.justdodo.cn/upload/xiaohan', formData,  { headers: { 'vf': 'xiaohangogogo' }})
        .then(res => {
          const url = res.data.data[0]
          store.canvasStore.insertContent({
            type: 'image',
            src: url,
            style:  {
              width: '100%',
            },
          }, this.props.path)
        })
    }else{
      return false
    }
  }

  handleContextMenu = e => {
    e.preventDefault()
  }

  render() {
    const { path, style, children } = this.props
    const { width, cellspacing, ...rest } = style
    const isSelect = store.canvasStore.currentSelect.path === this.props.path

    return (
      <Selectable path={path}>
        <td
          dragable={isSelect ? 'true' : 'false'}
          style={styler({ width, cellspacing })}
          className={`main-cell ${isSelect ? 'current-select' : ''}`}
         
          onDragOver={e => {e.preventDefault(); e.stopPropagation()}}
          onDrop={this.handleDrop}
          onContextMenu={this.handleContextMenu}
        >
          <div style={styler({ ...rest, ...{ overflow: 'hidden' } })}>
            {children}
          </div>
        </td>
      </Selectable>
    )
  }
}
