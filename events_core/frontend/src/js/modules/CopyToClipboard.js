class CopyToClipboard {
  constructor() {
    this.copyBtn = document.querySelectorAll(".js-copy-clipboard")
    this.events()
  }

  events() {
    this.copyBtn.forEach(btn => {
      btn.addEventListener("click", e => this.handleClick(e))
    })
  }

  handleClick(e) {
    const btn = e.currentTarget
    const tippyLabel = btn.dataset.tippyContent

    if (document.body.createTextRange) {
      const range = document.body.createTextRange()

      range.moveToElementText(btn)
      range.select()
      range.setSelectionRange(0, 99999) /* For mobile devices */
      navigator.clipboard.writeText(range.value)
      btn._tippy.setContent("Copied!")
      btn._tippy.show()
      setTimeout(() => {
        btn._tippy.setContent(tippyLabel)
      }, 1000)
    } else {
      const selection = window.getSelection()
      const range = document.createRange()

      range.selectNodeContents(btn)
      selection.removeAllRanges()
      selection.addRange(range)
      navigator.clipboard.writeText(selection.focusNode.innerText)
      btn._tippy.setContent("Copied!")
      btn._tippy.show()
      setTimeout(() => {
        btn._tippy.setContent(tippyLabel)
      }, 1000)
    }
  }
}

export default CopyToClipboard
