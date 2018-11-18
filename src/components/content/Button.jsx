import React from 'react'
import { observer } from 'mobx-react'
import { Selectable, Dragable } from '../builder/ContentUtil'
import styler from 'util/styler'
import classnames from 'classnames'


@observer
export default class Text extends React.Component {
  render() {
    const { path, style, text, id, selected } = this.props

    return (
      <Selectable path={path}>
        <Dragable>
          <button
            id={id}
            className={classnames('main-button', selected && 'selected')}
            style={styler({ ...style })}
          >
            {text}
          </button>
        </Dragable>
      </Selectable>
    )
  }
}
