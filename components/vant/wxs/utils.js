import bem from "./bem";
import memoize from "./memoize";

export default {
  bem: memoize(bem),
  memoize: memoize
};
