import React from 'react'
import { Button, TextFiled } from 'ui'
import store from 'stores'
import { observer, inject } from 'mobx-react'
import { autorun } from 'mobx'

export class DeleteControl extends React.Component {
  handleDelete = () => {
    const { remove } = store.canvasStore
    remove()
  }

  render() {
    return (
      <Button type="primary" onClick={this.handleDelete}>Delete</Button>
    )
  }
}

@inject('canvasStore')
@observer
export class FiledControl extends React.Component {
  state = {
    value: this.props.canvasStore.currentSelect[this.props.attr],
    renderOver: false
  }

  componentDidMount(){
    autorun(() => {
      this.resetValue()
    })
  }

  componentWillUnmount(){
    this.resetValue = () => false
  }

  resetValue = () => {
    this.setState({ value: this.props.canvasStore.currentSelect[this.props.attr] })
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleEnter = e => {
    const { update } = this.props.canvasStore
    update({ [e.target.name]: e.target.value })
  }

  render() {
    const { attr } = this.props
    const { value } = this.state

    return <TextFiled
      label={`${attr}:`}
      name={attr}
      value={value}
      onChange={this.handleChange}
      onEnter={this.handleEnter}
    />
  }
}
