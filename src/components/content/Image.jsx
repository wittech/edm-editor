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

  render() {
    const { data } = this.props

    return (
      <Selectable path={data.path}>
        <img
          className={`main-image ${store.canvasStore.currentSelect.path === data.path ? 'current-select' : ''}`}
          style={styler({ ...data.style })}
          src={data.src}
        />
      </Selectable>
    )
  }
}
