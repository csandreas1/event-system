class Header {
  constructor() {
    this.header = document.querySelector(".js-page-header")
    if (this.header) {
      this.initStickyNavbar()
      this.events()
    }
  }

  initStickyNavbar() {
    if (window.scrollY > 0) {
      this.header.classList.add("js-page-header--is-sticky")
    } else {
      this.header.classList.remove("js-page-header--is-sticky")
    }
  }

  events() {
    window.addEventListener("scroll", e => this.initStickyNavbar(e))
  }
}

export default Header
