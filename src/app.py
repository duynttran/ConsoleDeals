from scrape import *
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

@app.route("/amazon", methods=['GET'])
def amazon_price_link():
    search_term = request.args.get('term', default='Red Dead Redemption 2', type=str)
    return scrape_amazon(search_term)