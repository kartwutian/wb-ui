<template>

  <view
    v-if=" showWrapper "
    :class=" $utils.bem('dropdown-item', direction) "
    :style=" wrapperStyle "
  >
    <van-popup
      v-show=" showPopup "
      custom-style="position: absolute;"
      overlay-style="position: absolute;"
      :overlay=" overlay "
      :position=" direction === 'down' ? 'top' : 'bottom' "
      :duration=" transition ? duration : 0 "
      :close-on-click-overlay=" closeOnClickOverlay "
      @close="onClickOverlay"
    >
      <van-cell
        v-for=" item in options "
        :key=" item.value "
        :data-option=" item "
        :class=" $utils.bem('dropdown-item__option', { active: item.value === value } ) "
        clickable
        :icon=" item.icon "
        @tap="onOptionTap"
      >
        <view
          slot="title"
          class="van-dropdown-item__title"
          :style=" item.value === value  ? 'color:' + activeColor : '' "
        >
          {{ item.text }}
        </view>
        <van-icon
          v-if=" item.value === value "
          name="success"
          class="van-dropdown-item__icon"
          :color=" activeColor "
        />
      </van-cell>

      <slot />
    </van-popup>
  </view>

</template>

<script>
import utils from '../wxs/utils';
import { basic } from '../mixins/basic';
import { queryParentComponent } from '../common/utils';
import VanPopup from "../popup/index"
import VanCell from "../cell/index"
import VanIcon from "../icon/index"

// import { Weapp } from 'definitions/weapp';

export default {
  name: "van-dropdown-item",
  field: true,
  mixins: [basic],
  components: { VanIcon, VanCell, VanPopup },

  relation: {
    name: 'dropdown-menu',
    type: 'ancestor'
  },

  props: {
    value: null,
    title: String,
    disabled: Boolean,
    titleClass: String,
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data () {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false,
      displayTitle: '',
      hasParent: false, // 标记是否有父元素
      newData: {},
    }
  },

  mounted () {

    this.parent = queryParentComponent(this, 'van-dropdown');
    if (this.parent) {
      this.hasParent = true;
      this.parent.linked(this);
    }
  },

  destroyed () {
    if (this.parent) {
      this.parent.unlinked(this);
      this.parent = null;
      this.hasParent = false;
    }
  },


  beforeCreate () {
    this.$nextTick(() => {
      this.displayTitle = this.computedDisplayTitle(this.value)
    })
  },

  methods: {
    computedDisplayTitle (curValue) {
      const { title, options } = this;

      if (title) {
        return title;
      }

      const match = options.filter(option => option.value === curValue);
      const displayTitle = match.length ? match[0].text : '';
      return displayTitle;
    },

    onClickOverlay () {
      this.toggle();
      this.$emit('close');
    },

    onOptionTap (event) {
      let { value, displayTitle } = this;
      const { option } = event.currentTarget.dataset;
      // const { value } = option;

      if (optionValue !== value) {
        value = optionValue;
        displayTitle = this.computedDisplayTitle(optionValue);
        this.$emit('change', optionValue);
      }
      this.setData({ showPopup, value, displayTitle });

      const time = this.duration || 0;
      setTimeout(() => {
        this.showWrapper = false
      }, time);

      // parent 中的 itemListData 是 children 上的数据的集合
      // 数据的更新由 children 各自维护，但是模板的更新需要额外触发 parent 的 setData
      // this.parent.setData({ itemListData: this.parent.data.itemListData });

    },

    toggle () {
      const { childIndex } = this;
      this.parent.toggleItem(childIndex);
    }
  }
};

</script>

<style lang="less">
</style>
