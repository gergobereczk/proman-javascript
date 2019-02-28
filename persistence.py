import database_common

'''
import csv
import database_common


STATUSES_FILE = './data/statuses.csv'
BOARDS_FILE = './data/boards.csv'
CARDS_FILE = './data/cards.csv'

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def _read_csv(file_name):
    """
    Reads content of a .csv file
    :param file_name: relative path to data file
    :return: OrderedDict
    """
    with open(file_name) as boards:
        rows = csv.DictReader(boards, delimiter=',', quotechar='"')
        formatted_data = []
        for row in rows:
            formatted_data.append(dict(row))
        return formatted_data

def _get_data(data_type, file, force):
    """
    Reads defined type of data from file or cache
    :param data_type: key where the data is stored in cache
    :param file: relative path to data file
    :param force: if set to True, cache will be ignored
    :return: OrderedDict
    """
    if force or data_type not in _cache:
        _cache[data_type] = _read_csv(file)
    return _cache[data_type]
    '''


'''def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)'''


@database_common.connection_handler
def get_statuses(cursor):
    cursor.execute("""
                        SELECT * FROM statuses;
                        """)
    statues = cursor.fetchall()
    return statues


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute("""
                            SELECT * FROM boards;
                            """)
    boards = cursor.fetchall()
    return boards


@database_common.connection_handler
def get_cards(cursor):
    cursor.execute("""
                                SELECT * FROM cards;
                                """)
    cards = cursor.fetchall()
    return cards


@database_common.connection_handler
def get_all_statuses_and_cards_for_board(cursor, board_id_):
    cursor.execute("""
        SELECT boards.title ,statuses.id ,
        statuses.title , cards.id , cards.title 
        FROM boards
        JOIN statuses ON boards.id = statuses.boards_id
        JOIN cards  on statuses.id = cards.status_id
        WHERE statuses.boards_id = %(board_id_)s AND cards.status_id = statuses.id AND cards.board_id = boards.id;
                                    """, {'board_id_': board_id_})
    info = cursor.fetchall()
    return info


@database_common.connection_handler
def get_all_cards_for_status(cursor, status_id_):
    cursor.execute("""
           SELECT statuses.title , cards.id , cards.title 
           FROM statuses
           JOIN cards on statuses.id = cards.status_id
           WHERE statuses.id=%(board_id_)s AND cards.status_id = statuses.id;
                                       """, {'status_id_': status_id_})
    info = cursor.fetchall()
    return info


@database_common.connection_handler
def get_all_boards_width_all_elements(cursor):
    cursor.execute("""
           SELECT boards.id AS "Board_id", boards.title AS "Boards_title",
           CASE WHEN (statuses.id) IS NULL THEN '0' ELSE statuses.id END AS "statuses_id",
           CASE WHEN statuses.title IS NULL THEN 'No Data' ELSE statuses.title END AS "Statues_title",
           CASE WHEN (cards.id) IS NULL THEN '0' ELSE cards.id END AS "Card_id",
           CASE WHEN(cards.title) IS NULL THEN 'No Data' ELSE cards.title END AS "Card_title"
           FROM boards
           LEFT JOIN statuses ON boards.id = statuses.boards_id
           LEFT JOIN cards  on boards.id = cards.board_id;
                                          """)
    info = cursor.fetchall()
    return info

# Updates the position for a card in the database


@database_common.connection_handler
def update_card_position(cursor, card_id_, new_status):
    cursor.execute("""
        UPDATE  cards     
        SET status_id = %(new_status)s
        WHERE id = %(card_id_)s
                                    """, {'new_status': new_status, "card_id_": card_id_})



@database_common.connection_handler
def check_login_data(cursor, username):
    cursor.execute("""
                    SELECT username, password FROM users_table
                    WHERE username=%(username)s;
    """, {'username': username})

    login_info = cursor.fetchall()

    return login_info


@database_common.connection_handler
def add_user(cursor, username, password):
    cursor.execute("""
                    INSERT INTO users_table (username, password) 
                    VALUES (%(username)s, %(password)s); 
                    """,
                   {'username': username, 'password': password})

    cursor.execute("""
                    SELECT username, password
                    FROM users_table
                    WHERE username=%(username)s;
                    """,
                   {'username': username})

    user = cursor.fetchone()

    return user

