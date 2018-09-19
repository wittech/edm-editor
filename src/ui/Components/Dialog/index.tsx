import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface Props {
    title?: string
    open?: boolean
    onCancel?: Function
    pos?: string
    className?: string
    unMountLayer?: Function
}


export default class Dialog extends React.Component<Props> {
    dialog: any = React.createRef()

    handleClose = () => {
        this.props.onCancel && this.props.onCancel()
    }

    render() {
        const { open, title, children, pos, className } = this.props

        let layer = document.getElementById('ze-modal-layer')
        if (!layer) {
            layer = document.createElement('div')
            layer.id = 'ze-modal-layer'

            document.body.appendChild(layer)
        }

        let mask = document.getElementById('ze-mask')
        if (!mask) {
            mask = document.createElement('div')
            mask.id = 'ze-mask'

            layer.appendChild(mask)
        }

        if (!open) {
            layer.style.display = 'none'
            mask.style.display = 'none'
        } else {
            layer.style.display = 'block'
            mask.style.display = 'block'
        }

        return ReactDOM.createPortal((
            <React.Fragment>
                <div
                    className={'ze-dialog ze-dialog-move-in' + (className ? ' ' + className : '')}
                    ref={this.dialog}
                >
                    <span className="ze-dialog-cancel" onClick={this.handleClose}>+</span>
                    {title && <div className="ze-dialog-title">{title}</div>}
                    {children && <div className="ze-dialog-body">
                        <div className="ze-dialog-container">
                            {children}
                        </div>
                    </div>}
                </div>
            </React.Fragment>
        ), layer)
    }
}
