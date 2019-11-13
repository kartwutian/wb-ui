import {
  isObj
} from '../common/utils';

const getClassNames = function (name) {
  return {
    enter: `van-${name}-enter van-${name}-enter-active ${this.enterClass} enter-active-class`,
    'enter-to': `van-${name}-enter-to van-${name}-enter-active ${this.enterToClass} enter-active-class`,
    leave: `van-${name}-leave van-${name}-leave-active ${this.leaveClass} leave-active-class`,
    'leave-to': `van-${name}-leave-to van-${name}-leave-active ${this.leaveToClass} leave-active-class`
  }
};

const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));

export const transition = function (showDefaultValue) {
  return {
    props: {
      customStyle: String,
      // @ts-ignore
      show: {
        type: Boolean,
        default: showDefaultValue,
        // observer: 'observeShow'
      },
      // @ts-ignore
      duration: {
        type: null,
        default: 300,
        // observer: 'observeDuration'
      },
      name: {
        type: String,
        default: 'fade'
      }
    },

    data() {
      return {
        type: '',
        inited: false,
        display: false,
        classes: '',
        currentDuration: 0
      }
    },

    beforeCreate() {
      this.$nextTick(() => {
        if (this.show) {
          this.enter();
        }
      })
    },

    methods: {
      observeShow(value) {
        value ? this.enter() : this.leave();
      },

      enter() {
        const {
          duration,
          name
        } = this;

        const classNames = getClassNames.call(this, name);
        const currentDuration = isObj(duration) ? duration.enter : duration;

        this.status = 'enter';
        this.$emit('before-enter');

        Promise.resolve()
          .then(nextTick)
          .then(() => {
            this.checkStatus('enter');
            this.$emit('enter');

            this.inited = true;
            this.display = true;
            this.classes = classNames.enter;
            this.currentDuration = currentDuration
            // this.setData({
            //   inited: true,
            //   display: true,
            //   classes: classNames.enter,
            //   currentDuration
            // });
          })
          .then(nextTick)
          .then(() => {
            this.checkStatus('enter');
            this.transitionEnded = false;

            this.classes = classNames['enter-to']
            // this.setData({
            //   classes: classNames['enter-to']
            // });
          })
          .catch(() => {});
      },

      leave() {
        if (!this.display) {
          return;
        }

        const {
          duration,
          name
        } = this;
        const classNames = getClassNames.call(this, name);
        const currentDuration = isObj(duration) ? duration.leave : duration;

        this.status = 'leave';
        this.$emit('before-leave');

        Promise.resolve()
          .then(nextTick)
          .then(() => {
            this.checkStatus('leave');
            this.$emit('leave');

            this.classes = classNames.leave
            this.currentDuration = currentDuration
            // this.setData({
            //   classes: classNames.leave,
            //   currentDuration
            // });
          })
          .then(nextTick)
          .then(() => {
            this.checkStatus('leave');
            this.transitionEnded = false;
            setTimeout(() => this.onTransitionEnd(), this.currentDuration);

            this.classes = classNames['leave-to']
            // this.setData({
            //   classes: classNames['leave-to']
            // });
          })
          .catch(() => {});
      },

      checkStatus(status) {
        if (status !== this.status) {
          throw new Error(`incongruent status: ${status}`);
        }
      },

      onTransitionEnd() {
        if (this.transitionEnded) {
          return;
        }

        this.transitionEnded = true;
        this.$emit(`after-${this.status}`);

        const {
          show,
          display
        } = this;
        if (!show && display) {
          this.display = false
          // this.setData({
          //   display: false
          // });
        }
      }
    },
    watch: {
      show(val, oldval) {
        this.observeShow(val)
      }
    }
  };
};