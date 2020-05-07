var navigation = [
    { id: 1, text: "Home", icon: "home" },
    { id: 2, text: "Settings", icon: "preferences" },
    { id: 3, text: "News", icon: "group" },
    { id: 4, text: "misc...", icon: "card" },
    { id: 5, text: "misc...", icon: "chart" }
];

parseData(mySymbol, 'news', newsFunction)
let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

function newsFunction(newsData, symbol) {
    console.log(newsData)
    let tempText = ""
    for (let i = 0; i < newsData.length; i++) {
        let news = newsData[i]
        let sum = news.summary.substring(0, 100)
        let textcontainer =
            `<h2>\
            <b>Relevant news for ${symbol}</b>\
        </h2>\
            <p>\
                <div class="newsContainer">\
                    <a href="${news.url}"<img src="${news.image}></img></a>   \
                    <div class="news-title">\
                    <h3>${news.headline}</h3>\
                        <h6>${news.datetime}</h6>\
                    </div>\
                    <span>${sum}...</span>\
                    <a href="${news.url}"><span>source: ${news.source}: Read More <i class="dx-icon-link"></i></a></span>\
                </div>\
            </p>\
            \
            `
        tempText += textcontainer
    }
    console.log('fired')
    text += tempText
    return tempText
}

console.log(text)