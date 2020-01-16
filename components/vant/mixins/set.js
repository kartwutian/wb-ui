export const set = {
  methods: {
    set(data, callback) {
      return new Promise(resolve => {
        Object.keys(data).forEach(k => {
          this[k] = data[k];
        });
        setTimeout(() => {
          if (callback && typeof callback === "function") {
            callback.call(this);
          }
          resolve();
        });
      });
    }
  }
};
