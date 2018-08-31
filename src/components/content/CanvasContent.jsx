import React from 'react'
import { mapContent } from 'util/calc'
import { observer } from 'mobx-react'
import { Selectable, Dragable } from '../builder/ContentHelper'
import store from 'stores'

@observer
export default class Canvas extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Selectable path={data.path}>
        <Dragable>
          <div className={`main-canvas ${store.canvasStore.currentSelect.path === data.path ? 'current-select' : ''}`} style={{ width: `${data.width}px`, minHeight: `${data.height}px` }}>
            {data.content && mapContent(data.content)}
          </div>
        </Dragable>
      </Selectable>
    )
  }
}
