import React from 'react'
import { mapContent } from 'util/calc'
import { observer } from 'mobx-react'
import { Selectable } from '../builder/ContentHelper'
import store from 'stores'

@observer
export default class Row extends React.Component {
  render(){
    const { data } = this.props

    return (
      <Selectable path={data.path}>
        <div className={`main-row ${store.canvasStore.currentSelect.path === data.path ? 'current-select' : ''}`} style={{ height: `${data.height}px` }} onClick={this.handleSelect}>
          {data.content && mapContent(data.content)}
        </div>
      </Selectable>
    )
  }
}
