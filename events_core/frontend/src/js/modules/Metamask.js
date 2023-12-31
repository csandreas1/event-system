import detectEthereumProvider from "@metamask/detect-provider"

class Metamask {
  constructor() {
    this.walletIcon = document.querySelectorAll(".js-wallet")
    this.walletModal = document.querySelector("#walletModal")
    this.events()
    this.detectMetamask()
  }

  events() {
    this.walletIcon.forEach(wallet => {
      wallet.addEventListener("click", e => this.iconOnClick(e))
    })
  }

  iconOnClick(e) {
    e.preventDefault()

    if (!this.walletConnected) {
      console.log("Please install MetaMask!")
    } else {
      console.log("Ethereum successfully detected!")
      this.walletIcon.forEach(wallet => {
        wallet.removeAttribute("data-bs-toggle")
        wallet.removeAttribute("data-bs-target")
      })

      try {
        ethereum.request({ method: "eth_requestAccounts" }).then(this.handleAccountChanged)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async handleAccountChanged() {
    const accounts = await ethereum.request({ method: "eth_accounts" })
    console.log(accounts)
  }

  async detectMetamask() {
    const provider = await detectEthereumProvider({ silent: true })

    if (provider) {
      this.walletConnected = true
      this.walletIcon.forEach(wallet => {
        wallet.removeAttribute("data-bs-toggle")
        wallet.removeAttribute("data-bs-target")
      })
    } else {
      this.walletConnected = false
    }
  }
}

export default Metamask
