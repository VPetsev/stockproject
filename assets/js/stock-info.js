let mySymbol = sessionStorage.mySymbol
parseData(mySymbol, 'chart', testFunction)

function parseData(stock, type, callback) {
    fetch(`https://sandbox.iexapis.com/stable/stock/${stock}/batch?types=news,chart&range=3m&last=5&token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
        .then(responseMain => responseMain.json())
        .then(allInfo => {
            const typeOfData = allInfo[`${type}`]
            callback(typeOfData, stock)
        })
}

function testFunction(data, symbol) {
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

function companyInfo(stock, callback){
    fetch(`https://sandbox.iexapis.com/stable/stock/${stock}/company?token=Tsk_f505cc8d1a8e429e9f06fc365bb67dbb`)
        .then(responseMain => responseMain.json())
        .then(allInfo => {
            console.log(allInfo)
                        text = `
                    <h2><b>${allInfo.companyName}</b> </h2><h3> ${allInfo.symbol}</h3>
                    <span>
                        <p>${allInfo.description}</p>
                        <span>${allInfo.website}</span>
                    </span>`
            callback(allInfo, text)
})
}

companyInfo(mySymbol, drawerFunction)

function drawerFunction(allInfo, text){
    console.log(allInfo, text)
    $(function () {
    $("#content").html(text);

    var drawer = $("#drawer").dxDrawer({
        opened: false,
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
}