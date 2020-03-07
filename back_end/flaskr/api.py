import functools
import json
# from file_worker import FileWorker 
from . import file_worker

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.exceptions import abort
from flaskr.db import get_db

bp = Blueprint('api', __name__, url_prefix='/api')

# api for processing one uploaded file
@bp.route('/new_document')
def process_new_document():
    # Extract data from the request
    title = "gone_with_the_wind.txt"
    content = "The index will show all of the posts, most recent first"
    user_id = 3

    # Process data
    file_w = file_worker.FileWorker(title, content, user_id, 1)
    file_w.get_top_ten_words()
    # Save data

    conn = get_db()
    res = conn.execute(
            'INSERT INTO analysis (user_id, title, original_text, stop_word, top_ten_words)'
            ' VALUES (?, ?, ?, ?, ?)',
            (1234, title, content, 1, "top: 10, word: 20")
    )
    conn.commit()
    print(res)

    # Build and send the response
    return 'process_new_document!'

# api for get the last 10 file analysises
@bp.route('/las_ten_files')
def last_ten_files():
    conn = get_db()
    posts = conn.execute(
    'SELECT *'
    ' FROM analysis'
    ' ORDER BY created DESC'
    ).fetchall()
    print(posts[0]['id'], posts[0]['title'], posts[0]['original_text'], posts[0]['stop_word'], posts[0]['top_ten_words'])

    return 'process_new_document!'