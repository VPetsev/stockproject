let mySymbol = sessionStorage.mySymbol
parseData(mySymbol, chartFunction)

function parseData(stock, callback) {
    fetch(`https://sandbox.iexapis.com/stable/stock/${stock}/chart/3m?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
        .then(responseMain => responseMain.json())
        .then(allInfo => {
            callback(allInfo, stock)
        })
}


function chartFunction(data, symbol) {
    console.log(data, symbol)
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
                valueAxis: { valueType: "numeric" },
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
                placeholderHeight: 20
            },
            behavior: {
                callValueChanged: "onMoving",
                snapToTicks: false
            },
            onValueChanged: function (e) {
                chart.getArgumentAxis().visualRange(e.value);
            }
        });
    });
}

function companyInfo(stock) {
    fetch(`https://sandbox.iexapis.com/stable/stock/${stock}/company?token=Tpk_4aa9dbaa5e0d48d497c96a35ce0d7493`)
        .then(responseMain => responseMain.json())
        .then(allInfo => {
            let companyInfo = document.getElementById("company-information")
            console.log(allInfo)
            companyInfo.innerHTML = `
                    <h2><b>${allInfo.companyName}</b><h3>(${allInfo.symbol})</h3></h2>
                    <span>
                        <p>Company Summary: ${allInfo.description}</p>
                        <span>Website: ${allInfo.website}</span>
                        <p>Address: ${allInfo.address} ${allInfo.city}, ${allInfo.state}, ${allInfo.country}</p>
                    </span>`
        })
}
companyInfo(mySymbol)

function newsFunction(symbol) {
    fetch(`https://sandbox.iexapis.com/stable/stock/${symbol}/batch?types=news&last=5&token=Tpk_4aa9dbaa5e0d48d497c96a35ce0d7493`)
    .then(response => response.json())
    .then(allInfo => {
        let exampleNews = document.getElementById("example-news")
        allInfo.forEach(element => {
            exampleNews.innerHTML = `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${element.image}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <a href="${element.url}>
                                <h5 class="card-title">${element.headline}</h5>
                                <p class="card-text">${element.summary}</p>
                                <p class="card-text"><small class="text-muted">Published at: ${element.datetime} | From: ${element.source}</small></p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`
        })
    })
}
