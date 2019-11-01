export const basic = {
  props: {
    customClass: {
      type: String,
      default: ''
    }
  },
  methods: {

    getRect(selector, all) {
      return new Promise(resolve => {
        uni.createSelectorQuery()
          .in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }

            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    }
  }
};
