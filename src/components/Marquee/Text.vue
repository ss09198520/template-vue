<!-- ref: https://github.com/EvodiaAut/vue-marquee-text-component -->
<script>
  export default {
    name: 'MarqueeText',
    functional: true,
    props: {
      duration: {
        type: Number,
        default: 15
      },
      repeat: {
        type: Number,
        default: 2,
        validator: function (val) {
          return val > 0
        }
      },
      paused: {
        type: Boolean,
        default: false
      },
      reverse: {
        type: Boolean,
        default: false
      },
      backgroundColor: {
        type: String,
        default: '#b4b4b4'
      },
      fontColor: {
        type: String,
        default: '#b4b4b4'
      },
    },
    render(h, { $style, props: { duration, repeat, paused, reverse , fontColor , backgroundColor }, children, data: { staticClass, key, on } }) {
      // console.log('$style', $style)
      console.log('children', children[0].text)
      '台灣電力公司跑馬燈輪播測試!!! :   今日預告台北將不會停電!!!!'
      const text = h('div', {
        class: $style.text,
        style: {
          animationDuration: `${duration}s`,
          color: fontColor,
          backgroundColor: backgroundColor,
          animationDirection: reverse ? 'reverse' : undefined
        }
      }, children)
      
      return h('div', {//Text_wrap
        key,
        on,
        class: [
          'v-list-item',
          staticClass,
          $style.wrap
        ]
      }, [
        h('div', {//Text_content
          class: [
            paused
              ? $style.paused
              : undefined,
            $style.content
          ]
        }, Array(repeat).fill(text))
      ])
    }
  }
</script>

<style module>
  .wrap {
    overflow: hidden;
  }
  .content {
    width: 200000px;
  }
  .text {
    animation-name: animation;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    float: left;
    font-size: 0.8cm;
    white-space: nowrap;
  }
  .paused .text {
    animation-play-state: paused
  }
  @keyframes animation {
    0% {  margin-left: 100%; }
    100% { transform:translateX(-100%); }
  }
</style>