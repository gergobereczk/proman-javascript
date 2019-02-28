from flask import Flask, render_template, url_for, request
from util import json_response
import persistence

import json

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_nested_query()


@app.route("/insert-card", methods=["POST", "GET"])
def insert_card():
    if request.method == "POST":
        req_data = request.get_json()
        card_dict = {
            'board_id': 1,
            'title': req_data["cardName"],
            'status_id': 1,
            'order': 1,
        }
        persistence.insert_card(card_dict)
        return 'nothing'


@app.route("/insert-board", methods=["POST", "GET"])
def insert_board():
    if request.method == "POST":
        req_data = request.get_json()
        board_dict = {
            'title': req_data["boardName"],
        }
        persistence.insert_board(board_dict)
        return 'U fool'


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
