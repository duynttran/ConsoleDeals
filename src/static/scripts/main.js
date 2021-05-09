const BASEURL = "http://127.0.0.1:5000";

let loading_element = document.getElementById("loading");
loading_element.style.display = "none";
let search_button_element = document.getElementById("search_button");
search_button_element.addEventListener("click", scrape);

async function scrape(){
    let search_text = document.getElementById("search_input").value;
    if(search_text.length == 0) return;
    loading_element.style.display = "block";
    let results = [];
    results[0] = await initiateAmazonScrape(search_text);
    populateTable(results);
    loading_element.style.display = "none";
}

async function initiateAmazonScrape(search_text){
    let data = await fetch(BASEURL + "/amazon?term=" + search_text);
    try {
        data = await data.json();
        let price = data.price.toString();
        let link = data.link.toString();
        data = {"Vendor":"Amazon", "Price":price, "Link":link};
    } catch (e) {
        return {"Vendor":"Amazon", "Price":"~", "Link":"~"};
    }
    return data;
}

function populateTable(results){
    let current_table = document.getElementById("price_links");
    let new_table = document.createElement('tbody');
    new_table.setAttribute("id", "price_links");
    for(var i=0; i < results.length; i++){
        let row = new_table.insertRow();
        let vendor = row.insertCell(0);
        vendor.innerHTML = results[i]["Vendor"];
        let price = row.insertCell(1);
        price.innerHTML = results[i]["Price"];
        let link = row.insertCell(2);
        let link_element = document.createElement("a");
        link_element.href = results[i]["Link"];
        link_element.innerHTML = "Link";
        link.appendChild(link_element);
    }
    current_table.parentNode.replaceChild(new_table, current_table)
}