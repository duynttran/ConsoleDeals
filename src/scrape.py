import mechanize
from bs4 import BeautifulSoup
browser = mechanize.Browser()
browser.set_handle_robots(False)
browser.addheaders = [('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071615 Fedora/3.0.1-1.fc9 Firefox/3.0.1')]

def scrape_amazon(search_term):
    '''Performs a search on Amazon given a search term and returns 
    the price of the first item along with a link'''
    # Input search
    browser.open("https://www.amazon.com")
    browser.select_form(name="site-search")
    browser["field-keywords"] = search_term
    result_page = browser.submit()
    # Get first result price and then open first result
    soup = BeautifulSoup(result_page, "html.parser")
    price = soup.find(attrs={"class":"a-offscreen"}).text
    first_result = "https://www.amazon.com" + soup.find(attrs={"class":"a-link-normal a-text-normal"})["href"]
    browser.open(first_result)
     # Return price and link dict
    price_link = {"price":price, "link":first_result}
    return price_link

def scrape_gamestop(search_term):
    '''Performs a search on GameStop given a search term and returns 
    the price of the first item along with a link'''
    # Input search
    browser.open("https://www.gamestop.com")
    browser.select_form(name="simpleSearch")
    browser["q"] = search_term
    result_page = browser.submit()
    # Get first result price and then open first result
    soup = BeautifulSoup(result_page, "html.parser")
    product_grid_soup = soup.find(attrs={"class":"product-grid-redesign"})
    price = product_grid_soup.find(attrs={"class":"actual-price"}).text
    first_result = "https://www.gamestop.com" + soup.find(attrs={"class":"product-tile-link"})["href"]
    browser.open(first_result)
     # Return price and link dict
    price_link = {"price":price.strip(), "link":first_result}
    return price_link

def scrape_walmart(search_term):
    '''Performs a search on Walmart given a search term and returns 
    the price of the first item along with a link'''
    # Input search
    browser.open("https://www.walmart.com")
    browser.select_form(id="global-search-form")
    browser["query"] = search_term
    result_page = browser.submit()
    # Get first result price and then open first result
    soup = BeautifulSoup(result_page, "html.parser")
    first_tile_soup = soup.find(attrs={"class":"tile-aside"})
    first_tile_soup = first_tile_soup.find(attrs={"class":"price"})
    price = first_tile_soup.find(attrs={"class":"visuallyhidden"}).text
    first_result = "https://www.walmart.com" + soup.find(attrs={"class":"product-title-link"})["href"]
    browser.open(first_result)
     # Return price and link dict
    price_link = {"price":price, "link":first_result}
    return price_link