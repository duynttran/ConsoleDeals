# Console Deals
Console Deals is a webpage where you can search for a specific video game across multiple vendor sites and have their associated price and hyperlink delivered to you in a single location, saving you money when you purchase new games for your console!

Restructuring of Playstation-deals (https://github.com/duynttran/playstation-deals) rewritten in Python and expanded in search functionality.
Uses Python, Javascript, HTML, CSS, Mechanize, BeautifulSoup4, and Flask.

![image](https://user-images.githubusercontent.com/65418762/117588722-51bfd500-b0f3-11eb-91cf-c41ef7faad81.png)

## Supported Console Type Searches
- Playstation 4
- Playstation 5
- Xbox One
- Xbox Series X

## Supported Vendor Sites
- Amazon
- Gamestop
- Walmart
- Playstation Store (WIP)
- Microsoft Store (WIP)

## Setup
1. Install all dependencies via shell command:

    > $ pip install -r requirements.txt

2. Navigate to src directory in ConsoleDeals via terminal command:

    > cd {your directory location path}\ConsoleDeals\src

3. Run flask server via terminal command:

    > flask run
   
   NOTE: You should be in the same directory as app.py

4. CTRL + Left Click resulting URL in console or navigate to:

    > http://127.0.0.1:5000/

   in your desired browser.
