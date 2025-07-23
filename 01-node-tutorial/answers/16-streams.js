const { createReadStream } = require('fs')

// Creating a readable stream from a file
const stream = createReadStream('../content/big.txt', {
    encoding: 'utf8',
    highWatermark: 200
})

let counter = 0;
// Events for readable streams

stream.on('data', (result) => {
    counter++;
    console.log(`Received ${result.length} bytes of data.`);
    console.log(result);
  });

  stream.on('end', () => {
    console.log(`Total count of chunks: ${counter}`);
  });

  stream.on('error', (err) => {
    console.error('Error reading from stream:', err);
  });