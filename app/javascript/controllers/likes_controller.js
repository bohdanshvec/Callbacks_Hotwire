import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 'widget', 'doLike', 'doUnlike' ]
  // static outlets = [ "messages" ]
  static values = {
    liked: Boolean
  }

  connect() {
    console.log('Likes Controller JS')
  }

  widgetTargetConnected(element) {
    
    console.log('Element:', element); // Посмотрите, что за элемент
    console.log('Data:', element.dataset); // Выводите все data-атрибуты

    const initiator = parseInt(element.dataset.initiator, 10)
    const currentUserId = parseInt(document.body.dataset.userId, 10)
    let count = parseInt(element.dataset.count, 10);
    
    if(count == 0) return;
    
    console.log('Initiator: ' + initiator + typeof(initiator))
    console.log('User: ' + currentUserId + typeof(currentUserId))
    console.log('Count:' + count + typeof(count)); 

    if(initiator === currentUserId) {
      this.likedValue = !this.likedValue
    }

    if(this.likedValue) {
      this.showDislike()
    } else {
      this.showLike()
    }

    console.log(this.likedValue)
    console.log(count)

    console.log('-----------')
  }

  showLike() {
    this.doUnlikeTarget.remove()
    this.doLikeTarget.classList.remove('d-none')
  }

  showDislike() {
    this.doLikeTarget.remove()
    this.doUnlikeTarget.classList.remove('d-none')
  }
}