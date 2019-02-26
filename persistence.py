import database_common

'''
import csv

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
    boards = cursor.fetchall()
    return

