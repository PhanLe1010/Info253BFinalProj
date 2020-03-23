# Team

1. Duy Nguyen, duy@berkeley.edu
1. Khang Nguyen,
1. Melody Yan, melodyyan@berkeley.edu
1. Phan Le, phanle@berkerley.edu
1. Xinlin Zhou,

# Overview
Build a webapp that performs word frequency analysis and spelling check on user-supplied text documents.

1. The application should accept an uploaded text document from the user, count how often each word is used in it, and report the top 25 most frequently used words via a web page.
2. In order to make the results more useful, the analysis should extract the stems of the words so that different inflections of the same word are all counted in the same bucket. To keep things simple for this exercise, please write stemming code that passes the test cases in the attached “regular stemming cases.txt” document, by converting all “equivalent forms” of listed verbs to their corresponding “stem.”
3. Exclude these common English stop words from your counts. Allow the user to decide whether to exclude stop words from their analysis.
Save the most recent 10 frequency analyses (original text, stop words setting, and resulting word frequencies), allowing the user to navigate back to view a previous analysis for comparison. These persisted analyses should survive a restart of the server process.

# Libraries/Frameworks
1. back-end server: flask <br>
    To provide endpoint APIs.
2. database: sqlite3 <br>
    To persist data
3. front-end ui: angular9 and angular-material-design
4. NLTK library <br>
    To extract stem words and stopwords

# Overview of the App
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
