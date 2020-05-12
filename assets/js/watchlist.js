const txtStock = document.getElementById("txtStock")
const cardStocks = document.getElementById("cardStocks")
const stockData = document.getElementById("stockData")
const searchButton = document.getElementById("searchButton")
const mainStocks = document.getElementById("stocksMain")
const infoType = document.getElementById("info-type")

// FIREBASE
const database = firebase.database()
const rootRef = database.ref()
const auth = firebase.auth()
const watchlist = rootRef.child("Watchlist")

//  ADDED WATCHLIST STOCKS
watchlist.on("value", function (snapshot) {
    newArray = Object.values(snapshot.val())
    console.log('watchlist fired')
    console.log(newArray)
    x(newArray)
})

function x(array) {
    if (array === []) {
        // pass - call default function
    } else {
        console.log(array)
        for (let i = 0; i < array.length; i++) {
            fetch(`https://sandbox.iexapis.com/stable/stock/${array[i].stock}/chart/dynamic?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
                .then(response => response.json())
                .then(allInfo => {
                    console.log(allInfo.range)
                    if (allInfo.range === '1m' || 'm1') {
                        console.log("After trading hours")
                        cardPopulatorAfterHours(allInfo.data)

                    } else if (allInfo.range === "dotya") {
                        console.log("During Trading hours")
                    } else {
                        console.log("unknown range" + allInfo.range)
                    }
                })
        }
    }
}

function cardPopulatorAfterHours(dataArr) {
    console.log(dataArr)
    let mostRecent = Object.entries(dataArr.slice(-1).pop())
    for (let i = 0; i < mostRecent.length; i++){
        console.log(mostRecent[i])
    }

}

                // function stockPercentageUp() {
                //     let tempResult = //close - open
                //     // (mostRecentValuew['4. close'] - mostRecentValuew['1. open'])
                //     // let resultw = parseFloat(tempResultw).toFixed(2)
                //     // return resultw
                // }

                // cardStocksw.innerHTML += `<div class="card" style="width: 18rem; display: inline-block;">
                //                             <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" border-radius: "25px 10px 0px 0px">
                //                             <div class="card text-white bg-dark mb-3" style="margin-bottom: 0px!important; max-width: 18rem;">
                //                                 <p class="card-text">
                //                                     <ul id='cardText' style="text-align: left;">


                //                                     <li><b> ${symbolw.toUpperCase()}</b> (Today's Latest Data)<p id="percentage" style="${stockPercentageUpw() > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUpw()}</p></li>

                //                                     <p>Today's High: ${mostRecentValuew['2. high']}</p>
                //                                     <p>Today's Low: ${mostRecentValuew['3. low']}</p>
                //                                     <p>Recent Closing: ${mostRecentValuew['4. close']}</p>
                //                                     <p>Opening Price: ${mostRecentValuew['1. open']}</p>
                //                                     <p>Volume: ${mostRecentValuew['5. volume']} Shares</p>   
                //                                     </ul>

                //                                 <a href="stock-info.html" class="btn btn-primary">See more about this stock</a>
                //                             </div>
                //                         </div>`
            // })

// function addToWatchlist(symbol) {
//     watchlist.push({
//         stock: symbol
//     })
//     watchlist.on("value", function (snapshot) {
//         array = Object.values(snapshot.val())
//     })
// }

// for (let i = 0; i < stocks.length; i++) {
//     fetch(`https://sandbox.iexapis.com/stable/stock/${stocks[i]}/chart/dynamic?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
//         .then(response => response.json())
//         .then(allInfo => {
//             let symbol = stocks[i]
//             let mostRecent = allInfo.data.slice(-1).pop()

//             function stockPercentageUp(symbol) {
//                 let resultw = (symbol.close - symbol.open)
//                 let result2w = parseFloat(resultw).toFixed(2)
//                 return result2w
//             }

//             cardStocks.innerHTML += `<div class="card" style="width: 18rem; display: inline-block;">
//                 <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" border-radius: "25px 10px 0px 0px">
//                 <div class="card text-white bg-dark mb-3" style="margin-bottom: 0px!important; max-width: 18rem;">
//                     <p class="card-text">
//                         <ul id='cardText' style="text-align: left;">
//                         <button class="buttons" onclick="addToWatchlist('${symbol}')" window.alert('${symbol} Successfully Added to Watchlist!')" >+</button> 
//                         <li><b> ${symbol}</b> (Today's Latest Data)<p id="percentage" style="${stockPercentageUp(mostRecent) > 0 ? 'color:rgb(88, 212, 88' : 'color:red'}">${stockPercentageUp(mostRecent)}</p></li>

//                     <p>Today's High: ${mostRecent.high}</p>
//                     <p>Today's Low: ${mostRecent.low}</p>
//                     <p>Recent Closing: ${mostRecent.close}</p>
//                     <p>Opening Price: ${mostRecent.open}</p>
//                     <p>Volume: ${mostRecent.volume} Shares</p>  
//                     <p>Date: ${mostRecent.date}</p> 
//                     </ul>


//                     <div>
//                         <button onclick="grabInfo('${symbol}')" class="btn btn-primary"><a href="stock-info.html" style="text-align: center;">See more about this stock</a></button>
//                     </div>

//                 </div>
//             </div>`
//         })
// }

// DELETE FUNCTION AND CLEARING WATCHLIST

// function deleteStockx() {
//     rootRefx.child("Watchlist").remove()
//     console.log("fired")
// }
// NOTE: Not added yet
// let clearWatchlist = document.getElementById("clearWatchlist")

// clearWatchlist.addEventListener("click", function () {
//     deleteStockx()
//     cardStocksw.innerHTML = ""
//     window.alert("Watchlist Sucessfully Cleared!")
// })