import os
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getLastName/<firstName>')
@cross_origin()
def get_last_name(firstName):
    if firstName == "Abhay":
        successM = {"name": "Samant", "code": 200}
        return jsonify(successM), 200
    # Added my name as well to double check that the function worked
    elif firstName == "Shruthi":
        successM = {"name": "Sundaranand", "code": 200}
        return jsonify(successM), 200
    else:
        errorM = {"error": "User not found", "code": 404}
        return jsonify(errorM), 404

@app.route('/')
@cross_origin()
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=80)
