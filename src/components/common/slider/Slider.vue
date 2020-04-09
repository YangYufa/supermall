<template>
  <div id="hy-slider">
    <div class="slider" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <!-- 这个用来干嘛的 -->
    <slot name="indicator"></slot>
    <div class="indicator">
      <!-- 要看且数目》1 -->
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{active: index === currentIndex-1}"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    // 时间间隔
    interval: {
      type: Number,
      default: 3000
    },
    // 动画持续时间
    animDuration: {
      type: Number,
      default: 300
    },
    // 移动比例
    moveRatio: {
      type: Number,
      default: 0.25
    },
    // 显示指示器
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // slider的宽度
      sliderStyle: {}, // slider样式
      currentIndex: 1, // 当前的index
      scrolling: false // 是否正在滚动
    };
  },
  mounted: function() {
    // 1.操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom();

      // 2.开启定时器
      this.startTimer();
      // }, 100)
    }, 200);
  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer: function() {
      // 这个Timer似乎没有定义啊，不过这里用了就有了
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer: function() {
      console.log(this.playTimer);
      window.clearInterval(this.playTimer);
    },

    /**
     * 滚动到正确的位置
     */
    scrollContent: function(currentPosition) {
      // 0.设置正在滚动
      this.scrolling = true;

      // 1.开始滚动动画
      // 注意有空格
      this.sliderStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(currentPosition);

      // 2.判断滚动到的位置
      this.checkPosition();

      // 4.滚动完成
      this.scrolling = false;
    },

    /**
     * 校验正确的位置
     */
    checkPosition: function() {
      // 这个timeout是为了让transition结束
      window.setTimeout(() => {
        // 1.校验正确的位置
        this.sliderStyle.transition = "0ms";
        // 从结尾回到开头
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          // 瞬间动的，不像scrollcontent有过度
          this.setTransform(-this.currentIndex * this.totalWidth);
          // 从开头回到结尾
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        // 2.结束移动后的回调
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },

    /**
     * 设置滚动的位置
     */
    setTransform: function(position) {
      // 兼容
      this.sliderStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.sliderStyle[
        "-webkit-transform"
      ] = `translate3d(${position}px), 0, 0`;
      this.sliderStyle["-ms-transform"] = `translate3d(${position}px), 0, 0`;
    },

    /**
     * 操作DOM, 在DOM前后添加Slide
     */
    handleDom: function() {
      // 1.获取要操作的元素
      let sliderEl = document.querySelector(".slider");
      let slidesEls = sliderEl.getElementsByClassName("slide");

      // 2.保存个数
      this.slideCount = slidesEls.length;

      // 3.如果大于1个, 那么在前后分别添加一个slide，这样为了前后循环弄的
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        // 第一个前面插最后一个
        sliderEl.insertBefore(cloneLast, slidesEls[0]);
        // 最后一个前面插第一个
        sliderEl.appendChild(cloneFirst);
        this.totalWidth = sliderEl.offsetWidth;
        // 这样就可以不断自己动态添加样式了
        this.sliderStyle = sliderEl.style;
      }

      // 4.让slider元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth);
    },

    /**
     * 拖动事件的处理
     */
    touchStart: function(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return;

      // 2.停止定时器
      this.stopTimer();

      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove: function(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      // 2.设置当前的位置
      this.setTransform(moveDistance);
    },

    touchEnd: function(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      // 2.判断最终的距离
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 右边移动超过0.5
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 向左移动超过0.5
        this.currentIndex++;
      }

      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 4.移动完成后重新开启定时器
      this.startTimer();
    },

    /**
     * 控制上一个, 下一个
     */
    previous: function() {
      this.changeItem(-1);
    },
// 好像没有用到，是为了左右移动按钮以及点击小按钮指示器用的吗
    next: function() {
      this.changeItem(1);
    },

    changeItem: function(num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    }
  }
};
</script>

<style scoped>
#hy-slider {
  overflow: hidden;
  position: relative;
}

.slider {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  /* 一个圆点 */
  border-radius: 4px;
  background-color: #fff;
  /* line-height: 8px; */
  text-align: center;
  /* font-size: 12px; */
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
