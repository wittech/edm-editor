import * as React from 'react'
import * as ReactDOM from 'react-dom'


interface Props {
  onFinished?: Function,
  type?: string
}
class Message extends React.Component<Props> {
  el: any = React.createRef()

  componentDidMount() {
    this.el.current.classList.add('ze-move-in')
    setTimeout(() => {
      this.el.current.classList.add('ze-move-out')
      this.el.current.classList.remove('ze-move-in')
      setTimeout(() => {
        this.props.onFinished && this.props.onFinished()
      }, 600)
    }, 2000)
  }

  render() {
    const { children, type } = this.props

    return (
      <div ref={this.el} className={`ze-message ze-message-${type}`}>
        {children}
      </div>
    )
  }
}

class Messages extends React.Component {
  static instance = null

  state = {
    messages: [],
  }

  add = (children, type = 'success') => {
    const { messages } = this.state
    const id = Number(new Date())
    const message = { children, type, id }
    messages.push(message)
    this.setState({ messages })
  }

  handleMessageHidden = id => {
    const messages = this.state.messages.filter(message => message.id !== id)
    this.setState({ messages })
  }

  render() {
    return <div id="ze-message-group">
      {this.state.messages.map(message =>
        (
          <Message
            key={message.id}
            type={message.type}
            onFinished={() => this.handleMessageHidden(message.id)}
          >
            {message.children}
          </Message>
        )
      )}
    </div>
  }
}

const message = (children, type) => {
  let layer = document.getElementById('ze-message-layer')
  if (!layer) {
    layer = document.createElement('div')
    layer.id = 'ze-message-layer'
    document.body.appendChild(layer)
  }

  if (!Messages.instance) {
    Messages.instance = ReactDOM.render(<Messages />, layer)
  }

  return Messages.instance.add(children, type)
}

export default message
