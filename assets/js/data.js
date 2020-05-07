var navigation = [
    { id: 1, text: "Home", icon: "home" },
    { id: 2, text: "Settings", icon: "preferences" },
    { id: 3, text: "News", icon: "group" },
    { id: 4, text: "misc...", icon: "card" },
    { id: 5, text: "misc...", icon: "chart" }
];

parseData(mySymbol, 'news', newsFunction)

function newsFunction(newsData, symbol) {
    console.log(newsData)
    let tempText = ""
    let exampleNews = document.getElementById("example-news")
    for (let i = 0; i < newsData.length; i++) {
        let news = newsData[i]
        let sum = news.summary.substring(0, 100)
        let textcontainer =
            `
            <p>
                <div class="newsContainer">
                    <div class="news-title">
                        <a href="${news.url}"><img src="${news.image}"></img></a>
                        <h3>${news.headline}</h3>
                        <h6>${news.datetime}</h6>
                    </div>
                    <span>${sum}...</span>
                    <a href="${news.url}">
                    <span>source: ${news.source} </span>
                    <span>Read More <i class="dx-icon-link"></i></a></span>
                </div>
            </p>`
        tempText += textcontainer
    }
    exampleNews.insertAdjacentHTML("beforebegin", `
        <h2>
            <b>Relevant news for ${symbol}</b>
        </h2>`
    )
    exampleNews.innerHTML += tempText
    console.log('fired')
    return tempText
}

