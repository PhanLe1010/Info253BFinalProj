import functools
import json
import logging
# from file_worker import FileWorker 
from . import file_worker
from flask import (
    Blueprint, flash, g, redirect, render_template, Response ,request, session, url_for
)
from werkzeug.exceptions import abort
from flaskr.db import get_db

bp = Blueprint('api', __name__, url_prefix='/api')
logging.basicConfig(level=logging.DEBUG)

# api for processing one uploaded file
@bp.route('/new_document', methods=['POST'])
def process_new_document():
    if request.headers['Content-Type'] == 'application/json':
        # Extract data from the request
        arguments = request.get_json()
        title = arguments.get('title')
        original_text = arguments.get('original_text')
        stop_word = arguments.get('stop_word')
        user_id = arguments.get('user_id')
        print("new file: <title:{} |original_text: {} |stop_word: {} |user_id: {}"\
                    .format(title, original_text, stop_word, user_id))

        # Process data
        conn = get_db()
        if not user_id:
            '''
            if the cookie is not set yet, creat a new user 
            and send the user_id along with the response
            '''
            unused_token = "unused token"
            cursor = conn.execute(
                'INSERT INTO user(token)'
                ' VALUES(?)',
                (unused_token,)
            )
            user_id = cursor.lastrowid
        conn.commit()

        file_w = file_worker.FileWorker(title, original_text, user_id, stop_word)
        top_ten_words = file_w.get_top_ten_words()

        # Save data
        conn = get_db()
        cursor = conn.execute(
                'INSERT INTO analysis (user_id, title, original_text, stop_word, top_ten_words)'
                ' VALUES (?, ?, ?, ?, ?)',
                (user_id, title, original_text, stop_word, str(top_ten_words))
        )
        conn.commit()

        # Build and send the response
        column = ['id', 'user_id', 'title', 'original_text', 'stop_word', 'top_ten_words']
        res_data = dict(zip(column, [cursor.lastrowid, user_id, title, original_text, stop_word, top_ten_words]))
        resp = Response(json.dumps(res_data), status=201, mimetype='application/json')
    else:
        status_code = 400
        print("Invalid content type: only application/json is allowed")
        resp = Response("Error", status=400)

    return resp


# api for get the last 10 file analysises
@bp.route('/las_ten_files/<user_id>', methods=['GET'])
def last_ten_files(user_id):
    # Get data from database
    user_id = int(user_id)
    print("Getting history for user_id: {}".format(user_id))
    conn = get_db()
    analysises = conn.execute(
        'SELECT *'
        ' FROM analysis'
        ' WHERE user_id = ?'
        ' ORDER BY created DESC'
        ' LIMIT 10',
        (user_id,)
        ).fetchall() 

    # Build and send the response
    column = ['id', 'user_id', 'created' ,'title', 'original_text', 'stop_word', 'top_ten_words']
    res_data = {"analysises" : [ dict(zip(column, row)) for row in analysises ] }
    # convert datetime object to string so that it is serializable
    for analysis in res_data["analysises"]:
        analysis['created'] = str(analysis['created'])
    print(res_data)
    resp = Response(json.dumps(res_data), status=200, mimetype='application/json')
    
    return resp
