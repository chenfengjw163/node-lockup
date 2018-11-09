const lockup = require('../../lib/index.js')



const examples = Array.from({length: 50}).map((v, k) => { return k })

describe('node lock', () => {
  describe('50 random', () => {
    it('should work', done => {
      const task = (params) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(params)
          }, parseInt(Math.random() * 100));
        })
      }

      const lockTask = lockup(task)
  
      for (let i = 0; i < 50; i++) {
        lockTask(i).then(p => {
          expect(p).toEqual(examples[0])
          examples.shift()
  
          if (!examples.length) {
            done()
          }
        })
      }
    })
  })

  describe('error catch', () => {
    it('should work', async (done) => {
      const task = (params) => {
        return new Promise((resolve, reject) => {
          reject(params)
        })
      }

      const lockTask = lockup(task)

      try {
        await lockTask(1)

        expect(false).toBe(true)
      } catch (error) {
        expect(true).toBe(true)
      }
      done()
    })
  })
})