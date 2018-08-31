
import * as React from 'react'

interface Porps {
    error?: boolean
    label?: any
    message?: string
    onEnter?: Function
}

export class TextFiledGroup extends React.Component<Porps & React.InputHTMLAttributes<HTMLInputElement>> {
    
}


export class TextFiled extends React.Component<Porps & React.InputHTMLAttributes<HTMLInputElement>> {
    state = {
        focus: false,
        dirty: false
    }

    handleFocus = e => {
        this.setState({ focus: true })
        this.props.onFocus && this.props.onFocus(e)
    }

    handleBlur = e => {
        this.setState({ focus: false, dirty: true })
        this.props.onFocus && this.props.onFocus(e)
    }

    handleKeyDown = e => {
        this.props.onKeyDown && this.props.onKeyDown(e)
        if(e.keyCode === 13 && this.props.onEnter){
            this.props.onEnter(e)
        }
    }

    render() {
        const { error, label, message, required, disabled, onEnter, ...rest } = this.props
        const { focus } = this.state
        return (
            <div className="ze-input-container">
                <div className={'ze-input-wrapper'
                    + (focus ? ' ze-focus' : '')
                    + (error ? ' ze-error' : '')
                    + (required ? ' ze-required' : '')
                    + (disabled ? ' ze-disabled' : '')}>
                    {label && <label className="ze-input-label">{label}</label>}
                    <input
                        {...rest}
                        disabled={disabled}
                        className="ze-input"
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onKeyDown={this.handleKeyDown}
                    />
                </div>
                {message && <div className="ze-input-message">{message}</div>}
            </div>
        )
    }
}
