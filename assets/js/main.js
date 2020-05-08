let txtStockw = document.getElementById("txtStock")
let searchButtonw = document.getElementById("searchButton")
let stockData = document.getElementById("stockData")
let mainStocks = document.getElementById("stocksMain")
let cardStocks = document.getElementById("cardStocks")

let database = firebase.database()
let rootRef = database.ref()
let watchlist = rootRef.child("Watchlist")


searchButtonw.addEventListener("click", function () {
    fetch(`https://sandbox.iexapis.com/stable/stock/${txtStockw.value}/chart/dynamic?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
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
           


            cardStocks.innerHTML += `<div class="card" style="width: 18rem; display: inline-block;">
                                            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" border-radius: "25px 10px 0px 0px">
                                            <div class="card text-white bg-dark mb-3" style="margin-bottom: 0px!important; max-width: 18rem;">
                                                <p class="card-text">
                                                    <ul id='cardText' style="text-align: left;">
                                                    <button class="buttons" onclick="addToWatchlist('${stocks[i]}')">+</button> 
                                                    <li><b> ${stocks[i]}</b> (Today's Latest Data)<p id="percentage" style="${allInfo.change > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${allInfo.change > 0 ? `+${parseFloat(allInfo.change).toFixed(2)}(${allInfo.changePercent}%)` : `${parseFloat(allInfo.change).toFixed(2)}(${allInfo.changePercent}%)`}</p></li>
                                                    
                                                <p>Today's High: ${allInfo.high}</p>
                                                <p>Today's Low: ${allInfo.low}</p>
                                                <p>Recent Closing: ${allInfo.close}</p>
                                                <p>Opening Price: ${allInfo.open}</p>
                                                <p>Volume: ${allInfo.volume} Shares</p>   
                                                <p>Date: ${allInfo.date}</p>
                                                </ul>
            
                                                <a href="stock-info.html"><button onclick="grabInfo('${allInfo.symbol}')" class="btn btn-primary">See more about this stock</button></a>
                                            </div>
                                        </div>`
        })
})


//  STOCKS RAN ON HOME PAGE AUTOMATICALLY 
let stocks = ['AAPL', 'FB', 'NFLX']

for (let i = 0; i < stocks.length; i++) {
    fetch(`https://sandbox.iexapis.com/stable/stock/${stocks[i]}/previous?token=Tpk_4aa9dbaa5e0d48d497c96a35ce0d7493`)
        .then(response => response.json())
        .then(allInfo => {
            console.log(allInfo)

            cardStocks.innerHTML += `<div class="card" style="width: 18rem; display: inline-block;">
                                            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" border-radius: "25px 10px 0px 0px">
                                            <div class="card text-white bg-dark mb-3" style="margin-bottom: 0px!important; max-width: 18rem;">
                                                <p class="card-text">
                                                    <ul id='cardText' style="text-align: left;">
                                                    <button class="buttons" onclick="addToWatchlist('${symbol}'); window.alert('${symbol} Successfully Added to Watchlist!')" >+</button> 
                                                    <li><b> ${symbol}</b> (Today's Latest Data)<p id="percentage" style="${stockPercentageUp() > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUp()}</p></li>
                                                    
                                                <p>Today's High: ${allInfo.high}</p>
                                                <p>Today's Low: ${allInfo.low}</p>
                                                <p>Recent Closing: ${allInfo.close}</p>
                                                <p>Opening Price: ${allInfo.open}</p>
                                                <p>Volume: ${allInfo.volume} Shares</p>  
                                                <p>Date: ${allInfo.date}</p> 
                                                </ul>
            
                                            <a href="stock-info.html" style="text-align: center;><button onclick="grabInfo('${allInfo.symbol}')" class="btn btn-primary">See more about this stock</button></a>
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
