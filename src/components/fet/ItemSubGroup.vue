<template>
  <fet-item-group
    :item="item"
    :base-path="basePath"
    text
    sub-group
  />
</template>

<script>

  export default {
    props: {
      item: {
        type: Object,
        require: true,
      },
      basePath: {
        type: String,
        default: ''
      },
    },
    mounted() {
      console.log('sub-group', this.item)
      console.log('sub-group', this.basePath)
    },
  }
</script>
