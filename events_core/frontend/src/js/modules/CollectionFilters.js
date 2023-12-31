require("matchmedia-polyfill")
require("matchmedia-polyfill/matchMedia.addListener")

class CollectionFilters {
  constructor() {
    this.button = document.querySelector(".js-collections-toggle-filters")
    this.sidebar = document.querySelector(".js-collections-sidebar")
    this.content = document.querySelector(".js-collections-content")
    this.grid = document.querySelector(".js-collections-grid")
    this.mediaQuery = window.matchMedia("(max-width: 1024px)")
    this.events()
  }

  events() {
    if (this.button) {
      this.button.addEventListener("click", e => this.handleClick(e))
    }

    this.mediaQuery.addListener( e => this.handleMediaQueryChange(e));
    this.handleMediaQueryChange(this.mediaQuery);

  }

  handleMediaQueryChange(e) {
    if (e.matches) {
      this.isMobile = true
      if (this.sidebar) {
        this.sidebar.classList.add('!hidden')
      }
    } else {
      this.isMobile = false
      if (!this.sidebar) return

      if ( !this.sidebar.classList.contains('js-collections-sidebar--is-closed') ) {
        this.sidebar.classList.remove('!hidden')
        this.content.classList.remove('!w-full')
        this.grid.classList.remove('lg:grid-cols-5')
      }
    }
  }

  handleClick(e) {
		if (this.sidebar) {
			this.sidebar.classList.toggle('!hidden')
			this.sidebar.classList.toggle('js-collections-sidebar--is-closed')
		}

		if (this.content) {
      if (!this.isMobile) {
        this.content.classList.toggle('!w-full')
        this.grid.classList.toggle('lg:grid-cols-5')
      }
		}
  }
}

export default CollectionFilters