<template>
  <view>
    <template name="toolbar">
      <view
        v-if="showToolbar"
        :class="'van-picker__toolbar van-hairline--top-bottom ' + toolbarClass"
      >
        <view
          class="van-picker__cancel"
          hover-class="van-picker__cancel--hover"
          :hover-stay-time="70"
          @tap="emit('cancel')"
        >
          {{ cancelButtonText }}
        </view>
        <view v-if="title" class="van-picker__title van-ellipsis">{{
          title
        }}</view>
        <view
          class="van-picker__confirm"
          hover-class="van-picker__confirm--hover"
          :hover-stay-time="70"
          @tap="emit('confirm')"
        >
          {{ confirmButtonText }}
        </view>
      </view>
    </template>

    <view :class="'van-picker ' + customClass">
      <template is="toolbar" v-if="toolbarPosition === 'top'"></template>
      <view v-if="loading" class="van-picker__loading">
        <van-loading color="#1989fa" />
      </view>
      <view
        class="van-picker__columns"
        :style="'height:' + itemHeight * visibleItemCount + 'px'"
        @touchmove="noop"
      >
        <van-picker-column
          ref="van-picker-column"
          class="van-picker__column"
          v-for="(item, index) in simple ? [columns] : columns"
          :key="index"
          :custom-class="columnClass"
          :value-key="valueKey"
          :initial-options="simple ? item : item.values"
          :default-index="item.defaultIndex || defaultIndex"
          :item-height="itemHeight"
          :visible-item-count="visibleItemCount"
          :active-class="activeClass"
          @change="onChange"
        />
        <view
          class="van-picker__frame van-hairline--top-bottom"
          :style="'height:' + itemHeight + 'px'"
        />
      </view>
      <template is="toolbar" v-if="toolbarPosition === 'bottom'"></template>
    </view>
  </view>
</template>

<script>
import VanLoading from "../loading/index";
import { basic } from "../mixins/basic";
import VanPickerColumn from "../picker-column/index";

// :data=" showToolbar, cancelButtonText, title, confirmButtonText "

export default {
  name: "van-picker",
  components: { VanPickerColumn, VanLoading },
  mixins: [basic],
  props: {
    valueKey: String,
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
    toolbarPosition: {
      type: String,
      default: "top"
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default: []
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
    return {};
  },

  mounted() {},

  computed: {
    simple() {
      return this.columns.length && !this.columns[0].values;
    }
  },

  methods: {
    noop() {},
    onChange(index) {
      if (this.simple) {
        this.$emit("change", {
          picker: this,
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0)
        });
      } else {
        this.$emit("change", {
          picker: this,
          value: this.getValues(),
          index: index
        });
      }
    },
    emit(type) {
      if (this.simple) {
        this.$emit(type, {
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0)
        });
      } else {
        this.$emit(type, {
          value: this.getValues(),
          index: this.getIndexes()
        });
      }
    },
    setColumns() {
      const columns = this.simple ? [{ values: this.columns }] : this.columns;
      const stack = columns.map((column, index) => {
        this.setColumnValues(index, column.values);
      });
      return Promise.all(stack);
    },
    // get column instance by index
    getColumn(index) {
      return this.$refs["van-picker-column"][index];
    },

    // get column value by index
    getColumnValue(index) {
      const column = this.getColumn(index);
      return column && column.getValue();
    },

    // set column value by index
    setColumnValue(index, value) {
      const column = this.getColumn(index);

      if (column == null) {
        return Promise.reject(new Error("setColumnValue: 对应列不存在"));
      }

      return column.setValue(value);
    },
    // get column option index by column index
    getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },

    // set column option index by column index
    setColumnIndex(columnIndex, optionIndex) {
      const column = this.getColumn(columnIndex);

      if (column == null) {
        return Promise.reject(new Error("setColumnIndex: 对应列不存在"));
      }

      return column.setIndex(optionIndex);
    },

    // get options of column by index
    getColumnValues(index) {
      return (this.$refs["van-picker-column"][index] || {}).options;
    },
    // set options of column by index
    setColumnValues(index, options, needReset = true) {
      const column = this.$refs["van-picker-column"][index];
      if (column == null) {
        return Promise.reject(new Error("setColumnValues: 对应列不存在"));
      }

      const isSame = JSON.stringify(column.options) === JSON.stringify(options);

      if (isSame) {
        return Promise.resolve();
      }

      return column.set({ options }).then(() => {
        if (needReset) {
          column.setIndex(0);
        }
      });
    },

    // get values of all columns
    getValues() {
      return this.$refs["van-picker-column"].map(child => child.getValue());
    },
    // set values of all columns
    setValues(values) {
      const stack = values.map((value, index) =>
        this.setColumnValue(index, value)
      );
      return Promise.all(stack);
    },

    // get indexes of all columns
    getIndexes() {
      return this.$refs["van-picker-column"].map(child => child.currentIndex);
    },

    // set indexes of all columns
    setIndexes(indexes) {
      const stack = indexes.map((optionIndex, columnIndex) =>
        this.setColumnIndex(columnIndex, optionIndex)
      );
      return Promise.all(stack);
    }
  },

  watch: {
    columns() {
      if (
        Array.isArray(this.$refs["van-picker-column"]) &&
        this.$refs["van-picker-column"].length
      ) {
        this.setColumns().catch(() => {});
      }
    }
  }
};
</script>

<style lang="less"></style>
