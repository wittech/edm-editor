import { observable, action } from 'mobx'
import _ from 'lodash'


const defaultContent = {
  type: 'canvas',
  path: '/',
  style: {
    width: 500, padding: 20,
  },
  content: {},
}

export default class CanvasStore {
  @observable title = ''
  @observable name = ''
  @observable content = JSON.parse(localStorage.getItem('edmContent')) || defaultContent
  @observable history = []
  @observable currentSelect = this.find('/')
  @observable currentSelectElement = null
  @observable currentDragGoal = null
  @observable currentDrag = null
  @observable dragType = 'row'
  find = path => {
    const posArr = path.split('/')
    let select = this.content
    posArr.forEach(pos => {
      if (pos) {
        select = select.content[pos]
      }
    })

    return select
  }

  findParent = path => this.find(path.split('/').slice(0, -1).join('/'))

  @action
  select = (path) => {
    this.currentSelect = this.find(path)
    this.currentSelect.dragable = 'true'
  }

  @action
  update = (updated, path) => {
    const select = path ? this.find(path) : this.currentSelect
    for (const key in updated) {
      if (typeof updated[key] === 'object') {
        for (const item in updated[key]) {
          select[key][item] = updated[key][item]
        }
      } else {
        select[key] = updated[key]
      }
    }
    this.save()
  }

  @action
  remove = path => {
    const factPath = path || this.currentSelect.path
    if (!factPath || factPath === '/') return false

    const parent = this.findParent(factPath)
    const originContent = parent.content
    parent.content = {}
    for (const key in originContent) {
      if (originContent[key].path !== factPath) {
        parent.content[key] = originContent[key]
      }
    }

    if (parent.type === 'row' && !Object.entries(parent.content).length) {
      return this.remove(parent.path)
    }

    this.select(parent.path)
    if (parent.type === 'row') {
      this.select(Object.entries(parent.content)[0][1].path)
    }

    return this.save()
  }

  @action
  insertContent = (content, path) => {
    const select = path ? this.find(path) : this.currentSelect
    const randomID = Number(new Date())
    content.path = `${select.path === '/' ? '' : select.path}/${randomID}`

    if (content.type.match(/canvas|row|cell/) && !content.content) {
      content.content = {}
    }

    select.content[randomID] = content

    if (content.type.match(/canvas|row|cell/)) {
      this.select(content.path)
    }
    this.save()
  }


  /**
   * 插入一行需要考虑，插入
   */
  @action
  insertRow = (cells) => {
    cells = cells || [12]
    const select = this.find('/')
    const randomID = Number(new Date())
    const content = {
      type: 'row',
      path: `${select.path === '/' ? '' : select.path}/${randomID}`,
      content: {},
    }

    cells.forEach((cellSpan, index) => {
      const randomID = Number(new Date()) + index
      content.content[randomID] = {
        type: 'col',
        path: `${content.path}/${randomID}`,
        style: { width: `${100 / 12 * cellSpan}%`, height: 100, textAlign: 'left' },
        content: {},
      }
    })

    select.content[randomID] = content
    this.save()
  }

  @action
  dragEnd = () => {
    const parent = this.findParent(this.currentDrag)
    const { content } = parent
    const contentArr = Object.entries(content)

    let findGoal = false
    let findDrag = false
    contentArr.forEach(([id, content], index) => {
      console.log(id)
      if (content.path === this.currentDrag) {
        findDrag = index
      }
      if (content.path === this.currentDragGoal) {
        findGoal = index
      }
    })

    const dragContent = contentArr.splice(findDrag, 1)
    contentArr.splice(findGoal, 0, dragContent[0])
    const currentContent = contentArr.reduce((pre, cur) => {
      const [id, content] = cur
      pre[id] = content

      return pre
    }, {})
    console.log(currentContent)
    parent.content = currentContent
  }

  save = () => {
    console.log(_.cloneDeep(this.content))
    window.localStorage.setItem('edmContent', JSON.stringify(this.content))
  }
}

