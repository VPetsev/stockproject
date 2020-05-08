
let txtStock = document.getElementById("txtStock")
let searchButton = document.getElementById("searchButton")
let stockData = document.getElementById("stockData")
let mainStocks = document.getElementById("stocksMain")
let cardStocks = document.getElementById("cardStocks")

let database = firebase.database()
let rootRef = database.ref()
let watchlist = rootRef.child("Watchlist")


searchButton.addEventListener("click", function () {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${txtStock.value}&interval=5min&outputsize=full&apikey=OK4S8FFTLIRBGU4F`)
        .then(response => response.json())
        .then(x => {
            
            txtStock.value = ""
            metaData = x['Meta Data']
            dailyValues = x['Time Series (5min)']
            keyToValue2 = Object.values(dailyValues)
            info2 = keyToValue2[0]


            cardStocks.innerHTML = `<div class="card" style="width: 18rem; display: inline-block;">
            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" styles=""    border-radius: "25px 10px 0px 0px">
            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
             
                </h5>
                <p class="card-text">
                    <ul id='cardText' style="text-align: left;">
                    <button class="buttons" onclick="addToWatchlist('${symbol}')">+</button>
                    <li><b> ${metaData['2. Symbol'].toUpperCase()}</b> (Today's Latest Data) <p id="percentage" style="${stockPercentageUp() > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUp()}</p></li>
                            <p>Opening Price: ${info2['1. open']}</p>
                            <p>High: ${info2['2. high']}</p>
                            <p>Low: ${info2['3. low']}</p>
                            <p>Closing: ${info2['4. close']}</p>
                            <p>Volume: ${info2['5. volume']}</p>
                        
                    </ul>
                <a href="stock-info.html" class="btn btn-primary">See more about this stock</a>
            </div>
        </div>`
           


        })
    function stockPercentageUp() {
        let result = (info2['4. close'] - info2['1. open'])
        let result2 = parseFloat(result).toFixed(2)
        return result2
    }
    
})


//  STOCKS RAN ON HOME PAGE AUTOMATICALLY 
let stocks = ['AAPL', 'FB', 'NFLX', 'JPM', 'TWTR']

for (let i = 0; i < stocks.length; i++) {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stocks[i]}&interval=5min&outputsize=full&apikey=OK4S8FFTLIRBGU4F`)
        .then(responseMain => responseMain.json())
        .then(allStocks => {
            let metaDataEntries = allStocks['Meta Data']
            let symbol = metaDataEntries['2. Symbol']
            let pastDataEntries = allStocks['Time Series (5min)']
            let pastDataValues = Object.values(pastDataEntries)
            let mostRecentValue = pastDataValues[0]


            function stockPercentageUp() {
                let tempResult = (mostRecentValue['4. close'] - mostRecentValue['1. open'])
                let result = parseFloat(tempResult).toFixed(2)
                return result
            }

            cardStocks.innerHTML += `<div class="card" style="width: 18rem; display: inline-block;">
                                            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" border-radius: "25px 10px 0px 0px">
                                            <div class="card text-white bg-dark mb-3" style="margin-bottom: 0px!important; max-width: 18rem;">
                                                <p class="card-text">
                                                    <ul id='cardText' style="text-align: left;">
                                                    <button class="buttons" onclick="addToWatchlist('${symbol}'); window.alert('${symbol} Successfully Added to Watchlist!')" >+</button> 
                                                    <li><b> ${symbol}</b> (Today's Latest Data)<p id="percentage" style="${stockPercentageUp() > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUp()}</p></li>
                                                    
                                                    <p>Today's High: ${mostRecentValue['2. high']}</p>
                                                    <p>Today's Low: ${mostRecentValue['3. low']}</p>
                                                    <p>Recent Closing: ${mostRecentValue['4. close']}</p>
                                                    <p>Opening Price: ${mostRecentValue['1. open']}</p>
                                                    <p>Volume: ${mostRecentValue['5. volume']} Shares</p>   
                                                    </ul>
            
                                                <a href="stock-info.html" class="btn btn-primary">See more about this stock</a>
                                            </div>
                                        </div>`

        })
}

function addToWatchlist(symbol) {

    watchlist.push({
        stock: symbol
    })
    watchlist.on("value", function(snapshot){
        array = Object.values(snapshot.val())
        
        

        
    })  

}

