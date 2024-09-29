import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [ 'message' ]

  static values = {
    user: Number
  }

  connect() {
    console.log('Messages Controller JS')
  }

  messageTargetConnected(element) {
    const actions = element.querySelector('.js-actions')
    const user = parseInt(element.dataset.user, 10)

    console.log('Bady_User: ' + parseInt(document.body.dataset.userId, 10))
    console.log('Value_user:' + this.userValue)
    console.log('Data_user:' + user)

    if(!actions || !user) return

    if(this.userValue === user) {
      actions.classList.remove('d-none')
    } else {
      actions.remove()
    }
  }

}