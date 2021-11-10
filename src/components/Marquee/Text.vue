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
      fontWeight: {
        type: String,
        default: 'bold'
      },
      fontItalic: {
        type: String,
        default: 'normal'
      },
    },
    render(h, { $style, props: { duration, repeat, paused, reverse }, children, data: { staticClass, key, on } }) {
      // console.log('$style', $style)
      // console.log('children', children[0].text)
      // '台灣電力公司跑馬燈輪播測試!!! :   今日預告台北將不會停電!!!!'
      const text = h('div', {
        class: [
          $style.text,
          'marquee',
        ],
        style: {
          animationDuration: `${duration}s`,
          // color: fontColor,
          // backgroundColor: backgroundColor,
          // fontWeight: fontWeight,
          // fontStyle: fontItalic,
          animationDirection: reverse ? 'reverse' : undefined
        },
        domProps: {
          innerHTML: children[0].text,
        },
      }, children)
      
      return h('div', {//Text_wrap
        key,
        on,
        class: [
          'v-list-item',
          staticClass,
          $style.wrap
        ],
      }, [
        h('div', {//Text_content
          class: [
            paused
              ? $style.paused
              : undefined,
            $style.content
          ],
        }, Array(repeat).fill(text))
      ])
    }
  }
</script>

<style>
.marquee.span{
  height:50px;
}
div.marquee .ql-size-small {
    font-size: 0.75em;
}

div.marquee .ql-size-large {
    font-size: 1.25em;
}

div.marquee .ql-size-huge{
    font-size: 1.50em;
}

div.marquee > b, strong {
    font-weight: bolder !important;
    font-size: inherit;
    
}
div.marquee > h1, h2, h3, .h1, .h2, .h3 {
    margin-top: 0px;
    margin-bottom: 0px !important;
}
div.marquee >p{
  font-size: 32px !important;
  margin: 0px;
  font-weight: normal !important;
  display:inline;
} 

div.marquee > span {
   font-weight: normal !important;
   font-size: 32px !important;
}
</style>

<style module>
  /* for quill editor style */
  div.ql-editor > p ,b, strong {
    font-size: 0.8cm !important;
    margin-top: 15px;
    margin: 0 !important;
  }
  .wrap {
    overflow: hidden;
  }
  .content {
    width: 2000px;
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
