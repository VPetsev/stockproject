$(function () {
    $("#content").html(text);

    var drawer = $("#drawer").dxDrawer({
        opened: true,
        height: 400,
        closeOnOutsideClick: true,
        template: function () {
            var $list = $("<div>").width(200).addClass("panel-list");

            return $list.dxList({
                dataSource: navigation,
                hoverStateEnabled: false,
                focusStateEnabled: false,
                activeStateEnabled: false,
                elementAttr: { class: "dx-theme-accent-as-background-color" }
            });
        }
    }).dxDrawer("instance");

    $("#toolbar").dxToolbar({
        items: [{
            widget: "dxButton",
            location: "before",
            options: {
                icon: "menu",
                onClick: function () {
                    drawer.toggle();
                }
            }
        }]
    });

    $("#reveal-mode").dxRadioGroup({
        items: ["slide", "expand"],
        layout: "horizontal",
        value: "slide",
        onValueChanged: function (e) {
            drawer.option("revealMode", e.value);
        }
    });

    $("#opened-state-mode").dxRadioGroup({
        items: ["push", "shrink", "overlap"],
        layout: "horizontal",
        value: "shrink",
        onValueChanged: function (e) {
            drawer.option("openedStateMode", e.value);
            $("#reveal-mode-option").css("visibility", e.value !== "push" ? "visible" : "hidden");
        }
    });

    $("#position-mode").dxRadioGroup({
        items: ["left", "right"],
        layout: "horizontal",
        value: "left",
        onValueChanged: function (e) {
            drawer.option("position", e.value);
        }
    });
});

function parseData(stock, callback) {

    let dataSource = []
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&outputsize=full&apikey=OK4S8FFTLIRBGU4F`)
        .then(responseMain => responseMain.json())
        .then(allStocks => {
            metaData = allStocks['Meta Data']
            symbol = metaData['2. Symbol']
            dailyValues = allStocks['Time Series (5min)']
            keyToValue2 = Object.entries(dailyValues)

            for (let i = 0; i < keyToValue2.length; i++) {
                let element = keyToValue2[i]
                let object = {
                    'Date': element[0],
                    'Open': element[1]['1. open'],
                    'High': element[1]['2. high'],
                    'Low': element[1]['3. low'],
                    'Close': element[1]['4. close'],
                    'Volume': element[1]['5. volume'],
                    'Name': symbol
                }
                dataSource.push(object)
            }
            // console.log(dataSource)
            callback(dataSource, symbol)
        })
    // return dataSource
}


parseData('AAPL', testFunction)

function testFunction(data, symbol) {
    console.log(data)
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
                    visible: false
                },
                valueMarginsEnabled: false,
                argumentType: "datetime"
            },
            tooltip: {
                enabled: true
            },
            legend: {
                visible: false
            },
            series: [{
                type: "candleStick",
                openValueField: "Open",
                highValueField: "High",
                lowValueField: "Low",
                closeValueField: "Close",
                argumentField: "Date",
                aggregation: {
                    enabled: true
                }
            }]
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
                    valueField: "Open",
                    argumentField: "Date",
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
                callValueChanged: "onMoving",
                snapToTicks: false
            },
            onValueChanged: function (e) {
                chart.getArgumentAxis().visualRange(e.value);
            }
        });
    });
}
