import { observable, action } from 'mobx'

const defaultContent = {
  type: 'canvas',
  width: 700,
  height: 700,
  path: '/',
  content: {}
}

export default class CanvasStore {
  @observable title = ''
  @observable name = ''
  @observable content = JSON.parse(window.localStorage.getItem('edmContent')) || defaultContent
  @observable history = []
  @observable currentSelect = this.find('/')

  find = path => {
    const posArr = path.split('/')
    let content = this.content
    posArr.forEach(pos => {
      if (pos) {
        content = content.content[pos]
      }
    })

    return content
  }

  findParent = path => this.find(path.split('/').slice(0, -1).join('/'))

  @action
  select = path => {
    return this.currentSelect = this.find(path)
  }

  @action
  update = (updated, path) => {
    const content = path ? this.find(path) : this.currentSelect

    for (const key in updated) {
      if (key === 'content') {
        for (const key in updated.content) {
          content.content[key] = updated.content[key]
        }
      } else {
        content[key] = updated[key]
      }
    }
    this.save()
  }

  @action
  remove = path => {
    const factPath = path || this.currentSelect.path
    const parent = this.findParent(factPath)
    const originContent = parent.content
    parent.content = {}
    for (const key in originContent) {
      if (originContent[key].path !== factPath) {
        parent.content[key] = originContent[key]
      }
    }
    this.select(parent.path)
    this.save()
  }

  @action
  insertContent = (content, path) => {
    const select = path ? this.find(path) : this.currentSelect
    const randomID = Number(new Date())
    content.path = `${select.path === '/' ? '' : select.path}/${randomID}`

    if (!content.content) {
      content.content = {}
    }
    select.content[randomID] = content
    this.select(content.path)
    this.save()
  }

  save = () => {
    window.localStorage.setItem('edmContent', JSON.stringify(this.content))
  }
}

