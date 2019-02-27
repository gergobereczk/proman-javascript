import persistence


'''def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')'''


'''def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_all_boards_width_all_elements()'''


def get_nested_query():     # Gets all the boards with the statuses and the cards in them
    boards = persistence.get_boards()
    statuses = persistence.get_statuses()
    cards = persistence.get_cards()
    for i in range(len(boards)):
        matching_statuses = []
        for status in statuses:
            matching_cards = []
            if status["boards_id"] == boards[i]["id"]:
                matching_statuses.append(status)
                boards[i].update({'statuses': matching_statuses})
                for card in cards:
                    if card["status_id"] == status["id"]:
                        matching_cards.append(card)
                        status.update({'cards': matching_cards})
    print(boards)
    return boards


persistence.update_card_position(1, 2)  # It's just a test for the updating


'''def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards'''

