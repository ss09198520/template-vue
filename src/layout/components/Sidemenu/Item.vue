<template>
  <v-list-item
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="to"
    :active-class="color"
    class="v-list-item"
  >
    <!-- <v-list-item-icon
      v-if="text"
      class="v-list-item__icon--text"
      v-text="computedText"
    /> -->

    <v-list-item-icon v-if="item.meta.icon">
      <v-icon v-text="item.meta.icon" />
    </v-list-item-icon>

    <v-list-item-title v-text="item.meta.title" />
  </v-list-item>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'Item',

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

<style>
.v-list-group__items .v-list-item__icon {
  margin-left: 15px;
}
</style>