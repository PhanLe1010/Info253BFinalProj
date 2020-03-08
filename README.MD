
libraries/frameworks you used
OS: macOS

require: python3, nodejs, angular cli

server: flask
database: sqlite
ui angular


# Set up Flask inside back-end folder
1. Create an virutal environment
    ``` 
    python3 -m venv venv 
    ```
2. Activate the environment
    ```
    . venv/bin/activate
    ```
3. Install Flask
    ```
    pip install Flask
    ```
4. Start the flask server
    ```
    $ export FLASK_APP=flaskr
    $ export FLASK_ENV=development
    $ flask run
    ```
5. Initialize the Database File
    ```
    flask init-db
    ```
6. Download nltk data. This is use to find stop word and covert stem word
    ```
    
    ```