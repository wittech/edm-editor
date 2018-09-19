import React from 'react'
import { inject, observer } from 'mobx-react'
import { FiledControl } from '../builder/ControlUtil'
import { Collapse } from 'ui'

@inject('canvasStore')
@observer
export default class StyleManager extends React.Component {
  state = {}
  render() {
    const style = { ...this.props.canvasStore.currentSelect.style }
    const { text, src, href } = this.props.canvasStore.currentSelect

    return (
      <div className="main-style-control">
        <Collapse
          head="样式"
        >
          <div className="main-style-setting">
            <div className="form-group">
              {
                Object.entries(style).map(entry => (
                  <div className="form-control" key={entry}>
                    <FiledControl isStyle={true} attr={entry[0]} type={/^\d+$/.test(entry[1]) ? 'number' : 'text'} />
                  </div>
                ))
              }

              {
                text && <div className="form-control">
                  <FiledControl attr={'text'} />
                </div>
              }

              {
                src && <div className="form-control">
                  <FiledControl attr={'src'} />
                </div>
              }

              {
                href && <div className="form-control">
                  <FiledControl attr={'href'} />
                </div>
              }
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
