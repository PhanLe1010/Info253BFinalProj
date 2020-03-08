# Libraries/Frameworks
1. back-end server: flask <br>
    To provide endpoint APIs.
2. database: sqlite3 <br>
    To persist data
3. front-end ui: angular9 and angular-material-design
4. NLTK library <br>
    To extract stem words and stopwords

# Overview of your solution
* When user navigate to home page, a form will be displayed. user select a file using the front-end ui. The UI reads the .txt file and sends the content to back-end api.

* On the back-end, if it is the first time use access the server, a new user_id will be generated and sorted inside table `user` in database. The back-end send back a json response contains `(title, original_content, top_25_words, user_id)`. The UI render webpage using the result and save `user_id` to local_storage. 

* When use navigate to history page, UI will read `user_id` from local_storage and send request to back-end api. back-end will fetch the 10 most recently analysises and return a JSON response. Front-end will render the UI using the reponse.


# Prerequisite
require: python3, nodejs v12.0.0, sqlite3

# Set up Flask server
1. cd into back_end folder 
    ```
    cd back_end
    ```
1. Create an virutal environment
    ``` 
    python3 -m venv venv 
    ```
1. Activate the environment
    ```
    . venv/bin/activate
    ```
1. Install dependencies
    ```
    pip install -r requirements.txt
    ```
1. export the flask server
    ```
    export FLASK_APP=flaskr
    export FLASK_ENV=development
    ```
1. Initialize the Database File
    ```
    flask init-db
    ```
1. start flask server
    ```
    flask run
    ```

# Set up Angular cli server
1. open a new terminal and cd into front_end/word-analysis-app folder 
    ```
    cd front_end/word-analysis-app
    ```
1. Install dependencies
    ```
    npm install
    ```
1. start angular cli server
    ```
    ng serve
    ```
1. open the front-end app in brower
    ```
    http://localhost:4200/
    ```