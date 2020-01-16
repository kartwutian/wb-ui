import { isObj } from "../common/utils";

const getClassNames = function(name) {
  return {
    enter: `van-${name}-enter van-${name}-enter-active ${this.enterClass} ${this.enterActiveClass}`,
    "enter-to": `van-${name}-enter-to van-${name}-enter-active ${this.enterToClass} ${this.enterActiveClass}`,
    leave: `van-${name}-leave van-${name}-leave-active ${this.leaveClass} ${this.leaveActiveClass}`,
    "leave-to": `van-${name}-leave-to van-${name}-leave-active ${this.leaveToClass} ${this.leaveActiveClass}`
  };
};

const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));

/**
 *
 * @param showDefaultValue // show的默认值
 * @returns {{computed: {transitionName(): (string|*)}, data(): *, watch: {show(*=, *): void}, methods: {checkStatus(*): void, leave(): (undefined), enter(): void, observeShow(*): void, onTransitionEnd(): (undefined)}, beforeCreate(): void, props: {duration: {default: number, type: null}, customStyle: StringConstructor, show: {default: *, type: BooleanConstructor}, name: {default: string, type: StringConstructor}}}|string|{inited: boolean, display: boolean, classes: string, currentDuration: number, type: string}}
 */
export const transition = function(showDefaultValue) {
  return {
    props: {
      customStyle: {
        type: String,
        default: ""
      },
      // @ts-ignore
      show: {
        type: Boolean,
        default: showDefaultValue
        // observer: 'observeShow'
      },
      // @ts-ignore
      duration: {
        type: null,
        default: 300
      },
      name: {
        type: String,
        default: "fade"
      },
      enterClass: {
        type: String,
        default: ""
      },
      enterActiveClass: {
        type: String,
        default: ""
      },
      enterToClass: {
        type: String,
        default: ""
      },
      leaveClass: {
        type: String,
        default: ""
      },
      leaveActiveClass: {
        type: String,
        default: ""
      },
      leaveToClass: {
        type: String,
        default: ""
      }
    },

    computed: {
      transitionName() {
        // 用于popup传入positon，未传name的情况，自动fix name, 出现相应过度动画
        switch (this.position) {
          case "top":
            return "slide-down";
          case "bottom":
            return "slide-up";
          case "left":
            return "slide-left";
          case "right":
            return "slide-right";
          default:
            return null;
        }
      },
      styles() {
        return `-webkit-transition-duration: ${
          this.currentDuration
        }ms;transition-duration: ${this.currentDuration}ms;${
          this.display ? "" : "display: none;"
        } ${this.customStyle}`;
      }
    },

    data() {
      return {
        type: "",
        inited: false,
        display: false,
        classes: "",
        currentDuration: 0
      };
    },

    beforeCreate() {
      this.$nextTick(() => {
        if (this.show) {
          this.enter();
        }
      });
    },

    methods: {
      observeShow(value) {
        value ? this.enter() : this.leave();
      },

      enter() {
        const { duration, name, transitionName } = this;
        const classNames = getClassNames.call(this, transitionName || name);
        const currentDuration = isObj(duration) ? duration.enter : duration;

        this.status = "enter";
        this.$emit("before-enter");

        Promise.resolve()
          .then(nextTick)
          .then(() => {
            this.checkStatus("enter");
            this.$emit("enter");

            this.inited = true;
            this.display = true;
            this.classes = classNames.enter;
            this.currentDuration = currentDuration;
          })
          .then(nextTick)
          .then(() => {
            this.checkStatus("enter");
            this.transitionEnded = false;

            this.classes = classNames["enter-to"];
          })
          .catch(() => {});
      },

      leave() {
        if (!this.display) {
          return;
        }

        const { duration, name, transitionName } = this;
        const classNames = getClassNames.call(this, transitionName || name);
        const currentDuration = isObj(duration) ? duration.enter : duration;

        this.status = "leave";
        this.$emit("before-leave");

        Promise.resolve()
          .then(nextTick)
          .then(() => {
            this.checkStatus("leave");
            this.$emit("leave");

            this.classes = classNames.leave;
            this.currentDuration = currentDuration;
          })
          .then(nextTick)
          .then(() => {
            this.checkStatus("leave");
            this.transitionEnded = false;
            setTimeout(() => this.onTransitionEnd(), this.currentDuration);

            this.classes = classNames["leave-to"];
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

        const { show, display } = this;
        if (!show && display) {
          this.display = false;
        }
      }
    },
    watch: {
      show(val, oldval) {
        this.observeShow(val);
      }
    }
  };
};
