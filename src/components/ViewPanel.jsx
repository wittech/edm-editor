import React from 'react'
import { inject, observer } from 'mobx-react'
import Button from './content/Button'
import Text from './content/Text'
import Image from './content/Image'
import Canvas from './content/Canvas'
import Row from './content/Row'
import Cell from './content/Cell'
import Head from './content/Head'
import store from 'stores'


const getComponent = type => {
  let Component
  switch (type) {
    case 'canvas':
      Component = Canvas; break
    case 'row':
      Component = Row; break
    case 'cell':
      Component = Cell; break
    case 'text':
      Component = Text; break
    case 'button':
      Component = Button; break
    case 'image':
      Component = Image; break
    case 'head':
      Component = Head; break
    default:
      console.warn('invalid type')
      Component = Canvas
  }

  return Component
}

const render = meta => {
  const { type, children, path, dragable, id, ...rest } = meta
  const Component = getComponent(type)

  return <Component
    key={path}
    path={path}
    id={id}
    selected={store.canvasStore.currentSelect.id === id}
    dragable={dragable}
    children={map(children)}
    {...rest}
  />
}

const map = children => {
  if (!children || children.length === 0) {
    return null
  }

  return children.map(meta => render(meta))
}


@inject('canvasStore')
@observer
export default class View extends React.Component {
  render() {
    const { content } = this.props.canvasStore


    return (
      <div className="main-view" id="mainView" style={{ position: 'relative' }}>
        {render(content)}
      </div>
    )
  }
}
