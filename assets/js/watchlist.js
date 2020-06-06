const txtStock = document.getElementById("txtStock")
const cardStocks = document.getElementById("cardStocks")
const stockData = document.getElementById("stockData")
const searchButton = document.getElementById("searchButton")
const mainStocks = document.getElementById("stocksMain")
const infoType = document.getElementById("info-type")
const cardGroup = document.getElementById("card-group")

let userWatchlist = rootRef.child("users")

userWatchlist.on("value", function (snapshot) {
    stockArray = Object.values(snapshot.val())
    console.log('watchlist fired')
    console.log(stockArray)
    loadWatchlistedStocks(stockArray)
})

function loadWatchlistedStocks(array) {
    if (array === []) {
        // pass - call default function
    } else if (Array.isArray || typeOf(array) == (string)) {
        console.log(array)
        for (let i = 0; i < array.length; i++) {
            fetch(
                `https://sandbox.iexapis.com/stable/stock/${array[i].stock}/chart/dynamic?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`
            ).then(response => response.json()).then((allInfo) => {
                console.log(allInfo.range)
                let symbol = array[i].stock
                if (allInfo.range === '1m' || 'm1') {
                    console.log("After trading hours")
                    let allData = Object.values(allInfo)
                    cardPopulatorAfterHours(allData, symbol)
                } else if (allInfo.range === "dotya") {
                    console.log("During Trading hours")
                } else {
                    console.log("unknown range" + allInfo.range)
                }
            })
        }
    }
}

function cardPopulatorAfterHours(allData, symbol) {
    let mostRecent = allData[1].slice(-1).pop()
    fetch(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/company?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`
    ).then(response => response.json()).then((companyInfo) => {
        let text =
            `
            <div class="card">
                <img class="card-img-top" src="images/candlestick-graph-slanting-right.jpg" alt="Card image cap">
                <button type="button" class="btn btn-block btn-dark mw-100" onclick='addToWatchlist("${symbol}")'>Add to watchlist</button>
                <div class="bg-secondary card-body">
                    <h4 class="card-title">
                    ${companyInfo.companyName} <small class="card-text">(${companyInfo.symbol})</small> </h4>
                    <div class="card-body" style="border-top-left-radius: 20px; border-top-right-radius: 20px; text-align: left;">
                        <li class="list-group-item">
                            High: $${mostRecent.high}
                            <span> </span>
                        </li>
                        <li class="list-group-item">
                            Low: $${mostRecent.low}
                            <span> </span>
                        </li>
                        <li class="list-group-item">
                            Close: $${mostRecent.close}
                            <span> </span>
                        </li>
                        <li class="list-group-item">
                            Volume: ${mostRecent.volume} Units
                            <span> </span>
                        </li>
                        <li class="list-group-item">
                            Date: ${mostRecent.date}
                            <span> </span>
                        </li>
                    </div>
                </div>
                <button type="button" class="btn btn-block btn-dark mw-100 see-more text-white" onclick='seeMoreInfo("${symbol}")'>
                    See More Info
                </button>
                <div class="card-footer m-0 p-0">
                    <ul class="m-0 pb-0 pr-0 pt-0">
                        <li>
                            <small class="text-muted" style="color: black!important;">Last updated: ${mostRecent.label} ${mostRecent.date}</small>
                        </li>
                        <li class="mt-n2">
                            <small class="text-muted" style="color: black!important;"> Stock information provided by IEXCloud"</small>
                        </li>
                </div>
            </div>
                        `
        if (cardGroup != null) {
            cardGroup.innerHTML += text
        }
    })
}

function addToWatchlist(symbol) {
    let currentUser = firebase.auth().currentUser;
    console.log(currentUser.uid)
    console.log()
    firebase.database().ref('users/' + currentUser.uid).set({
        stock: symbol
    })
    firebase.database().ref("users/" + currentUser.uid).on("value", function (snapshot) {
        array = Object.values(snapshot.val())
    })
}

function seeMoreInfo(symbol) {
    sessionStorage.setItem("dataStored", symbol)
    let mySymbol = sessionStorage.getItem("dataStored")
    console.log(mySymbol)
    location.href = "/stock-info.html"
}

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