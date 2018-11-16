# node-lockup

## 介绍

node端的简单异步锁，node没有线程概念并且处理请求时所有IO操作都是异步的，在部分场景下我们需要让这些IO操作排队执行。

类似于C#中的lock和java中的sychronized的对象锁，`node-lockup`的实现方式是利用数组实现一个简单的队列，通过用户调用触发排队自执行。

所有请求排队执行，执行速度取决于task函数执行速度，面对高并发请求时会产生大量请求等待，谨慎使用。

## 示例


``` javascript
const lockup = require('node-lockup')

const task = (params) => { // 需要排队执行的异步函数
  return new Promise((resolve, reject) => {
    /// some I/O operating
    resolve(data) 
  })
}

const lockTask = lockup(task) // 创建排队执行函数
//const lockTask = lockup(task, 100) // 创建排队执行函数，间隔100ms执行

module.exports = async (req, res, next) => {
  const result = await lockTask(params) //所有请求排队执行，执行速度取决于task函数执行速度
  /// other code
}
```

注意： lockup接受一个返回Promise对象的函数参数
