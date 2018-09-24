import React, { Component } from 'react'
import { Button, Dialog, message, TextFiled } from 'ui'
import store from 'stores'


export default class FileManager extends Component {
  state = {
    exportOpen: false,
    sendOpen: false
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

  handleSend = () => {
    this.setState({ sendOpen: true })
  }

  render() {
    const { exportOpen, sendOpen } = this.state

    return (
      <div className="main-file-manager">
        <Button onClick={this.handleSave}>S</Button>
        <Button onClick={this.handleExport}>E</Button>
        <Button onClick={this.handleSend}>S</Button>

        <Dialog
          open={exportOpen}
          style={{ width: 500 }}
          onCancel={this.handleCancel}
        >
          {this.canvasHtml}
        </Dialog>

        <Dialog
          open={sendOpen}
          title="发送邮件"
          onCancel={() => this.setState({sendOpen: false})}
        >
          <TextFiled label="收件人"/>
        </Dialog>
      </div>
    )
  }
}
