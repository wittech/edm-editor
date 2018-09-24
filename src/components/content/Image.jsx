import React from 'react'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentUtil'
import store from 'stores'
import styler from 'util/styler'

@observer
export default class Image extends React.Component {
  state = {
    eidtable: false,
  }

  handleEdit = () => {
    this.setState({ edit: true })
  }

  renderImg = ()=> {
    const { path, style, src } = this.props

    return (
      <img
        className={`main-image ${store.canvasStore.currentSelect.path ===path ? 'current-select' : ''}`}
        style={styler({ ...style })}
        src={src}
      />
    )
  }

  render() {
    const { path, href } = this.props

    return (
      <Selectable path={path}>
        {
          href
            ? <a href={href}>{this.renderImg()}</a>
            : this.renderImg()
        }
      </Selectable>
    )
  }
}
