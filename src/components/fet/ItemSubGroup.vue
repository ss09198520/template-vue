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
        default: null,
      },
      basePath: {
        type: String,
        default: ''
      },
      subGroup: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>
