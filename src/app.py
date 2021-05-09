from scrape import scrape_amazon, scrape_gamestop
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

@app.route("/amazon", methods=['GET'])
def amazon_price_link():
    search_term = request.args.get('term', default='', type=str)
    data = scrape_amazon(search_term)
    return jsonify(data)

@app.route("/gamestop", methods=['GET'])
def gamestop_price_link():
    search_term = request.args.get('term', default='', type=str)
    data = scrape_gamestop(search_term)
    return jsonify(data)