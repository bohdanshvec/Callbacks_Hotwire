import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['widget', 'doLike', 'doUnlike']
  
  connect() {
    console.log('Controller Likes')
  }
  
  // async widgetTargetConnected(element) {
    // const initiator = parseInt(element.dataset.initiator, 10)
    // const currentUserId = parseInt(document.body.dataset.currentUserId, 10)
    // const messageId = parseInt(element.dataset.messageId, 10)
    // const likedData = element.dataset.liked
    // console.log('LIKED : ' + likedData)
    
    // Получаем статус лайка
  //   const liked = await this.checkLikeStatus(messageId)
  //   console.log(`Liked = ${liked}, Type: ${typeof liked}`)
  //   console.log(`Current_user_id = ${currentUserId}`)
  //   console.log(`Initiator = ${initiator}`)
  //   console.log(`Message_id = ${messageId}`)

  //   // Логика инверсии liked для текущего пользователя
  //   if(initiator) {
  //     this.liked = (initiator === currentUserId) ? !liked : liked
  //   }
  //   console.log(`Liked after === : ${liked}, Type: ${typeof liked}`)

  //   // Показываем кнопки в зависимости от состояния liked
  //   if (liked) {
  //     this.showDislike()
  //   } else {
  //     this.showLike()
  //   }
  // }

  // async checkLikeStatus(messageId) {
  //   const response = await fetch(`/messages/${messageId}/message_like`)
  //   const data = await response.json()
  //   return data.liked // Возвращаем булевое значение liked
  // }

  // showLike() {
  //   console.log('in showLike')
  //   console.log('-------------------------')
  //   this.doUnlikeTarget.remove()
  //   this.doLikeTarget.classList.remove('d-none')
  // }

  // showDislike() {
  //   console.log('In DisLike')
  //   console.log('-------------------------')
  //   this.doLikeTarget.remove()
  //   this.doUnlikeTarget.classList.remove('d-none')
  // }


  async widgetTargetConnected(element) {
    const initiator = parseInt(element.dataset.initiator, 10)
    const currentUserId = parseInt(document.body.dataset.currentUserId, 10)
    const messageId = parseInt(element.dataset.messageId, 10)
    const likedData = element.dataset.liked
    let isLiked;
    let count = parseInt(element.dataset.count, 10);
    console.log('COUNT : ' + count)

    if(count == 0) return;

    console.log('INPUT_LIKED : ' + likedData + typeof(likedData))

    if(likedData == 'zero') {
      console.log('In ZERO')
      isLiked = await this.checkLikeStatus(messageId)
    } else {
    isLiked = likedData === 'true'; 
    }

    console.log('LIKED : ' + isLiked + typeof(isLiked))
    console.log('INITIATOR : ' + initiator + typeof(initiator))
    console.log('CURRENT_USER_ID : ' + currentUserId + typeof(currentUserId))
    console.log('MESSAGE_ID : ' + messageId)
    console.log('---------------')
    // if(initiator) {
    // if(initiator === currentUserId) {
    //   isLiked = !isLiked;
    //   console.log('I = C :' + isLiked + typeof(isLiked))
    // }

    if (isLiked) {
      this.showDislike()
    } else {
      this.showLike()
    }
    // }
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

  async checkLikeStatus(messageId) {
    const response = await fetch(`/messages/${messageId}/message_like`)
    const data = await response.json()
    return data.liked // Возвращаем булевое значение liked
  }
}