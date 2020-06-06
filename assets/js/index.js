const txtSearch = document.getElementById("txtSearch")
const btnSearch = document.getElementById("btnSearch")


btnSearch.addEventListener("click", () => {
    sessionStorage.setItem("searchItem", txtSearch.value)
    let mySymbol = sessionStorage.getItem("searchItem")
    console.log(mySymbol)
    location.href = "/stock-info.html"
})