class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.callbacks = [];
    this.value = null;
    this.reason = null;

    const resolve = (value) => {
      if (this.state !== "pending") return;

      this.state = "fulfilled";
      this.value = value;
      this.callbacks.forEach((cb) => cb.fulfilled(value));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;

      this.state = "rejected";
      this.reason = reason;
      this.callbacks.forEach((cb) => cb.rejected(reason));
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (error) => {
        throw error;
      };
    }
    const promise = new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        setTimeout(() => {
          try {
            this.resolvePromise(
              promise,
              onFulfilled(this.value),
              resolve,
              reject
            );
          } catch (error) {
            reject(error);
          }
        });
        return;
      }

      if (this.state === "rejected") {
        setTimeout(() => {
          try {
            this.resolvePromise(
              promise,
              onRejected(this.reason),
              resolve,
              reject
            );
          } catch (error) {
            reject(error);
          }
        });
        return;
      }

      if (this.state === "pending") {
        this.callbacks.push({
          fulfilled: (value) => {
            setTimeout(() => {
              try {
                this.resolvePromise(
                  promise,
                  onFulfilled(value),
                  resolve,
                  reject
                );
              } catch (error) {
                reject(error);
              }
            });
          },
          rejected: (error) => {
            setTimeout(() => {
              try {
                this.resolvePromise(
                  promise,
                  onRejected(error),
                  resolve,
                  reject
                );
              } catch (error) {
                reject(error);
              }
            });
          },
        });
        return;
      }
    });

    return promise;
  }

  resolvePromise(promise, result, resolve, reject) {
    if (promise === result) {
      reject(new TypeError("Chaining cycle detected for promise"));
      return;
    }

    // (!null) // true
    // typeof null !== "object" // false
    if (
      !result ||
      (typeof result !== "object" && typeof result !== "function")
    ) {
      resolve(result);
      return;
    }

    let called;
    try {
      /**
       *  2.3.3: Otherwise, if `x` is an object or function,
       *    2.3.3.1: Let `then` be `x.then`
       *      `x` is an object with null prototype
       *
       *  This test test the number of `get` of `then` called
       */
      let then = result.then;
      if (typeof then === "function") {
        then.call(
          result,
          (value) => {
            if (called) return;
            called = true;
            this.resolvePromise(promise, value, resolve, reject);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(result);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  }
}

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
