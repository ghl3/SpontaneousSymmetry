
from flask import request, jsonify
from flask import Blueprint

from alphafour import ai
from alphafour import ConnectFour as cf

ConnectFour = Blueprint('connectfour', __name__, template_folder='templates')

AI = ai.load_model('/Users/George/Projects/ConnectFour/models/gen2-cov2d_beta_2017_11_05_114919', greedy=True)


class NextMove(object):

    def __init__(self, col_to_play, outcome_after_move=None, errors=None):
        self.col_to_play = col_to_play
        self.outcome_after_move = outcome_after_move
        self.errors = errors

    def to_dict(self):
        return {'col_to_play': self.col_to_play,
                'outcome_after_move': self.outcome_after_move,
                'errors': self.errors}


@ConnectFour.route('/next-move', methods=['POST'])
def next_move():
    """
    Takes a connect-four board in column-oriented style as well as the symbols for the current and prevous players and
    returns the index of the column into which the next piece should be played, as well as any result or

    :param board: A connect-four board as a list of list, in style: row[col][row].
    :paramm current_turn_player: The string symbol for the current player's pieces in the board
    :param previous_turn_player: The sring symbol for the previous player's pieces in the board
    :return:
    """

    json_body = request.get_json()
    board = json_body['board']
    current_player = json_body['current_player']
    previous_player = json_body['previous_player']
    board = convert_board(board)

    return jsonify(get_next_move(board, current_player, previous_player).to_dict())


def get_next_move(board, current_player, previous_player):
    if cf.is_tie(board):
        return NextMove(None, 'TIE', 'GAME_IS_COMPLETE')
    elif cf.is_winner(board, current_player):
        return NextMove(None, 'CURRENT_PLAYER_WINNER', 'GAME_IS_COMPLETE')
    elif cf.is_winner(board, previous_player):
        return NextMove(None, 'PREVIOUS_PLAYER_WINNER', 'GAME_IS_COMPLETE')

    col_to_place = AI.get_move(board, current_player)
    board = cf.play(board, col_to_place, current_player)

    if cf.is_tie(board):
        return NextMove(col_to_place, 'TIE')
    elif cf.is_winner(board, current_player):
        return NextMove(col_to_place, 'CURRENT_PLAYER_WINNER')
    elif cf.is_winner(board, previous_player):
        return NextMove(col_to_place, 'PREVIOUS_PLAYER_WINNER')
    else:
        return NextMove(col_to_place)


def convert_board(board, num_rows=6, num_columns=7):
    # Ensure that the board is full

    if len(board) != num_columns:
        raise Exception("Invaid number of columns")

    for col in board:
        while len(col) < num_rows:
            col.append(None)

    return board
