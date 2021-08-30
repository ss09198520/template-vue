<template>
  <v-list-item
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="to"
    :active-class="color"
    class="v-list-item"
    :style="`min-height : 44px`"
  >

    <v-list-item-icon v-if="item.meta.icon">
      <v-icon v-text="item.meta.icon" />
    </v-list-item-icon>

    <v-list-item-title v-text="item.meta.title" />
  </v-list-item>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {

    mixins: [Themeable],

    props: {
      item: {
        type: Object,
        required: true
      },
      to: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      },
    },
    computed: {
      href () {
        return this.item.href || (!this.item.to ? '#' : undefined)
      },
    },
  }
</script>

<style lang="scss">
.v-list-group__items .v-list-item__icon {
  margin-left: 15px;
}
.v-list-item--dense .v-list-item__icon {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
</style>