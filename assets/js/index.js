const txtSearch = document.getElementById("txtSearch")
const btnSearch = document.getElementById("btnSearch")


txtSearch.addEventListener("onclick", () => {

    loadWatchlistedStocks(txtSearch.value)
})