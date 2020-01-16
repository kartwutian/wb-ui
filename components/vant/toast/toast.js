import { isObj } from "../common/utils";

// type ToastMessage = string | number;
//
// interface ToastOptions {
//   show?: boolean;
//   type?: string;
//   mask?: boolean;
//   zIndex?: number;
//   context?: WechatMiniprogram.Component.TrivialInstance | WechatMiniprogram.Page.TrivialInstance;
//   position?: string;
//   duration?: number;
//   selector?: string;
//   forbidClick?: boolean;
//   loadingType?: string;
//   message?: ToastMessage;
//   onClose?: () => void;
// }

const defaultOptions = {
  type: "text",
  mask: false,
  message: "",
  show: true,
  zIndex: 1000,
  duration: 3000,
  position: "middle",
  forbidClick: false,
  loadingType: "circular",
  refName: "van-toast"
};

let queue = [];
let currentOptions = { ...defaultOptions };

function parseOptions(message) {
  return isObj(message) ? message : { message };
}

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

function Toast(toastOptions) {
  const options = {
    ...currentOptions,
    ...parseOptions(toastOptions)
  };

  const context = options.context || getContext();
  const toast = context.$vm.$refs[options.refName];
  if (!toast) {
    console.warn("未找到 van-toast 节点，请确认 ref 及 context 是否正确");
    return;
  }

  delete options.context;
  delete options.refName;

  toast.clear = () => {
    toast.show = false;

    if (options.onClose) {
      options.onClose();
    }
  };

  queue.push(toast);
  Object.keys(options).forEach(k => {
    toast[k] = options[k];
  });
  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
      queue = queue.filter(item => item !== toast);
    }, options.duration);
  }

  return toast;
}

const createMethod = type => options =>
  Toast({
    type,
    ...parseOptions(options)
  });

Toast.loading = createMethod("loading");
Toast.success = createMethod("success");
Toast.fail = createMethod("fail");

Toast.clear = () => {
  queue.forEach(toast => {
    toast.clear();
  });
  queue = [];
};

Toast.setDefaultOptions = options => {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};

export default Toast;
