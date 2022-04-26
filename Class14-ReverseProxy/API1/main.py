from flask import request, Flask
import json

api1 = Flask(__name__)

@api1.route('/')
def hello_world():
    return 'Hello world from API 1'

if __name__ == '__main__':
    api1.run(debug=True, host='0.0.0.0')