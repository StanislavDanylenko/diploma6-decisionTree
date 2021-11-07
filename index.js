const express = require('express')
const app = express()
const port = 3001

const DecisionTree = require('decision-tree');
const fs = require('fs');
const csv = require('csv-parser');

const FILE_NAME = 'data.csv';
const EOL = '\n';
var writer;


var training_data = [];
var test_data = []; // todo fill me
const class_name = "Clazz";
const features = ["Fan1", "Fan2", "Fan3", "Fan4", "Fan5", "Fan6", "Fan7", "Fan8", "Fan9"];

var DT;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/predict', (req, res) => {
    var predicted_class = DT.predict({
                                         color: "blue",
                                         shape: "hexagon"
                                     });
    res.send(predicted_class)
})

app.get('/evaluate', (req, res) => {
    var accuracy = DT.evaluate(test_data_example);
    res.send('' + accuracy)
})

app.get('/read', (req, res) => {
    readAndProcess();
    res.send('read')
})

app.listen(port, () => {
    createFile();
    console.log(`Example app listening at http://localhost:${port}`)
})

readAndProcess = () => {
    fs.createReadStream(FILE_NAME)
        .pipe(csv())
        .on('data', (row) => {
            training_data.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            console.log(training_data);
            DT = new DecisionTree(training_data, class_name, features);
            console.log('Stop teaching');
        });
}

/////////// moved to main module

app.get('/write', (req, res) => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'class1'];

    for (let i = 0; i < 100; i++) {
        arr[0] = i;
        writer.write(
            `${arr[0]},${arr[1]},${arr[2]},${arr[3]},${arr[4]},${arr[5]},${arr[6]},${arr[7]},${arr[8]},${arr[9]}` + EOL)
    }

    res.send('wrote')
})

createFile = () => {
    writer = fs.createWriteStream(FILE_NAME, {
        flags: 'a'
    });
    writer.write(`Fan1,Fan2,Fan3,Fan4,Fan5,Fan6,Fan7,Fan8,Fan9,Clazz` + EOL)
    console.log(`File: ${FILE_NAME} created and populated by header.`)
}

// npm install decision-tree
// npm i -s csv-parser