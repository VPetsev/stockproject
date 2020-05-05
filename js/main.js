let usrData = document.getElementById("usrData")
let searchButton = document.getElementById("searchButton")

let stockData = document.getElementById("stockData")
let mainStocks = document.getElementById("stocksMain")

searchButton.addEventListener("click", function () {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${usrData.value}&interval=5min&outputsize=full&apikey=LTTSRB12RXT9ZBDH`)

        .then(response => response.json())
        .then(x => {

            metaData = x['Meta Data']
            dailyValues = x['Time Series (5min)']
            keyToValue2 = Object.values(dailyValues)
            info2 = keyToValue2[0]



            stockData.innerHTML = `<li><button class="buttons">+</button><b> ${metaData['2. Symbol'].toUpperCase()}</b> (5min Updates)</li>
                            <p>Opening Price: ${info2['1. open']}</p>
                            <p>High: ${info2['2. high']}</p>
                            <p>Low: ${info2['3. low']}</p>
                            <p>Closing: ${info2['4. close']}</p>
                            <p>Volume: ${info2['5. volume']}</p>
                            `


        })

})

let stocks = ['AAPL', 'FB', 'NFLX', 'JPM', 'TWTR']

for (let i = 0; i < stocks.length; i++) {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stocks[i]}&interval=5min&outputsize=full&apikey=LTTSRB12RXT9ZBDH`)
        .then(responseMain => responseMain.json())
        .then(allStocks => {
            metaData = allStocks['Meta Data']
            dailyValues = allStocks['Time Series (5min)']
            keyToValue2 = Object.values(dailyValues)
            info2 = keyToValue2[0]

            mainStocks.innerHTML += `<li><button class="buttons">+</button><b> ${metaData['2. Symbol'].toUpperCase()}</b> (5min Updates)</li>
    <p>Opening Price: ${info2['1. open']}</p>
    <p>High: ${info2['2. high']}</p>
    <p>Low: ${info2['3. low']}</p>
    <p>Closing: ${info2['4. close']}</p>
    <p>Volume: ${info2['5. volume']}</p>
    `
        })


}