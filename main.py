from flask import Flask, render_template, url_for, request,session, redirect
from util import json_response


import json

import data_handler
import persistence

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


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


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/login/<username>/<password>")
def login(username, password):
    get_user = persistence.check_login_data(username)
    actual_password = get_user[0]['password']
    verify_pass = data_handler.verify_password(password, actual_password)
    if verify_pass is True:
        session['username'] = username
        return redirect(url_for('index'))
    else:
        return render_template('index.html')


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route("/register/<username>/<password>")
def register(username, password):
    hashed_password = data_handler.hash_password(password)
    persistence.add_user(username, hashed_password)
    return render_template('index.html')


@app.route('/dd_fetch/<place>/<card>', methods=["GET", "POST"])
def teszt11(place, card):
    print("Place id =",place,"Card id =", card)
    persistence.update_card_position(card,place)
    return "semmi"


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
