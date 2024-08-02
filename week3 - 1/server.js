const express = require('express');
const path = require('path');
const app = express();
const port = 3040;

// Serve static files from the Public directory
app.use(express.static(path.join(__dirname, 'Public')));

app.get('/calculate', (req, res) => {
    const { num1, num2, operation } = req.query;
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    let result;

    if (isNaN(number1) || isNaN(number2)) {
        res.send('Invalid numbers');
        return;
    }

    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 !== 0) {
                result = number1 / number2;
            } else {
                result = 'Cannot divide by zero';
            }
            break;
        default:
            result = 'Invalid operation';
    }

    res.send(result.toString());
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});