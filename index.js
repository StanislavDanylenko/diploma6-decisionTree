const express = require('express')
const app = express()
const port = 3001

const DecisionTree = require('decision-tree');

const FILE_NAME = 'data.csv';
const EOL = '\n';
var writer;


var training_data = [];
var test_data = [];

const class_name = "clazz";
const features = [];

var DT;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/predict', (req, res) => {
    let num = req.query.num;
    var predicted_class = DT.predict(test_data[num]);
    res.send(predicted_class)
})

app.get('/evaluate', (req, res) => {
    console.log(test_data.length);
    console.log(test_data[0]);
    var accuracy = DT.evaluate(test_data);
    res.send('' + accuracy)
})


app.get('/train', (req, res) => {
    console.log(training_data.length);
    // console.log(training_data);
    console.log(features.length);
    // console.log(features);

    DT = new DecisionTree(training_data, class_name, features);
    console.log('Trained.');
    res.send('Trained.')
})

app.listen(port, () => {
    calculateFeatures();
    read('data.csv', training_data, false);
    read('data-test5.csv', test_data, true);
    console.log(`Example app listening at http://localhost:${port}`)
})

calculateFeatures = () => {
    for (let i = 0; i < 450; i++) {
        features.push('time' + i)
    }
    features.push('clazz');
}

read = (filename, dataset, skipLast) => {
    let lineReader = require('readline').createInterface({
                                                             input: require('fs').createReadStream(filename)
                                                         });

    lineReader.on('line', function (line) {
        let values = line.split(',');
        let len = 451;
        if (len !== values.length) {
            throw new Error("Wrong line length");
        }
        let obj = {};
        for (let i = 0; i < len - 1; i++) {
            obj[`time${i+1}`] = values[i];
        }
        if (!skipLast) {
            obj['clazz'] = values[len - 1];
        }

        dataset.push(obj);
    });
}

// config:
// npm install decision-tree
// npm i -s csv-parser