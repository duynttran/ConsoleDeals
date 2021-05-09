// Hide loading indicator upon landing and setup search button
const BASEURL = "http://127.0.0.1:5000";
let loading_element = document.getElementById("loading");
loading_element.style.display = "none";
let search_button_element = document.getElementById("search_button");
search_button_element.addEventListener("click", scrape);

// Initiates price scrape when search button is clicked
async function scrape(){
    let search_text = document.getElementById("search_input").value;
    if(search_text.length == 0) return;
    search_text = reformatSearch(search_text);
    loading_element.style.display = "block"; //Display loading element
    let results = [];
    results[0] = await initiateAmazonScrape(search_text);
    results[1] = await initiateGamestopScrape(search_text);
    results[2] = await initiateWalmartScrape(search_text);
    populateTable(results);
    loading_element.style.display = "none"; //Hide loading element
}

// Reformats search to be more specific and match console
function reformatSearch(search_text){
    let console_type = document.getElementById("type_select").value;
    let search = search_text + " " + console_type;
    return search;
}

// Reformats data to be in Vendor, Price, Link object property form
function reformatData(data, vendor){
    let price = data.price.toString();
    let link = data.link.toString();
    return {"Vendor":vendor, "Price":price, "Link":link};
}

// Invokes Amazon backend scraping
async function initiateAmazonScrape(search_text){
    let data = await fetch(BASEURL + "/amazon?term=" + search_text);
    try {
        data = await data.json();
    } catch (e) {
        return {"Vendor":"Amazon", "Price":"~", "Link":"~"};
    }
    return reformatData(data, "Amazon");
}

// Invokes Gamestop backend scraping
async function initiateGamestopScrape(search_text){
    let data = await fetch(BASEURL + "/gamestop?term=" + search_text);
    try {
        data = await data.json();
    } catch (e) {
        return {"Vendor":"Gamestop", "Price":"~", "Link":"~"};
    }
    return reformatData(data, "Gamestop");
}

// Invokes Walmart backend scraping
async function initiateWalmartScrape(search_text){
    let data = await fetch(BASEURL + "/walmart?term=" + search_text);
    try {
        data = await data.json();
    } catch (e) {
        return {"Vendor":"Walmart", "Price":"~", "Link":"~"};
    }
    return reformatData(data, "Walmart");
}

// Populates the results table with given array of objects formatted
// with properties Vendor, Price, and Link
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
        if(results[i]["Link"].length > 1){
            let link_element = document.createElement("a");
            link_element.href = results[i]["Link"];
            link_element.innerHTML = "Link";
            link.appendChild(link_element);
        } else {
            link.innerHTML = results[i]["Link"];
        }
    }
    current_table.parentNode.replaceChild(new_table, current_table)
}