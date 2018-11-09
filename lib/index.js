class LockUp {
  constructor(task) {
    this.task = task
    this.queue = []
  }
  invoke(params) {
    return new Promise((resolve, reject) => {
      this.queue.push({ params, resolve, reject })

      if (!this.status) {
        this.status = true
        this.run()
      }
    })
  }
  async run() {
    const cur = this.queue.shift()

    if (!cur) {
      this.status = false
      return
    }
    try {
      const result = await this.task(cur.params)

      cur.resolve(result)
    } catch (error) {
      cur.reject(error)
    }
    this.run()
  }
}

module.exports = (task) => {
  const lockTask = new LockUp(task)

  return (params) => {
    return lockTask.invoke(params)
  }
}
  