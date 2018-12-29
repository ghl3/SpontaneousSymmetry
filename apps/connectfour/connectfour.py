
import datetime

from flask import render_template
from flask import abort
from flask import redirect
from flask import url_for
from flask import Blueprint

from alphafour import ai

ConnectFour = Blueprint('connectfour', __name__, template_folder='templates')


AI = ai.load_model('path/to/model', greedy=True)



class NextMove(object):

    def __init__(self, col_to_play, outcome_after_move, errors=None):

        self.col_to_play = col_to_play
        self.outcome_after_move = outcome_after_move
        self.errors = errors


@ConnectFour.route('/next-move')
def next_move(board, current_turn_player, previous_turn_player):
    """
    Takes a connect-four board in column-oriented style as well as the symbols for the current and prevous players and
    returns the index of the column into which the next piece should be played, as well as any result or

    :param board: A connect-four board as a list of list, in style: row[col][row].
    :paramm current_turn_player: The string symbol for the current player's pieces in the board
    :param previous_turn_player: The sring symbol for the previous player's pieces in the board
    :return:
    """


    return NextMove()

    d = datetime.date(int(year), int(month), 1)
    archive_dict = get_archive()
    try:
        posts = archive_dict[d]
    except KeyError:
        posts = []
    return render_template('archive.html', archive={d: posts})


@Blog.route('/archives/<index>')
def archive_index(index):
    """
    An alternative archive index for backwards
    compatability with wordpress
    """
    try:
        post = get_posts_by_index()[index]
        return redirect(url_for(".blog_post", post=post.url()))
    except KeyError:
        abort(404)


@Blog.route('/archive')
def archive_list():
    archive_dict = get_archive()
    return render_template('archive.html', archive=archive_dict)


@Blog.route('/<post>')
def blog_post(post):
    try:
        post = load_post(post)
    except KeyError:
        abort(404)
    archive_dict = get_archive(5)
    return render_template('post.html', post=post, archive=archive_dict)


@Blog.route('/')
def blog():
    post = get_latest_posts(1)[0]
    archive_dict = get_archive(5)
    return render_template('post.html', post=post, archive=archive_dict)
