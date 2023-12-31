class contactForm {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.submitBtn = document.getElementById("contact-form-submit")
    this.inputs = this.form.querySelectorAll(".contact-form-input")
    this.consent = this.form.querySelector("#contact-form-consent-input")
    this.message = document.getElementById("contact-form-notice")
    this.inputName = document.getElementById("name")
    this.inputEmail = document.getElementById("email")
    this.inputMessage = document.getElementById("message")
    this.events()
  }

  events() {
    this.submitBtn.addEventListener("click", e => this.submitForm(e))
  }

  submitForm(e) {
    e.preventDefault()
    const formattedFormData = new FormData(this.form)

    const submit = async () => {
      const response = await fetch("contact.php", {
        method: "POST",
        body: formattedFormData
      })
      const data = await response.json()

      if (data.info !== "error") {
        this.inputs.forEach(el => {
          el.value = ""
        })
        this.consent.checked = false

        this.message.classList.remove("alert-error", "hidden")
        this.message.classList.add("alert-success")
        this.message.textContent = data.msg

        setTimeout(() => {
          this.message.classList.add("hidden")
        }, 3000)
      } else {
        switch (data.code) {
          case "no-name":
            this.inputName.classList.add("border-red")
            this.inputName.focus()
            break

          case "no-email":
            this.inputEmail.classList.add("border-red")
            this.inputEmail.focus()
            break

          case "no-message":
            this.inputMessage.classList.add("border-red")
            this.inputMessage.focus()
            break

          case "no-consent":
            console.log(this.consent, data)
            this.consent.classList.add("border-red")
            break
        }

        this.message.classList.remove("alert-success", "hidden")
        this.message.classList.add("alert-error")
        this.message.textContent = data.msg

        setTimeout(() => {
          this.message.classList.add("hidden")
          this.inputs.forEach(el => {
            el.classList.remove("border-red")
          })
          this.consent.classList.remove("border-red")
        }, 3000)
      }
    }

    submit()
  }
}

new contactForm()
