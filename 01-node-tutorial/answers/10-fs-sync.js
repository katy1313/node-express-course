const { readFileSync, writeFileSync } = require('fs') //destructured method
console.log('start')
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')

writeFileSync(
  './content/result-sync.txt',
  `Here is the result : ${first}, ${second}`,
  { flag: 'a' }
)

writeFileSync(
  './content/temporary/fileA.txt',
  'Any idea why it rains so much in Florida during summer',
  { flag: 'a' },
  'Lets watch some movie',
  { flag: 'a' },
  'I like holidays',
  { flag: 'a' }
)

const mySentance = readFileSync('./content/temporary/fileA.txt', 'utf8')
console.log(mySentance)
console.log('done with this task')
console.log('starting the next one')

