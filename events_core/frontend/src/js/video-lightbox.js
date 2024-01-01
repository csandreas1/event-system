class VideoLightbox {
  constructor() {
    this.videoSrc
    this.modalTrigger = document.querySelectorAll(".js-video-modal-trigger")
    this.modal = document.querySelectorAll(".js-video-lightbox")

    this.events()
  }

  events() {
    this.modalTrigger.forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault()
        this.videoSrc = e.currentTarget.getAttribute("href")
      })
    })

    this.modal.forEach(item => {
      item.addEventListener("shown.bs.modal", e => {
        const videoFrame = e.target.querySelector(".embed-responsive-item")
        videoFrame.setAttribute("src", this.videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0")
      })
    })

    this.modal.forEach(item => {
      item.addEventListener("hide.bs.modal", e => {
        const videoFrame = e.target.querySelector(".embed-responsive-item")
        videoFrame.setAttribute("src", this.videoSrc)
      })
    })
  }
}

new VideoLightbox()
