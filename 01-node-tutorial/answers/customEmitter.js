const { writeFile, readFile } = require("fs").promises;
const EventEmitter = require("events");
const emitter = new EventEmitter();

//Create an event handler
const myEventHandler = () => {
    const line1 = 'Learning events in node. '
        const line2 = 'And its confusing. '
        const line3 = 'But I will get it. '
         writeFile(
            '../content/temporary/event.txt',
            `I wrote so far: ${line1} ${line2} ${line3}`,
            { flag: 'a' }
        )
}
//Register an event listener
emitter.on('write', myEventHandler)

//Fire the myEventHandler event
emitter.emit('write')

const greeting = (name) => {
    console.log(`Hi, so nice to meet you ${name}`)
}

emitter.on('greet', greeting('Alex'))
emitter.emit('greet')