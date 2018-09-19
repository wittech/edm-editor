import * as React from 'react'
import { getOffsetPos } from '../../util/calc'

const dur = 300
const ns = 'http://www.w3.org/2000/svg'

const createSvgEl = (name, attr?) => {
    const el = document.createElementNS(ns, name)
    attr = attr || {}
    for (var key in attr) {
        el.setAttribute(key, attr[key])
    }
    return el
}

const createRipple = (x, y, r, fill) => {
    const svg = createSvgEl('svg')
    const circle = createSvgEl('circle', {
        cx: x,
        cy: y,
        r: 0,
        fill: fill || 'rgba(255, 255, 255, 0.4)'
    })
    const beignAnimate = createSvgEl('animate', {
        attributeName: 'r',
        to: r,
        dur: dur / 1000 + 's',
        fill: "freeze",
        begin: 'indefinite'
    })
    const endAnimate = createSvgEl('animate', {
        attributeName: 'fill',
        to: 'rgba(255, 255, 255, 0)',
        dur: dur / 1000 + 's',
        fill: "freeze",
        begin: 'indefinite'
    })
    circle.appendChild(beignAnimate)
    circle.appendChild(endAnimate)
    svg.appendChild(circle)
    return { el: svg, beginEl: beignAnimate, endEl: endAnimate }
}

const appendRipple = (wrapper, e, fill) => {
    const target = e.currentTarget

    const { top, left } = getOffsetPos(target)
    const w = target.offsetWidth
    const h = target.offsetHeight

    const x = e.clientX + window.scrollX - left
    const y = e.clientY + window.scrollY - top

    const r = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2))
        + Math.sqrt(Math.pow(w / 2 - x, 2) + Math.pow(h / 2 - y, 2))

    const ripple: any = createRipple(x, y, r, fill)
    const rippleSvg = ripple.el
    wrapper.appendChild(rippleSvg)
    ripple.beginEl.beginElement()

    const remove = () => {
        target.removeEventListener('mouseup', remove)
        ripple.endEl.beginElement()
        setTimeout(() => {
            wrapper.removeChild(rippleSvg)
        }, dur)
    }
    target.addEventListener('mouseup', remove)
}

export default class Ripple extends React.Component {
    ripples: any = React.createRef()

    createRipple = (e, fill?) => {
        const wrapper = this.ripples.current
        appendRipple(wrapper, e, fill)
    }

    render() {
        return (
            <div className="ze-ripples-group" ref={this.ripples} />
        )
    }
}

interface BlockProps { fill?: string }
export class RippleBlock extends React.Component<BlockProps & React.HTMLAttributes<HTMLDivElement>> {
    ripples: any = React.createRef()

    createRipple = (e) => {
        const wrapper = this.ripples.current
        const { fill = 'rgba(0, 0, 0, 0.2)' } = this.props
        appendRipple(wrapper, e, fill)
    }

    render() {
        const { children, ...rest } = this.props
        return (
            <div onMouseDown={this.createRipple} {...rest}>
                <div className="ze-ripples-group" ref={this.ripples} />
                {children}
            </div>
        )
    }
}
