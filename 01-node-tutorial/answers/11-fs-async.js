// const { readFile, writeFile } = require('fs')

// console.log('start')
// readFile('./content/first.txt', 'utf8', (err, result) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   const first = result
//   readFile('./content/second.txt', 'utf8', (err, result) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     const second = result
//     writeFile(
//       './content/result-async.txt',
//       `Here is the result : ${first}, ${second}`,
//       (err, result) => {
//         if (err) {
//           console.log(err)
//           return
//         }
//         console.log('done with this task')
//       }
//     )
//   })
// })
// console.log('starting next task')

const { writeFile } = require("fs");
console.log("at start");

writeFile("./content/temporary/fileB.txt", "This is line 1\n", (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    writeFile("./content/temporary/fileB.txt", "This is line 2\n", { flag: 'a' } ,(err, result) => {
      console.log("at point 2");
      if (err) {
        console.log("This error happened: ", err);
      } else {
        writeFile("./content/temporary/fileB.txt", "This is line 3\n", { flag: 'a' } ,(err, result) => {
          console.log("at point 3");
          if (err) {
            console.log("This error happened: ", err);
          } else {
            console.log('Assignment is complete')
          }
        });
      }
    });
  }
});

console.log("at end");
