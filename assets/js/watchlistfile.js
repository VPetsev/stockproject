let searchButtonw = document.getElementById("searchButtonw")
let txtStockw = document.getElementById("txtStockw")
let cardStocksw = document.getElementById("cardStocksw")
let stockDataw= document.getElementById("stockDataw")

searchButtonw.addEventListener("click", function () {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${txtStockw.value}&interval=5min&outputsize=full&apikey=OK4S8FFTLIRBGU4F`)
        .then(response => response.json())
        .then(x => {
            
            txtStockw.value = ""
            metaDataw = x['Meta Data']
            dailyValuesw = x['Time Series (5min)']
            keyToValue2w = Object.values(dailyValuesw)
            info2w = keyToValue2w[0]


            cardStocksw.innerHTML = `<div class="card" style="width: 18rem; display: inline-block;">
            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" styles=""    border-radius: "25px 10px 0px 0px">
            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
             
                </h5>
                <p class="card-text">
                    <ul id='cardText' style="text-align: left;">
                    <button class="buttons">+</button>
                    <li><b> ${metaDataw['2. Symbol'].toUpperCase()}</b> (Today's Latest Data) <p id="percentage" style="${stockPercentageUpw() > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUpw()}</p></li>
                            <p>Opening Price: ${info2w['1. open']}</p>
                            <p>High: ${info2w['2. high']}</p>
                            <p>Low: ${info2w['3. low']}</p>
                            <p>Closing: ${info2w['4. close']}</p>
                            <p>Volume: ${info2w['5. volume']}</p>
                    </ul>
                <a href="stock-info.html" class="btn btn-primary">See more about this stock</a>
            </div>
        </div>`
           


        })
    function stockPercentageUpw() {
        let resultw = (info2w['4. close'] - info2w['1. open'])
        let result2w = parseFloat(resultw).toFixed(2)
        return result2w
    }
    
})

for (let i = 0; i < watchListArray.length; i++) {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${watchListArray[i]}&interval=5min&outputsize=full&apikey=OK4S8FFTLIRBGU4F`)
        .then(responseMainw => responseMainw.json())
        .then(allStocksw => {
            let metaDataEntriesw = allStocksw['Meta Data']
            let symbolw = metaDataEntriesw['2. Symbol']
            let pastDataEntriesw = allStocksw['Time Series (5min)']
            let pastDataValuesw = Object.values(pastDataEntriesw)
            let mostRecentValuew = pastDataValuesw[0]


            function stockPercentageUpw() {
                let tempResultw = (mostRecentValuew['4. close'] - mostRecentValuew['1. open'])
                let resultw = parseFloat(tempResultw).toFixed(2)
                return resultw
            }

            cardStocksw.innerHTML += `<div class="card" style="width: 18rem; display: inline-block;">
                                            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" border-radius: "25px 10px 0px 0px">
                                            <div class="card text-white bg-dark mb-3" style="margin-bottom: 0px!important; max-width: 18rem;">
                                                <p class="card-text">
                                                    <ul id='cardText' style="text-align: left;">
                                                    <button class="buttons" onclick="addToWatchlist('${symbolw}')">+</button> 
                                                    <li><b> ${symbolw}</b> (Today's Latest Data)<p id="percentage" style="${stockPercentageUpw() > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUpw()}</p></li>
                                                    
                                                    <p>Today's High: ${mostRecentValuew['2. high']}</p>
                                                    <p>Today's Low: ${mostRecentValuew['3. low']}</p>
                                                    <p>Recent Closing: ${mostRecentValuew['4. close']}</p>
                                                    <p>Opening Price: ${mostRecentValuew['1. open']}</p>
                                                    <p>Volume: ${mostRecentValuew['5. volume']} Shares</p>   
                                                    </ul>
            
                                                <a href="stock-info.html" class="btn btn-primary">See more about this stock</a>
                                            </div>
                                        </div>`

        })
}


