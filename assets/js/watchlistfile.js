let searchButtonw = document.getElementById("searchButtonw")
let txtStockw = document.getElementById("txtStockw")
let cardStocksw = document.getElementById("cardStocksw")
let stockDataw= document.getElementById("stockDataw")

searchButtonw.addEventListener("click", function () {
    fetch(`https://sandbox.iexapis.com/stable/stock/${txtStockw.value}/previous?token=Tpk_4aa9dbaa5e0d48d497c96a35ce0d7493`)
        .then(response => response.json())
        .then(allInfo => {
            console.log(allInfo)

            cardStocksw.innerHTML = `<div class="card" style="width: 18rem; display: inline-block;">
            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" styles=""    border-radius: "25px 10px 0px 0px">
            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
             
                </h5>
                <p class="card-text">
                    <ul id='cardText' style="text-align: left;">
                    <button class="buttons">+</button>
                    <li><b> ${allInfo.symbol}</b> (Today's Latest Data) <p id="percentage" style="${allInfo.change > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${allInfo.change > 0 ? `+${parseFloat(allInfo.change).toFixed(2)}(${parseFloat(allInfo.changePercent).toFixed(2)}%)` : `${parseFloat(allInfo.change).toFixed(2)}(${parseFloat(allInfo.changePercent).toFixed(2)}%)`}</p></li>

                    <p>Today's High: ${allInfo.high}</p>
                    <p>Today's Low: ${allInfo.low}</p>
                    <p>Recent Closing: ${allInfo.close}</p>
                    <p>Opening Price: ${allInfo.open}</p>
                    <p>Volume: ${allInfo.volume} Shares</p>  
                    <p>Date: ${allInfo.date}</p> 
                        
                    </ul>
                    <a href="stock-info.html" style="text-align: center;">
                        <button onclick="grabInfo('${allInfo.symbol}')" class="btn btn-primary">
                            See more about this stock
                        </button>
                    </a>
            </div>
        </div>`
        })
})

for (let i = 0; i < watchListArray.length; i++) {
    fetch(`https://sandbox.iexapis.com/stable/stock/${stocks[i]}/previous?token=Tpk_4aa9dbaa5e0d48d497c96a35ce0d7493`)
        .then(responseMainw => responseMainw.json())
        .then(allStocksw => {
            let metaDataEntriesw = allStocksw['Meta Data']
            let symbolw = metaDataEntriesw['2. Symbol']
            let pastDataEntriesw = allStocksw['Time Series (5min)']
            let pastDataValuesw = Object.values(pastDataEntriesw)
            let mostRecentValuew = pastDataValuesw[0]


            function stockPercentageUpw() {
                let tempResultw = (mostRecentValuew['4. close'] - mostRecentValueww['1. open'])
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


