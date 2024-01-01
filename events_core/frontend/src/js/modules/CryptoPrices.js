const COINS = "bitcoin,ethereum,cardano,solana,xrp"
const API_URL_COINCAP = "https://api.coincap.io/v2"
const API_URL_SOCKET = "wss://ws.coincap.io"
const LIMIT = 5

class CryptoPrices {
  constructor() {
    this.cryptoPrices = document.getElementById("js-crypto-prices")
    this.pricesWs = new WebSocket(`${API_URL_SOCKET}/prices?assets=${COINS}`)
    this.fetchData()
  }

  subscribeToSocketPrices = callback =>
    (this.pricesWs.onmessage = function (msg) {
      callback(msg.data)
    })

  subsribeToUpdates = () => {
    this.subscribeToSocketPrices(newPrices => {
      const prices = this.cryptoPrices.querySelectorAll(".crypto-price")
      const pricesJSON = JSON.parse(newPrices)

      prices.forEach(element => {
        const id = element.dataset.currency
        const price = element.querySelector(".crypto-price__price")

        if (id in pricesJSON) {
          if (price.getAttribute("data-price") < pricesJSON[id]) {
            price.classList.remove("!text-red")
            price.classList.add("!text-green")
          } else if (price.getAttribute("data-price") > pricesJSON[id]) {
            price.classList.remove("!text-green")
            price.classList.add("!text-red")
          } else if (price.getAttribute("data-price") === pricesJSON[id]) {
            price.classList.remove("text-green", "text-red")
          }
          price.setAttribute("data-price", pricesJSON[id])
          price.textContent = this.formattedPrice(pricesJSON[id])
        }
      })
    })
  }

  async fetchData() {
    try {
      if (!this.cryptoPrices) return
      this.cryptoPrices.innerHTML = `<div class="p-10 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="fill-accent animate-spin"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/></svg></div>`
      const { data } = await fetch(`${API_URL_COINCAP}/assets?limit=${LIMIT}&ids=${COINS}`).then(resp => resp.json())
      this.cryptoPrices.innerHTML = ""
      this.renderData(data)
      this.subsribeToUpdates()
    } catch (error) {
      console.log("Request failed", error.message)
    }
  }

  formattedPrice = val => {
    return new Intl.NumberFormat("default", {
      style: "currency",
      currency: "USD"
    }).format(val)
  }

  formattedPriceChange = val => {
    if (isNaN(val)) {
      return "-"
    }

    const price = new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val / 100)

    if (val > 0) {
      return `<span class="text-green">${price}</span>`
    } else if (val < 0) {
      return `<span class="text-red">${price}</span>`
    }
  }

  renderData = data => {
    data.forEach((element, index) => {
      const list = `<div class="flex crypto-price items-center" data-currency=${element.id}>
        <div class="crypto-price__index hidden sm:block lg:pl-10 pl-4 w-[6%] text-sm">${index + 1}</div>
        <div class="crypto-price__coin flex w-[36%] items-center px-3 py-5">
          <img src="./img/coins/${element.symbol.toLowerCase()}.svg" alt="" width="24" height="24" class="mr-2 flex-shrink-0" />
          <div class="crypto-price__name flex-1 text-sm font-display font-semibold">
            <span class="text-jacarta-700 dark:text-white mr-3">${element.name}</span>
            <span class="text-jacarta-300">${element.symbol}</span>
          </div>
        </div>
        <div class="crypto-price__price lg:w-[16%] text-right w-[24%] px-3 py-5 text-jacarta-700 dark:text-white" data-price="${
          element.priceUsd
        }">${this.formattedPrice(element.priceUsd)}</div>
        <div class="crypto-price__volume w-1/5 hidden text-right md:block px-3 py-5">${this.formattedPrice(
          element.volumeUsd24Hr
        )}</div>
        <div class="crypto-price__change lg:w-[12%] text-right w-[16%] px-3 py-5">${this.formattedPriceChange(
          element.changePercent24Hr
        )}</div>
        <div class="crypto-price__trade w-[10%] pl-3 pr-4 py-5 text-right"><a href="#" class="rounded-full hover:bg-jacarta-700 bg-green px-5 py-2 text-white font-display font-semibold text-sm">Buy</a></div>
      </div>`
      this.cryptoPrices.insertAdjacentHTML("beforeend", list)
    })
  }
}

export default CryptoPrices
