const fs = require("fs");
const path = require("path");

const generateCell = () => Math.random() > 0.5 ? 0 : 1;

const generateLine = len => new Array(len).fill().map(generateCell);

const getNextIteration = field => {
    new_field = [];

    for (let i = 0; i < field.length; i++) {
        line = field[i].map((value, j) => {
            let neighbours = 0;

            for (let dx = -1; dx <= 1; dx++) {
                if (!(i + dx >= 0 && i + dx < field.length)) continue;
                for (let dy = -1; dy <= 1; dy++) {
                    if (!(j + dy >= 0 && j + dy < field[i].length)) continue;
                    if (dx === 0 && dy === 0) continue;
                    neighbours += field[i + dx][j + dy];
                }
            }

            return (value && (2 <= neighbours && neighbours <= 3)) || (!value && neighbours === 3) ? 1 : 0;
        });

        new_field.push(line);
    }

    return new_field;
};

const frame = field => {
    console.clear();
    for (let i = 0; i < field.length; i++) {
        console.log("".concat(...field[i].map(value => value ? "*" : ".")));
    }   

    field = getNextIteration(field);

    setTimeout(() => frame(field), 1000);
};

const init = () => {
    let field = new Array(5).fill().map(() => generateLine(5));
    frame(field);
};

init();