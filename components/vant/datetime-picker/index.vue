<template>
  <van-picker
    class="van-datetime-picker"
    ref="van-datetime-picker"
    :active-class="activeClass"
    :toolbar-class="toolbarClass"
    :column-class="columnClass"
    :title="title"
    :columns="columns"
    :item-height="itemHeight"
    :show-toolbar="showToolbar"
    :visible-item-count="visibleItemCount"
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
import { isDef } from "../common/utils";
import { set } from "../mixins/set";
// import { pickerProps } from '../picker/shared';
import VanPicker from "../picker/index";

const currentYear = new Date().getFullYear();

function isValidDate(date) {
  return isDef(date) && !isNaN(new Date(date).getTime());
}

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function padZero(val) {
  return `00${val}`.slice(-2);
}

function times(n, iteratee) {
  let index = -1;
  const result = Array(n < 0 ? 0 : n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

function getTrueValue(formattedValue) {
  if (!formattedValue) return;
  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1);
  }
  return parseInt(formattedValue, 10);
}

function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}

const defaultFormatter = (_, value) => value;

export default {
  name: "van-datetime-picker",
  components: { VanPicker },
  mixins: [set],
  // classes: ['active-class', 'toolbar-class', 'column-class'],

  props: {
    title: {
      type: String,
      default: ""
    },
    loading: Boolean,
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
    value: null,
    filter: null,
    type: {
      type: String,
      default: "datetime"
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    formatter: {
      type: null,
      default: defaultFormatter
    },
    minDate: {
      type: Number,
      default: new Date(currentYear - 10, 0, 1).getTime()
    },
    maxDate: {
      type: Number,
      default: new Date(currentYear + 10, 11, 31).getTime()
    },
    minHour: {
      type: Number,
      default: 0
    },
    maxHour: {
      type: Number,
      default: 23
    },
    minMinute: {
      type: Number,
      default: 0
    },
    maxMinute: {
      type: Number,
      default: 59
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
      innerValue: Date.now(),
      columns: []
    };
  },

  watch: {
    value: "updateValue",
    type: "updateValue",
    minDate: "updateValue",
    maxDate: "updateValue",
    minHour: "updateValue",
    maxHour: "updateValue",
    minMinute: "updateValue",
    maxMinute: "updateValue"
  },

  methods: {
    updateValue() {
      const val = this.correctValue(this.value);
      const isEqual = val === this.innerValue;
      if (!isEqual) {
        this.updateColumnValue(val).then(() => {
          this.$emit("input", val);
        });
      } else {
        this.updateColumns();
      }
    },

    getPicker() {
      if (this.picker == null) {
        // this.picker = this.selectComponent('.van-datetime-picker');
        this.picker = this.$refs["van-datetime-picker"];

        const { picker } = this;
        const { setColumnValues } = picker;
        picker.setColumnValues = (...args) =>
          setColumnValues.apply(picker, [...args, false]);
      }
      // debugger
      return this.picker;
    },

    updateColumns() {
      const { formatter = defaultFormatter } = this;
      const results = this.getOriginColumns().map(column => ({
        values: column.values.map(value => formatter(column.type, value))
      }));

      return this.set({ columns: results });
    },

    getOriginColumns() {
      const { filter } = this;
      const results = this.getRanges().map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, index => {
          let value = range[0] + index;
          value = type === "year" ? `${value}` : padZero(value);
          return value;
        });

        if (filter) {
          values = filter(type, values);
        }

        return { type, values };
      });

      return results;
    },

    getRanges() {
      if (this.type === "time") {
        return [
          {
            type: "hour",
            range: [this.minHour, this.maxHour]
          },
          {
            type: "minute",
            range: [this.minMinute, this.maxMinute]
          }
        ];
      }

      const {
        maxYear,
        maxDate,
        maxMonth,
        maxHour,
        maxMinute
      } = this.getBoundary("max", this.innerValue);
      const {
        minYear,
        minDate,
        minMonth,
        minHour,
        minMinute
      } = this.getBoundary("min", this.innerValue);

      const result = [
        {
          type: "year",
          range: [minYear, maxYear]
        },
        {
          type: "month",
          range: [minMonth, maxMonth]
        },
        {
          type: "day",
          range: [minDate, maxDate]
        },
        {
          type: "hour",
          range: [minHour, maxHour]
        },
        {
          type: "minute",
          range: [minMinute, maxMinute]
        }
      ];

      if (this.type === "date") result.splice(3, 2);
      if (this.type === "year-month") result.splice(2, 3);
      return result;
    },

    correctValue(value) {
      // validate value
      const isDateType = this.type !== "time";
      if (isDateType && !isValidDate(value)) {
        value = this.minDate;
      } else if (!isDateType && !value) {
        const { minHour } = this;
        value = `${padZero(minHour)}:00`;
      }

      // time type
      if (!isDateType) {
        let [hour, minute] = value.split(":");
        hour = padZero(range(hour, this.minHour, this.maxHour));
        minute = padZero(range(minute, this.minMinute, this.maxMinute));

        return `${hour}:${minute}`;
      }

      // date type
      value = Math.max(value, this.minDate);
      value = Math.min(value, this.maxDate);

      return value;
    },

    getBoundary(type, innerValue) {
      const value = new Date(innerValue);
      const boundary = new Date(this[`${type}Date`]);
      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;

      if (type === "max") {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value.getDate() === date) {
            hour = boundary.getHours();
            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }

      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      };
    },

    onCancel() {
      this.$emit("cancel");
    },

    onConfirm() {
      this.$emit("confirm", this.innerValue);
    },

    onChange() {
      let value;

      const picker = this.getPicker();

      if (this.type === "time") {
        const indexes = picker.getIndexes();
        value = `${+this.columns[0].values[indexes[0]]}:${+this.columns[1]
          .values[indexes[1]]}`;
      } else {
        const values = picker.getValues();
        const year = getTrueValue(values[0]);
        const month = getTrueValue(values[1]);
        const maxDate = getMonthEndDay(year, month);
        let date = getTrueValue(values[2]);
        if (this.type === "year-month") {
          date = 1;
        }
        date = date > maxDate ? maxDate : date;
        let hour = 0;
        let minute = 0;
        if (this.type === "datetime") {
          hour = getTrueValue(values[3]);
          minute = getTrueValue(values[4]);
        }
        value = new Date(year, month - 1, date, hour, minute);
      }
      value = this.correctValue(value);

      this.updateColumnValue(value).then(() => {
        this.$emit("input", value);
        this.$emit("change", picker);
      });
    },

    updateColumnValue(value) {
      let values = [];
      const { type, formatter = defaultFormatter } = this;
      const picker = this.getPicker();

      if (type === "time") {
        const pair = value.split(":");
        values = [formatter("hour", pair[0]), formatter("minute", pair[1])];
      } else {
        const date = new Date(value);
        values = [
          formatter("year", `${date.getFullYear()}`),
          formatter("month", padZero(date.getMonth() + 1))
        ];
        if (type === "date") {
          values.push(formatter("day", padZero(date.getDate())));
        }
        if (type === "datetime") {
          values.push(
            formatter("day", padZero(date.getDate())),
            formatter("hour", padZero(date.getHours())),
            formatter("minute", padZero(date.getMinutes()))
          );
        }
      }

      return this.set({ innerValue: value })
        .then(() => this.updateColumns())
        .then(() => picker.setValues(values));
    }
  },

  // created () {
  //   const innerValue = this.correctValue(this.value);
  //   this.updateColumnValue(innerValue).then(() => {
  //     this.$emit('input', innerValue);
  //   });
  // },

  beforeCreate() {
    this.$nextTick(() => {
      const innerValue = this.correctValue(this.value);
      this.updateColumnValue(innerValue).then(() => {
        this.$emit("input", innerValue);
      });
    });
  }
};
</script>

<style lang="less"></style>
