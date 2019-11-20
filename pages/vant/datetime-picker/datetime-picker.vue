<template>
  <view class="pages-datetime-picker">
     <demo-block title="选择完整时间">
      <van-datetime-picker
        type="datetime"
        data-type="datetime"
        :value="currentDate1"
        :min-date="minDate"
        @input="onInput"
      />
    </demo-block>

    <demo-block title="选择日期（年月日）">
      <van-datetime-picker
        type="date"
        :value="currentDate2"
        :min-date="minDate"
        @input="onInput"
        :formatter="formatter"
      />
    </demo-block>

      <demo-block title="选择日期（年月）">
      <van-datetime-picker
        type="year-month"
        data-type="year-month"
        :value="currentDate3"
        :min-date="minDate"
        @input="onInput"
      />
    </demo-block>

    <demo-block title="选择时间">
      <van-datetime-picker
        type="time"
        data-type="time"
        :value="currentDate4"
        :min-hour="minHour"
        :max-hour="maxHour"
        @input="onInput"
      />
    </demo-block>

   <demo-block title="选项过滤器">
      <van-datetime-picker
        type="time"
        :value="currentDate4"
        :filter="filter"
      />
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "../../../components/app/demo-block";
import VanDatetimePicker from "../../../components/vant/datetime-picker/index"

export default {
  name: 'pages-datetime-picker',
  components: { VanDatetimePicker, DemoBlock },
  data () {
    return {
      minHour: 10,
      maxHour: 20,
      minDate: new Date(2018, 0, 1).getTime(),
      maxDate: new Date(2019, 10, 1).getTime(),
      currentDate1: new Date(2018, 2, 31).getTime(),
      currentDate2: null,
      currentDate3: new Date(2018, 0, 1),
      currentDate4: '12:00',
      loading: false,
      formatter (type, value) {
        if (type === 'year') {
          return `${value}年`;
        }
        if (type === 'month') {
          return `${value}月`;
        }
        return value;
      },
      filter (type, options) {
        if (type === 'minute') {
          return options.filter(option => option % 5 === 0);
        }

        return options;
      }
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onInput (event) {
      console.log(event)
      // const { detail, currentTarget } = event;
      // const result = this.getResult(detail, currentTarget.dataset.type);

      // Toast(result);
    },

    getResult (time, type) {
      const date = new Date(time);
      switch (type) {
        case 'datetime':
          return date.toLocaleString();
        case 'date':
          return date.toLocaleDateString();
        case 'year-month':
          return `${date.getFullYear()}/${date.getMonth() + 1}`;
        case 'time':
          return time;
        default:
          return '';
      }
    }
  }
}
</script>

<style lang="less">
</style>
