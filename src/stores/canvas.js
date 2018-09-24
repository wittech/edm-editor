import { observable, action } from 'mobx'
import _ from 'lodash'


const randomID = () => Number(new Date()) + parseInt(Math.random()*10000)
const defaultContent = {
  type: 'canvas',
  style: {
    width: 500,
  },
  children: [],
}

export default class CanvasStore {
  @observable title = ''
  @observable name = ''
  @observable content = JSON.parse(localStorage.getItem('edmContent')) || defaultContent
  @observable content = defaultContent
  @observable history = []
  @observable currentSelect = this.find('/')
  @observable currentSelectElement = null

  find = path => {
    let select = this.content
    if (!path) return select
    const idArr = path.split('/')

    idArr.forEach(id => {
      select = select.children.find(child => child.id.toString() === id.toString()) || select
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
    path = path || this.currentSelect.path
    const idArr = path.split('/')
    const parentPath = idArr.slice(0, -1).join('/')
    const parent = this.find(parentPath)
    parent.children = parent.children.filter(child => child.path !== path)

    if (parent.type === 'row'){
      if (parent.children.length === 0){
        this.remove(parent.path)
      } else {
        this.select(parent)
      }
    }

    return this.save()
  }

  @action
  insertContent = (content, path) => {
    const select = path ? this.find(path) : this.currentSelect

    const id = randomID()
    content.path = `${select.path === '/' ? '' : select.path}/${id}`
    content.id = id
    select.children.push(content)
    this.save()
  }


  /**
   * 插入一行需要考虑，插入
   */
  @action
  insertRow = (cells, beforePath, pos) => {
    cells = cells || [12]
    const select = this.find('/')
    const rowId = randomID()
    const rowPath = rowId
    const row = {
      id: rowId,
      type: 'row',
      path: rowPath.toString(),
      children: [],
    }

    cells.forEach((cellSpan) => {
      const cellId = randomID()
      const path = `${rowPath}/${cellId}`
      const style = { width: `${100 / 12 * cellSpan}%`, minHeight: 100, textAlign: 'left' }
      row.children.push({
        id: cellId,
        type: 'cell',
        path,
        style,
        children: [],
      })
    })

    if (beforePath){
      const index = select.children.findIndex(item => item.path === beforePath)
      index === -1 && console.error('unknown path')
      index !== -1 && select.children.splice(pos === 'after' ? index+1 : index, 0, row)
    } else {
      select.children.push(row)
    }

    this.save()
  }

  @action
  moveRow = (path, toPath, pos) => {
    const rows = this.find('/').children

    let index, toIndex
    rows.forEach((row, i) => {
      if (row.path === path) {
        index = i
      }
      if (row.path === toPath) {
        toIndex = i
      }
    })
    const originRow = rows.splice(index, 1)[0]
    rows.splice(pos === 'after' ? toIndex+1 : toIndex, 0, originRow)
  }

  @action
  copy = () => {

  }

  @action
  paste = () => {

  }

  save = () => {
    console.log(_.cloneDeep(this.content))
    window.localStorage.setItem('edmContent', JSON.stringify(this.content))
  }
}

