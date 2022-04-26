from flask import request, Flask
import json

api1 = Flask(__name__)

@api1.route('/')
def hello_world():
    return 'I send you a pong from API 2'

if __name__ == '__main__':
    api1.run(debug=True, host='0.0.0.0')