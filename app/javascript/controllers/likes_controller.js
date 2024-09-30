import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['widget', 'doLike', 'doUnlike']
  
  connect() {
    console.log('Controller Likes')
  }

  async widgetTargetConnected(element) {
    const initiator = parseInt(element.dataset.initiator, 10)
    const currentUserId = parseInt(document.body.dataset.currentUserId, 10)
    const messageId = parseInt(element.dataset.messageId, 10)
    
    // Получаем статус лайка
    const liked = await this.checkLikeStatus(messageId)
    console.log(`Liked = ${liked}, Type: ${typeof liked}`)
    console.log(`Current_user_id = ${currentUserId}`)
    console.log(`Initiator = ${initiator}`)
    console.log(`Message_id = ${messageId}`)

    // Логика инверсии liked для текущего пользователя
    if(initiator) {
      this.liked = (initiator === currentUserId) ? !liked : liked
    }
    console.log(`Liked after === : ${liked}, Type: ${typeof liked}`)

    // Показываем кнопки в зависимости от состояния liked
    if (liked) {
      this.showDislike()
    } else {
      this.showLike()
    }
  }

  async checkLikeStatus(messageId) {
    const response = await fetch(`/messages/${messageId}/message_like`)
    const data = await response.json()
    return data.liked // Возвращаем булевое значение liked
  }

  showLike() {
    console.log('in showLike')
    console.log('-------------------------')
    this.doUnlikeTarget.remove()
    this.doLikeTarget.classList.remove('d-none')
  }

  showDislike() {
    console.log('In DisLike')
    console.log('-------------------------')
    this.doLikeTarget.remove()
    this.doUnlikeTarget.classList.remove('d-none')
  }
}