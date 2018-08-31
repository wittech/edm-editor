import * as React from 'react'
import ReactDOM from 'react-dom'
// import { CSSTransitionGroup } from 'react-transition-group'
interface Props {
    title?: string
    open?: boolean
    onClose?: Function
    pos?: string
    className?: string
    unMountLayer?: Function
}

let layer = null

class DialogModal extends React.Component<Props> {
    dialog: any = React.createRef()

    handleClose = () => {
        const dialog = this.dialog.current
        dialog.style.opacity = 0
        dialog.style.top = '100%'
        this.props.onClose && this.props.onClose()
        setTimeout(() => {
            dialog.style = {}
            this.props.unMountLayer()
        }, 200)
    }

    componentDidMount() {
        const dialog = this.dialog.current
        setTimeout(() => {
            dialog.style.opacity = 1
            dialog.style.top = '50%'
        })
    }

    render() {
        const { open, title, children, pos, className, ...rest } = this.props
        return (
            <React.Fragment>
                <div className={
                    'ze-dialog'
                    // + ((pos === 'middle') ? ' ze-middle' : '')
                    + (className ? ' ' + className : '')
                }
                    ref={this.dialog}
                    {...rest}
                >
                    <span className="ze-dialog-cancel" onClick={this.handleClose}>+</span>
                    {title && <div className="ze-dialog-title">{title}</div>}
                    {children && <div className="ze-dialog-body">{children}</div>}
                </div>
                <div className="ze-mask"></div>
            </React.Fragment>
        )
    }
}

export default class Dialog extends React.Component<Props> {

    componentDidMount() {
        this.renderLayer()
    }

    componentDidUpdate() {
        this.renderLayer()
    }

    componentWillReceiveProps() {
        this.renderLayer()
    }

    renderLayer() {
        const { open } = this.props
        const unMountLayer = () => {
            layer.style.display = 'none'
            ReactDOM.unmountComponentAtNode(layer)
        }

        if (!layer) {
            layer = document.createElement('div');
            layer.className = 'ze-layer'
            document.body.appendChild(layer)
            layer.style.display = 'none'
        }

        if (open) {
            layer.style.display = 'block'
            ReactDOM.unstable_renderSubtreeIntoContainer(
                this,
                <DialogModal unMountLayer={unMountLayer} {...this.props} />,
                layer
            )
        }
    }

    render() {
        return null
    }
}
