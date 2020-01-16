import baseConfig from "./config.base";
import devConfig from "./config.dev";
import prodConfig from "./config.prod";
import { deepAssign } from "../utils/helper";

let config = {};

// uEnvDev
if (process.env.NODE_ENV === "development") {
  config = deepAssign(baseConfig, devConfig);
}
// uEnvProd
if (process.env.NODE_ENV === "production") {
  config = deepAssign(baseConfig, prodConfig);
}

export default config;
