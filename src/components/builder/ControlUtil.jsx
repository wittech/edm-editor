import React from 'react'
import { TextFiled } from 'ui'
import { observer, inject } from 'mobx-react'
import { autorun } from 'mobx'
import _s from 'underscore.string'

@inject('canvasStore')
@observer
export class FiledControl extends React.Component {
  state = {
    value: this.currentValue,
    renderOver: false,
  }

  componentDidMount() {
    autorun(() => this.resetValue())
  }

  componentWillUnmount() {
    this.resetValue = () => false
  }

  resetValue = () => {
    this.setState({ value: this.currentValue })
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleEnter = e => {
    const { update } = this.props.canvasStore
    const { isStyle, attr } = this.props
    const updated = isStyle ? { style: { [attr]: e.target.value } } : { [attr]: e.target.value }
    update(updated)
  }

  get currentValue() {
    const { canvasStore, isStyle, attr } = this.props

    return isStyle ? canvasStore.currentSelect.style[attr] : canvasStore.currentSelect[attr]
  }

  render() {
    const { attr, type, label } = this.props
    const { value } = this.state

    return <TextFiled
      full={true}
      type={type || 'text'}
      label={`${label || _s.decapitalize(_s.humanize(attr))}`}
      name={attr}
      value={value}
      onChange={this.handleChange}
      onEnter={this.handleEnter}
    />
  }
}

export class ColorPicker extends React.Component {
  componentDidMount(){

  }

  render(){
    return (
      <div>lalalal</div>
    )
  }
}
