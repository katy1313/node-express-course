const os = require("os")

const user = os.userInfo()
console.log(user)

console.log(`The System Uptime is ${os.uptime()} seconds`)

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
  machine: os.machine(),
  version: os.version()
}
console.log(currentOS)

