import React from 'react'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentUtil'
import styler from 'util/styler'
import classnames from 'classnames'


@observer
export default class Image extends React.Component {
  state = {
    eidtable: false,
  }

  handleEdit = () => {
    this.setState({ edit: true })
  }

  renderImg = ()=> {
    const { style, src, id, selected } = this.props

    return (
      <img
        id={id}
        className={classnames('main-image', selected && 'selected')}
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
