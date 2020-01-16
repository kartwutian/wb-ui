export function isDef(value) {
  return value !== undefined && value !== null;
}

export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === "object" || type === "function");
}

export function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}

export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export function nextTick(fn) {
  setTimeout(() => {
    fn();
  }, 1000 / 30);
}

let systemInfo = null;
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = uni.getSystemInfoSync();
  }

  return systemInfo;
}

export function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumber(value) ? `${value}px` : value;
}

export function queryParentComponent(currentComponent, tagName) {
  if (!currentComponent) throw Error("请先传入要查找的组件");
  if (!tagName) throw Error("缺少tagName");
  if (!currentComponent.$parent) {
    return null;
  }
  if (
    currentComponent.$parent.$options._componentTag === tagName ||
    currentComponent.$parent.$options.name === tagName
  ) {
    return currentComponent.$parent;
  } else {
    return queryParentComponent(currentComponent.$parent, tagName);
  }
}
