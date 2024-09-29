import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 'widget', 'doLike', 'doUnlike' ]
  // static outlets = [ "messages" ]
  // static values = {
  //   liked: Boolean
  // }

  connect() {
    console.log('Likes Controller JS')
  }

  async widgetTargetConnected(element) {
    
    let count = parseInt(element.dataset.count, 10);
    
    // if(count == 0) return;

    // console.log('Element:', element); // Посмотрите, что за элемент
    // console.log('Data:', element.dataset); // Выводите все data-атрибуты

    const initiator = parseInt(element.dataset.initiator, 10);
    const currentUserId = parseInt(document.body.dataset.userId, 10);
    const messageId = parseInt(element.dataset.messageId, 10);

    const liked = await this.checkLikeStatus(messageId)
    // let liked = await this.checkLikeStatus(messageId);
    console.log('Приходит от message_liked: ' + liked + typeof(liked))
    this.liked = liked;
    
    console.log('Initiator: ' + initiator + typeof(initiator))
    console.log('User: ' + currentUserId + typeof(currentUserId))
    console.log('Count:' + count + typeof(count)); 

    if(initiator) {

    if(initiator === currentUserId) {
      console.log('I change liked: ' + this.liked);
      this.liked = !this.liked;
      console.log('Liked before change: ' + this.liked);
    }
    }

    // if(initiator) {
    //   this.liked = (initiator === currentUserId) ? !liked : liked
    // }

    if(this.liked) {
      console.log('In true!!!')
      this.showDislike();
    } else {
      console.log('In false!!!')
      this.showLike();
    }

    console.log('Liked in eng method: ' + this.liked);
    console.log(count);

    console.log('-----------');
  }

  async checkLikeStatus(messageId) {
    const response = await fetch(`/messages/${messageId}/message_liked`);
    const data = await response.json();
    return data.liked
  }

  showLike() {
    this.doUnlikeTarget.remove();
    this.doLikeTarget.classList.remove('d-none');
  }

  showDislike() {
    this.doLikeTarget.remove();
    this.doUnlikeTarget.classList.remove('d-none');
  }
}