import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'ui'


const defaultContent = {
  text: {
    text: 'TEXT',
    type: 'text',
    style: {
      fontSize: '14px',
      color: '#333',
      textAlign: 'left',
      padding: '10px 20px',
      display: 'inline-block',
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
    path: '/row/td1/image',
    src: 'https://dn-sdkcnssl.qbox.me/editor/IXtWRgh0BQoZbwGnvxhm.jpg',
    style:  {
      width: 'auto',
      height: 100,
    },
  },
  cell: {
    type: 'cell',
    style: { width: 400 },
  },
  row: {
    type: 'row',
    style: { height: 100 },
  },
}

@inject('canvasStore')
@observer
export default class ToolManager extends React.Component {
  handleAddContent = type => {
    const { insertContent } = this.props.canvasStore
    insertContent(defaultContent[type])
  }

  handleAddRow = () => {
    const { insertRow } = this.props.canvasStore
    insertRow()
  }

  render() {
    const { currentSelect, remove } = this.props.canvasStore
    const currentSelectType = currentSelect.type

    return (
      <div className="main-tool-bar">
        {
          currentSelectType === 'cell' && (
            <React.Fragment>
              <Button onClick={() => this.handleAddContent('text')}>T</Button>
              <Button onClick={() => this.handleAddContent('button')}>B</Button>
              <Button onClick={() => this.handleAddContent('image')}>I</Button>
            </React.Fragment>
          )
        }
        {
          currentSelectType === 'row' && (
            <React.Fragment>
              <Button onClick={() => this.handleAddContent('cell')}>C</Button>
            </React.Fragment>
          )
        }
        {
          currentSelectType === 'canvas' && (
            <React.Fragment>
              <Button onClick={() => this.handleAddRow()}>R</Button>
            </React.Fragment>
          )
        }
        {currentSelectType !== 'canvas' && <Button type="danger" onClick={() => remove()}>D</Button>}
      </div>
    )
  }
}
