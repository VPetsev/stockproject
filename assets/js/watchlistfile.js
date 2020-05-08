let txtStockw = document.getElementById("txtStockw")
let cardStocksw = document.getElementById("cardStocksw")
let stockDataw = document.getElementById("stockDataw")

// FIREBASE
let databasex = firebase.database()
let rootRefx = databasex.ref()
let authx = firebase.auth()
let watchlist2 = rootRef.child("Watchlist")





// SEARCH FUNCTION

searchButtonw.addEventListener("click", function () {
    fetch(`https://sandbox.iexapis.com/stable/stock/${txtStockw.value}/chart/dynamic?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
        .then(response => response.json())
        .then(x => {

            txtStockw.value = ""
            metaDataw = x['Meta Data']
            symbolw = metaDataw['2. Symbol']
            dailyValuesw = x['Time Series (5min)']
            keyToValue2w = Object.values(dailyValuesw)
            info2w = keyToValue2w[0]


            cardStocksw.innerHTML = `<div class="card" style="width: 18rem; display: inline-block;">
            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" styles=""    border-radius: "25px 10px 0px 0px">
            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
             
                </h5>
                <p class="card-text">
                    <ul id='cardText' style="text-align: left;">
                    <button class="buttons" onclick="addToWatchlist('${symbolw.toUpperCase()}'); window.alert('${symbolw.toUpperCase()} Successfully Added to Watchlist!'); location.href='watchlist.html'">+</button>
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

//  ADDED WATCHLIST STOCKS
watchlist2.on("value", function (snapshot) {
    newArray = Object.values(snapshot.val())

    x(newArray)


})
function x(array) {
    for (let i = 0; i < array.length; i++) {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${array[i].stock}&interval=5min&outputsize=full&apikey=OK4S8FFTLIRBGU4F`)
            .then(responseMainw => responseMainw.json())
            .then(allStocksw => {

                let metaDataEntriesw = allStocksw['Meta Data']
                symbolw = metaDataEntriesw['2. Symbol']
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
                                                    
                                                     
                                                    <li><b> ${symbolw.toUpperCase()}</b> (Today's Latest Data)<p id="percentage" style="${stockPercentageUpw() > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUpw()}</p></li>
                                                    
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


}



// DELETE FUNCTION AND CLEARING WATCHLIST

function deleteStockx() {
    rootRefx.child("Watchlist").remove()
    console.log("fired")
}

let clearWatchlist = document.getElementById("clearWatchlist")

clearWatchlist.addEventListener("click", function () {
    deleteStockx()
    cardStocksw.innerHTML = ""
    window.alert("Watchlist Sucessfully Cleared!")
})


