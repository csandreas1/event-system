class Charts {
  constructor() {
    this.activityChartElement = document.getElementById("activityChart")
    this.mintsTab = document.getElementById("mints-tab")

    if (this.activityChartElement) {
      this.initActivityChart()
    }

    // Initialize chart only when the tab is shown
    if (this.mintsTab) {
      this.mintsTab.addEventListener("shown.bs.tab", () => {
        this.initAggregatorTrendChart()
      })
    }
  }

  initAggregatorTrendChart = (function() {
    let called = false

    return function() {
      if ( !called ) {
        called = true
        const charts = document.querySelectorAll(".aggregatorTrendChart")
        const labels = []
        const datapoints = []

        if (!charts) return

        function getGradient(ctx, chartArea) {
          let width, height, gradient
          const chartWidth = chartArea.right - chartArea.left
          const chartHeight = chartArea.bottom - chartArea.top
          if (!gradient || width !== chartWidth || height !== chartHeight) {
            // Create the gradient because this is either the first render
            // or the size of the chart has changed
            width = chartWidth
            height = chartHeight
            gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
            gradient.addColorStop(0, "rgb(131, 88, 255)")
            // gradient.addColorStop(0.5, 'rgb(255, 205, 86)');
            gradient.addColorStop(1, "rgb(255, 53, 104)")
          }

          return gradient
        }

        const data = {
          labels: labels,
          datasets: [
            {
              type: "line",
              pointRadius: 0,
              backgroundColor: "#8358FF",
              borderWidth: 2,
              borderColor: function (context) {
                const chart = context.chart
                const { ctx, chartArea } = chart

                if (!chartArea) {
                  // This case happens on initial chart load
                  return
                }
                return getGradient(ctx, chartArea)
              },
              data: datapoints,
              tension: 0.5
            }
          ]
        }

        const footer = tooltipItems => {
          let sum = 1
          tooltipItems.forEach(function (tooltipItem) {
            sum *= tooltipItem.parsed.y
          })
          return Intl.NumberFormat("en-US", { notation: "compact" }).format(sum) + " mints"
        }

        const config = {
          data: data,
          options: {
            maintainAspectRatio: false,
            responsive: true,
            layout: {
              padding: {
                left: -5,
                bottom: -5,
                right: 5,
                top: 5
              }
            },
            interaction: {
              intersect: false,
              mode: "index"
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  display: false
                }
              },
              y: {
                border: {
                  display: false
                },
                grid: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            },
            plugins: {
              legend: { display: false },
              decimation: {
                enabled: true
              },
              tooltip: {
                enabled: false,

                external: function (context) {
                  // Tooltip Element
                  let tooltipEl = document.getElementById("chartjs-tooltip")

                  // Create element on first render
                  if (!tooltipEl) {
                    tooltipEl = document.createElement("div")
                    tooltipEl.style.background = "#131740"
                    tooltipEl.style.color = "#ffffff"
                    tooltipEl.style.textAlign = "left"
                    tooltipEl.style.padding = "10px"
                    tooltipEl.style.borderRadius = "8px"

                    tooltipEl.id = "chartjs-tooltip"
                    tooltipEl.innerHTML = "<table></table>"
                    document.body.appendChild(tooltipEl)
                  }

                  // Hide if no tooltip
                  const tooltipModel = context.tooltip
                  if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = 0
                    return
                  }

                  // Set caret Position
                  tooltipEl.classList.remove("above", "below", "no-transform")
                  if (tooltipModel.yAlign) {
                    tooltipEl.classList.add(tooltipModel.yAlign)
                  } else {
                    tooltipEl.classList.add("no-transform")
                  }

                  // Set Text
                  if (tooltipModel.body) {
                    const titleLines = tooltipModel.title || []
                    const footerLines = tooltipModel.footer || []

                    let innerHtml = "<thead>"

                    titleLines.forEach(function (title) {
                      innerHtml += "<tr><th>" + title + "</th></tr>"
                    })

                    footerLines.forEach(function (footer) {
                      innerHtml += "<tr><th>" + footer + "</th></tr>"
                    })

                    innerHtml += "</thead>"

                    let tableRoot = tooltipEl.querySelector("table")
                    tableRoot.innerHTML = innerHtml
                  }

                  const position = context.chart.canvas.getBoundingClientRect()
                  const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont)

                  // Display, position, and set styles for font
                  tooltipEl.style.opacity = 1
                  tooltipEl.style.position = "absolute"
                  tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + "px"
                  tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + "px"
                  tooltipEl.style.font = bodyFont.string
                  tooltipEl.style.padding = tooltipModel.padding + "px " + tooltipModel.padding + "px"
                  tooltipEl.style.pointerEvents = "none"
                },

                usePointStyle: true,
                position: "nearest",
                yAlign: "bottom",
                callbacks: {
                  footer: footer
                }
              }
            },
            animation: false
          }
        }

        Chart.defaults.borderColor = "rgba(0, 0, 0, 0)"

        charts.forEach(el => {
          const datapoints = el.hasAttribute("data-datapoints") ? JSON.parse(el.dataset.datapoints) : undefined
          const labels = el.hasAttribute("data-labels") ? JSON.parse(el.dataset.labels) : undefined

          config.data.datasets[0].data = datapoints
          config.data.labels = labels
          this.aggregatorChart = new Chart(el, config)
        })
      }
    }
  })()

  initActivityChart() {
    const labels = ["Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29"]
    const data = {
      labels: labels,
      datasets: [
        {
          type: "line",
          label: "Avg. price",
          backgroundColor: "#10B981",
          borderColor: "#10B981",
          data: [54.73, 64, 53, 96, 130, 100, 102.88]
        },
        {
          type: "bar",
          label: "Sales",
          backgroundColor: "#E7E8EC",
          data: [25, 20, 40, 130, 75, 48, 12]
        }
      ]
    }

    const footer = tooltipItems => {
      let sum = 1
      tooltipItems.forEach(function (tooltipItem) {
        sum *= tooltipItem.parsed.y
      })
      return "Volume: " + Intl.NumberFormat("en-US", { notation: "compact" }).format(sum)
    }

    const config = {
      data: data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
          intersect: false,
          mode: "index"
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              stepSize: 50
            }
          }
        },
        plugins: {
          legend: { display: false },
          decimation: {
            enabled: true
          },
          tooltip: {
            usePointStyle: true,
            position: "nearest",
            backgroundColor: "#131740",
            titleAlign: "center",
            bodyAlign: "center",
            footerAlign: "center",
            padding: 12,
            displayColors: false,
            yAlign: "bottom",
            callbacks: {
              footer: footer
            }
          }
        },
        animation: false
      }
    }

    Chart.defaults.font.size = 14
    Chart.defaults.font.family = "'DM Sans', 'Helvetica', 'Arial', sans-serif"
    Chart.defaults.color = "#5A5D79"
    Chart.defaults.borderColor = "rgba(196, 197, 207, .25)"

    new Chart(this.activityChartElement, config)
  }
}

new Charts()
