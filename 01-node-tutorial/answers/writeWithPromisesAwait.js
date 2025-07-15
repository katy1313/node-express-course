
const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    try {
        const line1 = 'Learning async functions. '
        const line2 = 'And its confusing. '
        const line3 = 'But I will get it. '
        await writeFile(
            '../content/temporary/temp.txt',
            `I wrote so far: ${line1} ${line2} ${line3}`,
            { flag: 'a' }
        )
    } catch (error) {
        console.log(error)
    }
}

const reader = async () => {
    try {
        const text = await readFile(
            '../content/temporary/temp.txt',
            'utf8'
        )
        console.log(text);
    } catch(error) {
        console.log(error)
    }
}

const readWrite = async() => {
    await writer();
    await reader();
}

readWrite();