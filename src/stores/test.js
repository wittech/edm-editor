import { observable, action } from 'mobx'

export default class TestStore {
    @observable count = 0

    @action
    add = () => {
      return ++this.count
    }
}
