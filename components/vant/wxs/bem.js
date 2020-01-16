const REGEXP = /\{|\}|\"/g;

function keys(obj) {
  return JSON.stringify(obj)
    .replace(REGEXP, "")
    .split(",")
    .map(function(item) {
      return item.split(":")[0];
    });
}

const PREFIX = "van-";

function join(name, mods) {
  name = PREFIX + name;
  mods = mods.map(function(mod) {
    return name + "--" + mod;
  });
  mods.unshift(name);
  return mods.join(" ");
}

function traversing(mods, conf) {
  if (!conf) {
    return;
  }
  if (typeof conf === "string" || typeof conf === "number") {
    mods.push(conf);
  } else if (Array.isArray(conf)) {
    conf.forEach(function(item) {
      traversing(mods, item);
    });
  } else if (typeof conf === "object") {
    // console.log( keys(conf))
    keys(conf).forEach(function(key) {
      conf[key] && mods.push(key);
    });
  }
}

function bem(name, conf) {
  // console.log(conf)
  var mods = [];
  traversing(mods, conf);
  // console.log(mods)
  return join(name, mods);
}

export default bem;
