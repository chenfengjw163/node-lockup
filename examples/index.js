const lockup = require('node-lockup')

const task = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!(params % 9)) {
        return reject(params)
      } else {
        return resolve(params)
      }
    }, parseInt(Math.random() * 500));
  })
}

const lockTask = lockup(task)


for (let i = 0; i < 200; i++) {
  lockTask(i).then(p => {
    console.log(p)
  }, err => {
    console.error('err')
  })
}