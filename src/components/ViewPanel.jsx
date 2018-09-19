import React from 'react'
import { inject, observer } from 'mobx-react'
import Button from './content/Button'
import Text from './content/Text'
import Image from './content/Image'
import Canvas from './content/Canvas'
import Row from './content/Row'
import Col from './content/Col'


const getComponent = type => {
  let Component
  switch (type) {
    case 'canvas':
      Component = Canvas; break
    case 'row':
      Component = Row; break
    case 'col':
      Component = Col; break
    case 'text':
      Component = Text; break
    case 'button':
      Component = Button; break
    case 'image':
      Component = Image; break
    default:
      console.warn('invalid type')
      Component = Canvas
  }

  return Component
}

const render = meta => {
  const { type, content, path, dragable, ...rest } = meta
  const Component = getComponent(type)
  const children = map(content)

  return <Component key={path} path={path} dragable={dragable} children={children} {...rest} />
}
const map = content => {
  if (!content || Object.values(content).length === 0) {
    return null
  }

  return Object.values(content).map(meta => render(meta))
}

@inject('canvasStore')
@observer
export default class View extends React.Component {
  render() {
    const { content } = this.props.canvasStore

    return (
      <div className="main-view" id="mainView">
        {render(content)}
      </div>
    )
  }
}
