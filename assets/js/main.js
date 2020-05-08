let txtStockw = document.getElementById("txtStock")
let searchButtonw = document.getElementById("searchButtonw")
let stockData = document.getElementById("stockData")
let mainStocks = document.getElementById("stocksMain")
let cardStocks = document.getElementById("cardStocks")

let database = firebase.database()
let rootRef = database.ref()
let watchlist = rootRef.child("Watchlist")


searchButtonw.addEventListener("click", function () {
    fetch(`https://sandbox.iexapis.com/stable/stock/${txtStockw.value}/chart/dynamic?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
        .then(response => response.json())
        .then(allInfo => {
            // Dynamic call - How to handle different formats for after hours vs trading hours?
            console.log(allInfo)
            let symbol = txtStockw.value
            console.log(symbol)
            function stockPercentageUp(symbol) {
                let resultw = (symbol.close - symbol.open)
                let result2w = parseFloat(resultw).toFixed(2)
                return result2w
            }

            cardStocks.innerHTML = 
            `<div class="card" style="width: 18rem; display: inline-block;">
            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" styles=""    border-radius: "25px 10px 0px 0px">
            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                <p class="card-text">
                    <ul id='cardText' style="text-align: left;">
                    <button class="buttons" onclick="addToWatchlist('${symbol}')">+</button>
                    <li><b> ${symbol.toUpperCase()}</b> (Today's Latest Data) <p id="percentage" style="${stockPercentageUp(symbol) > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUp(symbol)}</p></li>
                            <p>Opening Price: ${allInfo.open}</p>
                            <p>High: ${allInfo.high}</p>
                            <p>Low: ${allInfo.low}</p>
                            <p>Closing: ${allInfo.close}</p>
                            <p>Volume: ${allInfo.volume}</p>
                    </ul>
                <a href="stock-info.html" onclick="grabInfo'${symbol}'"class="btn btn-primary">See more about this stock</a>
            </div>
        </div>`
        
           
})
})


//  STOCKS RAN ON WATCHLIST PAGE AUTOMATICALLY 
let stocks = ['AAPL', 'FB', 'NFLX']

for (let i = 0; i < stocks.length; i++) {
    fetch(`https://sandbox.iexapis.com/stable/stock/${stocks[i]}/chart/dynamic?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
        .then(response => response.json())
        .then(allInfo => {
            let symbol = stocks[i]
            let mostRecent = allInfo.data.slice(-1).pop()

            function stockPercentageUp(symbol) {
                let resultw = (symbol.close - symbol.open)
                let result2w = parseFloat(resultw).toFixed(2)
                return result2w
            }

            cardStocks.innerHTML += `<div class="card" style="width: 18rem; display: inline-block;">
                <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" border-radius: "25px 10px 0px 0px">
                <div class="card text-white bg-dark mb-3" style="margin-bottom: 0px!important; max-width: 18rem;">
                    <p class="card-text">
                        <ul id='cardText' style="text-align: left;">
                        <button class="buttons" onclick="addToWatchlist('${symbol}')" window.alert('${symbol} Successfully Added to Watchlist!')" >+</button> 
                        <li><b> ${symbol}</b> (Today's Latest Data)<p id="percentage" style="${stockPercentageUp(mostRecent) > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUp(mostRecent)}</p></li>
                        
                    <p>Today's High: ${mostRecent.high}</p>
                    <p>Today's Low: ${mostRecent.low}</p>
                    <p>Recent Closing: ${mostRecent.close}</p>
                    <p>Opening Price: ${mostRecent.open}</p>
                    <p>Volume: ${mostRecent.volume} Shares</p>  
                    <p>Date: ${mostRecent.date}</p> 
                    </ul>

                <a href="stock-info.html" style="text-align: center;><button onclick="grabInfo('${symbol}')" class="btn btn-primary">See more about this stock</button></a>
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

function grabInfo(symbol) {
    sessionStorage.mySymbol = (symbol.toString())
    console.log(symbol)
}
