import { observable, action } from 'mobx'


export default class StyleStore {
  @observable defaultStyle = {
    text: {
      fontSize: '14px',
      color: '#333',
      textAlign: 'left',
      padding: '10px 20px',
      display: 'inline-block',
    },
    button: {
      color: '#fff',
      fontSize: '14px',
      width: '80px',
      height: '30px',
      background: '#3af',
      border: 'none',
      borderRadius: '4px',
      margin: 0,
    },
    image: {
      width: 'auto',
      height: 100,
    },
    cell: { width: 400 },
    row: { height: 100 },
  }

  @action
  updateDefault = (type, updated) => {
    const currentStyle = this.defaultStyle[type]
    this.defaultStyle[type] = { ...{ currentStyle }, ...updated }
  }
}

