import React, { Component } from 'react'
import { Collapse } from 'ui'
import store from 'stores'


const sturctureGroup = [
  [12],
  [6, 6],
  [4, 4, 4],
  [3, 3, 3, 3],
  [4, 8],
  [8, 4],
  [3, 6, 3],
]

export default class StructureManager extends Component {
  handleInsertRow = index => {
    store.canvasStore.insertRow(sturctureGroup[index])
  }

  render() {
    return (
      <div className="main-structure">
        <Collapse
          head={'结构'}
        >
          <div className="main-structure-group">
            {sturctureGroup.map((item, index) => (
              <div key={index} className="main-structure-item" onClick={() => this.handleInsertRow(index)}>
                {item.map((span, index) => <div key={index} className={`main-structure-span col-${span}`} />)}
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    )
  }
}
