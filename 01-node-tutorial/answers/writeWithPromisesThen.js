const { writeFile, readFile } = require("fs").promises;

const func = (text) => {
    return writeFile(
        '../content/temporary/temp.txt',
        text,
        { flag: 'a' })
}

const myFunc = () => {
    func('Start. ')
        .then(() => {
            return func('Im happy the weekend is finally here. ')
        })
        .then(() => {
            return func('And I can have some fun. ')
        })
        .then(() => {
            return func('Maybe I will go to the beach. ')
        })
        .then(() => {
            return func('Maybe I wont.')
        })
        .then(() => {
            return readFile(
                '../content/temporary/temp.txt',
                'utf8'
            )
        })
        .then((data) => {
            console.log("File content:\n", data);
        })
        .catch((error) => {
            console.log("An error occurred: ", error)
        })
}
myFunc();
