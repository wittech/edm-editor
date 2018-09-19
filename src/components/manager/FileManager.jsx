import React, { Component } from 'react'
import { Button, Dialog, message } from 'ui'
import store from 'stores'


export default class FileManager extends Component {
  state = {
    exportOpen: false,
  }

  canvasHtml = ''

  handleSave = () => {
    store.canvasStore.save()
    message(`保存成功${new Date().getSeconds()}`)
  }

  handleExport = () => {
    this.setState({ exportOpen: true })
    this.canvasHtml = document.getElementById('mainView').innerHTML
  }

  handleCancel = () => {
    this.setState({ exportOpen: false })
  }

  render() {
    const { exportOpen } = this.state

    return (
      <div className="main-file-manager">
        <Button onClick={this.handleSave}>S</Button>
        <Button onClick={this.handleExport}>E</Button>
        <Button>R</Button>

        <Dialog
          open={exportOpen}
          style={{ width: 500 }}
          onCancel={this.handleCancel}
        >
          {this.canvasHtml}
        </Dialog>
      </div>
    )
  }
}
