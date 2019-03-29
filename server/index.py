import os, json
from flask import Flask, request
app = Flask(__name__)

@app.route('/sendrres', methods=['POST'])
def processd():
    res = request.json
    data = str(res['enum']) + '  ' + str(res['phone']) + '  '
    for i in range(4):
        data = data + str(res['lowest'][i]) + '  ' + str(res['time'][i]) + '  '
    print(data)
    with open('./data-r.txt', 'a+') as f:
        f.write(data + '\n')

    return '{"code": 1}'

@app.route('/senddres', methods=['POST'])
def processr():
    res = request.json
    data = str(res['enum']) + '  ' + str(res['phone']) + '  '
    for i in range(4):
        data = data + str(res['self'][i]) + '  ' + str(res['partner'][i]) + '  ' + str(res['time'][i]) + '  '
    print(data)
    with open('./data-d.txt', 'a+') as f:
        f.write(data + '\n')

    return '{"code": 1}'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
