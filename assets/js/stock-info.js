let storedSymbol, searchedSymbol, mySymbol
storedSymbol = sessionStorage.getItem('dataStored')
searchedSymbol = sessionStorage.getItem("searchItem")

if (searchedSymbol != null) {
    mySymbol = searchedSymbol
} else if (searchedSymbol == null && storedSymbol != null) {
    mySymbol = storedSymbol
} else {
    mySymbol == "AAPL"
}

function parseData(stock, callback) {
    fetch(
        `https://sandbox.iexapis.com/stable/stock/${stock}/chart/3m?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`
    ).then(responseMain => responseMain.json()).then(allInfo => {
        callback(allInfo, stock)
    })
}
parseData(mySymbol, chartFunction)

function chartFunction(data, symbol) {
    $(function () {
        var chart = $("#zoomedChart").dxChart({
            title: symbol + " Stock Prices",
            dataSource: data,
            valueAxis: {
                valueType: "numeric"
            },
            margin: {
                right: 10
            },
            argumentAxis: {
                grid: {
                    visible: true
                },
                label: {
                    visible: true
                },
                valueMarginsEnabled: false,
                argumentType: "date"
            },
            tooltip: {
                enabled: true
            },
            legend: {
                visible: false
            },
            series: [{
                type: "candleStick",
                openValueField: "open",
                highValueField: "high",
                lowValueField: "low",
                closeValueField: "close",
                argumentField: "date",
                aggregation: {
                    enabled: true
                }
            }],
            crosshair: {
                enabled: true,
                label: {
                    visible: true
                }
            },
            argumentAxis: {
                workdaysOnly: true,
                workWeek: [1, 2, 3, 4, 5]
            }
        }).dxChart("instance");
        $("#range-selector").dxRangeSelector({
            size: {
                height: 120
            },
            dataSource: data,
            chart: {
                valueAxis: {
                    valueType: "numeric"
                },
                series: {
                    type: "line",
                    valueField: "open",
                    argumentField: "date",
                    aggregation: {
                        enabled: true
                    }
                }
            },
            scale: {
                minorTickInterval: "day",
                tickInterval: "month",
                valueType: "datetime",
                aggregationInterval: "week",
                placeholderHeight: 20
            },
            behavior: {
                callValueChanged: "onMovingComplete",
                snapToTicks: false
            },
            onValueChanged: function (e) {
                chart.getArgumentAxis().visualRange(e.value);
            }
        });
    });
    companyInfo(symbol)
}

function companyInfo(stock) {
    fetch(
        `https://sandbox.iexapis.com/stable/stock/${stock}/company?token=Tpk_4aa9dbaa5e0d48d497c96a35ce0d7493`
    ).then(responseMain => responseMain.json())
        .then(allInfo => {
        let companyInfo = document.getElementById("company-information")
        companyInfo.innerHTML =
            `
                    <h2><b>${allInfo.companyName}</b>     
                    <h3>(${allInfo.symbol})</h3>
                    </h2>
                    <span>
                    <p>Company Summary: ${allInfo.description}</p>
                    <span>Website: ${allInfo.website}</span>
                    <p>Address: ${allInfo.address} ${allInfo.city}, ${allInfo.state}, ${allInfo.country}</p>
                    </span>
                    <button type="button" class="btn btn-dark" onclick='addToWatchlist("${mySymbol}")'>
                        Add to WatchList
                        <img src="/images/plus-square.svg" alt="" width="32" height="32" title="Bootstrap">
                        </button>
            `
    })
}
companyInfo(mySymbol)