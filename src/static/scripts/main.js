const BASEURL = "http://127.0.0.1:5000";

function scrape(){
    console.log("clicked");
    initiateAmazonScrape();
}

async function initiateAmazonScrape(){
    let search_text = document.getElementById("search_input").textContent;
    let data = await fetch(BASEURL + "/amazon?term=" + search_text)
    console.log(data)
}