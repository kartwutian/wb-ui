import { basic } from "../mixins/basic";
import { observe } from "../mixins/observer/index";

function mapKeys(source, target, map) {
  Object.keys(map).forEach(key => {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function VantComponent(vantOptions = {}) {
  const options = {};

  mapKeys(vantOptions, options, {
    data: "data",
    props: "props",
    mixins: "mixins",
    methods: "methods",
    beforeCreate: "beforeCreate",
    created: "created",
    mounted: "mounted",
    relations: "relations",
    destroyed: "destroyed",
    classes: "classes"
  });

  const { relation } = vantOptions;
  if (relation) {
    options.relations = Object.assign(options.relations || {}, {
      [`../${relation.name}/index`]: relation
    });
  }

  // add default externalClasses
  options.classes = options.classes || [];
  options.classes.push("custom-class");

  // add default behaviors
  options.mixins = options.mixins || [];
  options.mixins.push(basic);

  // map field to form-field behavior
  if (vantOptions.field) {
    options.mixins.push("wx://form-field");
  }

  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true
  };

  return options;
}

export { VantComponent };
