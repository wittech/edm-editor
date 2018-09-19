export default function styler (style){
  Object.entries(style).forEach(item => {
    const [key, value] = item
    if (/^\d+$/.test(value)){
      style[key] = `${value}px`
    }
  })

  return style
}
