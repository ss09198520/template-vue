  <!--<template>
    <v-list-item-action>
      <v-icon v-text="icon"></v-icon>
   </v-list-item-action> 
</template>-->

<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { title } = context.props
    const vnodes = []
      console.log(context)
      vnodes.push(<v-icon>mdi-chart-bubble</v-icon>)
      vnodes.push(<v-list-item-title v-text={title} />)

    return h('v-list-item-title',
          { attrs: { text: 'title' } },
          [title]
    )
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
