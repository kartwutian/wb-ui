<template>
  <van-picker
    class="van-area__picker"
    ref="van-area-picker"
    :active-class="activeClass"
    :toolbar-class="toolbarClass"
    :column-class="columnClass"
    show-toolbar
    value-key="name"
    :title="title"
    :loading="loading"
    :columns="displayColumns"
    :item-height="itemHeight"
    :visible-item-count="visibleItemCount"
    :cancel-button-text="cancelButtonText"
    :confirm-button-text="confirmButtonText"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
// import { pickerProps } from '../picker/shared';
import VanPicker from "../picker/index";

const COLUMNSPLACEHOLDERCODE = "000000";

export default {
  name: "van-area",
  // classes: ['active-class', 'toolbar-class', 'column-class'],
  components: { VanPicker },

  props: {
    title: String,
    loading: Boolean,
    showToolbar: Boolean,
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    confirmButtonText: {
      type: String,
      default: "确认"
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    itemHeight: {
      type: Number,
      default: 44
    },
    value: String,
    areaList: {
      type: Object,
      default: {}
    },
    columnsNum: {
      type: null,
      default: 3
    },
    columnsPlaceholder: {
      type: Array,
      default: () => {
        return [, ,];
      }
    },
    activeClass: {
      type: String,
      default: ""
    },
    toolbarClass: {
      type: String,
      default: ""
    },
    columnClass: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      columns: [{ values: [] }, { values: [] }, { values: [] }],
      displayColumns: [{ values: [] }, { values: [] }, { values: [] }],
      typeToColumnsPlaceholder: {}
    };
  },

  watch: {
    value(value) {
      this.code = value;
      this.setValues();
    },

    areaList: "setValues",

    columnsNum(value) {
      this.displayColumns = this.columns.slice(0, +value);
    },
    columnsPlaceholder(value) {
      this.typeToColumnsPlaceholder = {
        province: value[0] || "",
        city: value[1] || "",
        county: value[2] || ""
      };
    }
  },

  mounted() {
    setTimeout(() => {
      this.setValues();
    }, 0);
  },

  methods: {
    getPicker() {
      if (this.picker == null) {
        // this.picker = this.selectComponent('.van-area__picker');
        this.picker = this.$refs["van-area-picker"];
      }
      return this.picker;
    },

    onCancel(event) {
      this.emit("cancel", event);
    },

    onConfirm(event) {
      const { index } = event;
      let { value } = event;
      value = this.parseOutputValues(value);
      this.emit("confirm", { value, index });
    },

    emit(type, detail) {
      detail.values = detail.value;
      delete detail.value;
      this.$emit(type, detail);
    },

    // parse output columns data
    parseOutputValues(values) {
      const { columnsPlaceholder } = this;
      return values.map((value, index) => {
        // save undefined value
        if (!value) return value;

        value = JSON.parse(JSON.stringify(value));
        if (!value.code || value.name === columnsPlaceholder[index]) {
          value.code = "";
          value.name = "";
        }
        return value;
      });
    },

    onChange(event) {
      const { index, picker, value } = event;
      console.log(event);
      this.code = value[index].code;
      let getValues = picker.getValues();
      getValues = this.parseOutputValues(getValues);
      this.setValues().then(() => {
        this.$emit("change", {
          picker,
          values: getValues,
          index
        });
      });
    },

    getConfig(type) {
      const { areaList } = this;
      return (areaList && areaList[`${type}_list`]) || {};
    },

    getList(type, code) {
      const { typeToColumnsPlaceholder } = this;
      let result = [];
      if (type !== "province" && !code) {
        return result;
      }

      const list = this.getConfig(type);
      result = Object.keys(list).map(code => ({
        code,
        name: list[code]
      }));

      if (code) {
        // oversea code
        if (code[0] === "9" && type === "city") {
          code = "9";
        }

        result = result.filter(item => item.code.indexOf(code) === 0);
      }

      if (typeToColumnsPlaceholder[type] && result.length) {
        // set columns placeholder
        const codeFill =
          type === "province"
            ? ""
            : type === "city"
            ? COLUMNSPLACEHOLDERCODE.slice(2, 4)
            : COLUMNSPLACEHOLDERCODE.slice(4, 6);
        result.unshift({
          code: `${code}${codeFill}`,
          name: typeToColumnsPlaceholder[type]
        });
      }

      return result;
    },

    getIndex(type, code) {
      let compareNum = type === "province" ? 2 : type === "city" ? 4 : 6;
      const list = this.getList(type, code.slice(0, compareNum - 2));

      // oversea code
      if (code[0] === "9" && type === "province") {
        compareNum = 1;
      }

      code = code.slice(0, compareNum);
      for (let i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },

    setValues() {
      const county = this.getConfig("county");
      let { code } = this;

      if (!code) {
        // if (this.columnsPlaceholder.length) {
        //   code = COLUMNSPLACEHOLDERCODE;
        // } else
        if (Object.keys(county)[0]) {
          code = Object.keys(county)[0];
        } else {
          code = "";
        }
      }

      const province = this.getList("province");
      const city = this.getList("city", code.slice(0, 2));
      const picker = this.getPicker();

      if (!picker) {
        return;
      }

      const stack = [];

      stack.push(picker.setColumnValues(0, province, false));
      stack.push(picker.setColumnValues(1, city, false));

      if (city.length && code.slice(2, 4) === "00") {
        [{ code }] = city;
      }

      stack.push(
        picker.setColumnValues(
          2,
          this.getList("county", code.slice(0, 4)),
          false
        )
      );

      return Promise.all(stack)
        .catch(() => {})
        .then(() =>
          picker.setIndexes([
            this.getIndex("province", code),
            this.getIndex("city", code),
            this.getIndex("county", code)
          ])
        )
        .catch(() => {});
    },

    getValues() {
      const picker = this.getPicker();
      return picker ? picker.getValues().filter(value => !!value) : [];
    },

    getDetail() {
      const values = this.getValues();
      const area = {
        code: "",
        country: "",
        province: "",
        city: "",
        county: ""
      };

      if (!values.length) {
        return area;
      }

      const names = values.map(item => item.name);
      area.code = values[values.length - 1].code;
      if (area.code[0] === "9") {
        area.country = names[1] || "";
        area.province = names[2] || "";
      } else {
        area.province = names[0] || "";
        area.city = names[1] || "";
        area.county = names[2] || "";
      }

      return area;
    },

    reset(code) {
      this.code = code || "";
      return this.setValues();
    }
  }
};
</script>

<style lang="less"></style>
