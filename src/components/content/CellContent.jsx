import React from 'react'
import { mapContent, isPercent } from 'util/calc'
import { observer } from 'mobx-react'
import store from 'stores'
import { Selectable } from '../builder/ContentHelper'

@observer
export default class Cell extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Selectable path={data.path}>
        <div
          className={`main-cell ${store.canvasStore.currentSelect.path === data.path ? 'current-select' : ''}`}
          style={{ width: isPercent(data.width) ? data.width : `${data.width}px` }}
        >
          {data.content && mapContent(data.content)}
        </div>
      </Selectable>
    )
  }
}
