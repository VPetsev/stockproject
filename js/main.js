let usrData = document.getElementById("usrData")
let searchButton = document.getElementById("searchButton")
let cardData = document.getElementById("cardText")
let stockData = document.getElementById("stockData")
let mainStocks = document.getElementById("stocksMain")
let cardStocks = document.getElementById("cardStocks")





    // STOCKS RAN ON THE CLICK OF SEARCH BUTTON WOKRING

searchButton.addEventListener("click", function () {
    
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${usrData.value}&interval=5min&outputsize=full&apikey=LTTSRB12RXT9ZBDH`)

        .then(response => response.json())
        .then(x => {
            usrData.value = ""
            metaData = x['Meta Data']
            dailyValues = x['Time Series (5min)']
            keyToValue2 = Object.values(dailyValues)
            info2 = keyToValue2[0]


            cardStocks.innerHTML = `<div class="card" style="width: 18rem;">
            <img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" styles=""    border-radius: "25px 10px 0px 0px">
            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
             
                </h5>
                <p class="card-text">
                    <ul id='cardText' style="text-align: left;">
                        
                    </ul>
                <a href="#" class="btn btn-primary">See more about this stock</a>
            </div>
        </div>`
            cardText.innerHTML = `<li><button class="buttons">+</button><b> ${metaData['2. Symbol'].toUpperCase()}</b> (5min Updates) <p id="percentage" style="${stockPercentageUp()>0?'color:rgb(88, 212, 88':'color:red'}">${stockPercentageUp()}</p></li>
                            <p>Opening Price: ${info2['1. open']}</p>
                            <p>High: ${info2['2. high']}</p>
                            <p>Low: ${info2['3. low']}</p>
                            <p>Closing: ${info2['4. close']}</p>
                            <p>Volume: ${info2['5. volume']}</p>
                            `


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
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stocks[i]}&interval=5min&outputsize=full&apikey=LTTSRB12RXT9ZBDH`)
        .then(responseMain => responseMain.json())
        .then(allStocks => {
            metaData = allStocks['Meta Data']
            dailyValues = allStocks['Time Series (5min)']
            keyToValue2 = Object.values(dailyValues)
            info2 = keyToValue2[0]
                usrData.value = ""

            function stockPercentageUp() {
                let result = (info2['4. close'] - info2['1. open'])
                let result2 = parseFloat(result).toFixed(2)
                return result2
                }

                cardStocks.innerHTML += `<div class="card" style="width: 18rem; display: inline-block;">
<img src="https://c1.wallpaperflare.com/preview/297/171/764/chart-trading-courses-analysis.jpg" class="card-img-top" alt="logo" styles=""    border-radius: "25px 10px 0px 0px">
<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
 
    </h5>
    <p class="card-text">
        <ul id='cardText' style="text-align: left;"> 
        <li><button class="buttons">+</button><b> ${metaData['2. Symbol'].toUpperCase()}</b> (5min Updates)<p id="percentage" style="${stockPercentageUp()>0?'color:rgb(88, 212, 88':'color:red'}">${stockPercentageUp()}</p></li>
    <p>Opening Price: ${info2['1. open']}</p>
    <p>High: ${info2['2. high']}</p>
    <p>Low: ${info2['3. low']}</p>
    <p>Closing: ${info2['4. close']}</p>
    <p>Volume: ${info2['5. volume']}</p>   
        </ul>
        
    <a href="#" class="btn btn-primary">See more about this stock</a>
</div>

    
</div>`
    
        })


}