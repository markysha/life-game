const fs = require("fs");
const path = require("path");
const readline = require('readline');

const ALIVE_CHAR = "*";
const DEAD_CHAR = ".";

const generateCell = () => Math.random() > 0.5 ? 0 : 1;

const generateLine = len => new Array(len).fill().map(generateCell);

const generateMatrix = (n, m) => new Array(n).fill().map(() => generateLine(m));

const getNextIteration = field => {
    let new_field = [];

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
        console.log("".concat(...field[i].map(value => value ? ALIVE_CHAR : DEAD_CHAR)));
    }   

    field = getNextIteration(field);

    setTimeout(() => frame(field), 1000);
};

const init = () => {
    let field = [];

    if (process.argv.length > 2) {
        let readStream = fs.createReadStream(path.join(__dirname, process.argv[2]));
        let rl = readline.createInterface(readStream);

        rl.on("line", line => { 
            field.push(line.split("").map(c => {
                switch(c) {
                    case ALIVE_CHAR:
                        return 1;
                    case DEAD_CHAR:
                        return 0;
                    default:
                        console.log("Error unknown charachter", c, "in file"); 
                        process.exit(0);    
                }
            }));
            if (field.length > 1 && field[0].length !== field[field.length - 1].length) {
                console.log("Error lines have different length"); 
                process.exit(0); 
            }
        }).on("close", () => {
            frame(field);
        });
    } else {
        let n = Math.ceil(Math.random() * 10) + 1;
        let m = Math.ceil(Math.random() * 10) + 1;
        field = generateMatrix(n, m);
        frame(field);
    }
};

init();
