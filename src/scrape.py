import mechanize
browser = mechanize.Browser()
browser.addheaders = [('User-agent', 'FireFoxBrowser')]
browser.open("https://www.amazon.com")
browser.select_form(name="site-search")
browser["field-keywords"] = "spiderman ps4 game of the year edition"
search_result_page = browser.submit()
print(search_result_page)