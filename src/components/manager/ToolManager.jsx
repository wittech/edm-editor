import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'ui'


export const defaultContent = {
  text: {
    text: '这是一段简短而优雅的描述',
    type: 'text',
    style: {
      fontSize: '14px',
      color: '#333',
      textAlign: 'left',
      padding: '10px 20px',
      margin: 0,
    },
  },
  button: {
    text: 'BUTTON',
    type: 'button',
    style: {
      color: '#fff',
      fontSize: '14px',
      width: '80px',
      height: '30px',
      background: '#3af',
      border: 'none',
      borderRadius: '4px',
      margin: 0,
    },
  },
  image: {
    type: 'image',
    src: 'https://dn-sdkcnssl.qbox.me/editor/IXtWRgh0BQoZbwGnvxhm.jpg',
    style: {
      width: 'auto',
      height: 100,
    },
  },
  head: {
    type: 'head',
    text: '标题',
    style: {
      height: 30,
      lineHeight: 30,
      textAlign: 'center',
      margin: 0,
      padding: 20,
    },
  },
}

const buttons = [
  { text: 'H', type: 'head' },
  { text: 'T', type: 'text' },
  { text: 'B', type: 'button' },
  { text: 'I', type: 'image' },
]

@inject('canvasStore')
@observer
export default class ToolManager extends React.Component {
  handleAddContent = type => {
    const { insertContent, currentSelect } = this.props.canvasStore

    if (currentSelect.type !== 'cell'){
      return false
    }
    insertContent(defaultContent[type])
  }

  handleDragStart = (e, contentType) => {
    e.dataTransfer.setData('type', 'content-insert')
    e.dataTransfer.setData('content-type', contentType)
  }

  render() {
    const { currentSelect, remove } = this.props.canvasStore
    const currentSelectType = currentSelect.type

    return (
      <div className="main-tool-bar">
        {
          buttons.map((button, index) => <Button
            draggable="true"
            key={index}
            onClick={() => this.handleAddContent(button.type)}
            onDragStart={e => this.handleDragStart(e, button.type)}
          >
            {button.text}
          </Button>
          )
        }
        {currentSelectType !== 'canvas' && <Button onClick={() => remove()}>D</Button>}
      </div>
    )
  }
}
