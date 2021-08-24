<template>
  <v-card
    v-bind="$attrs"
    :class="$vuetify.theme.dark ? 'grey darken-4' : ''"
    v-on="$listeners"
  >
    <v-list
      v-show="isHeadless"
      ref="cardHeader"
      dense
      :color="headerColor"
      :style="drag ? 'cursor: move;' : ''"
    >
      <v-list-item
        dense
        style="min-height: auto"
      >
        <v-list-item-content
          v-if="!title && !subtitle"

          class="white--text pa-0"
        >
          <slot name="header" />
        </v-list-item-content>
        <v-list-item-content
          v-else
          class="pa-0"
        >
          <v-list-item-title
            v-if="title"
            class="white--text"
          >
            <h4
              class="font-weight-light ma-0"
              v-text="title"
            />
          </v-list-item-title>
          <v-list-item-subtitle v-if="subtitle">
            <p
              class="font-weight-thin ma-0"
              v-text="subtitle"
            />
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="ma-0 flex-row align-center">
          <v-icon
            v-if="collapse && !$attrs.height"
            icon
            @click="show = !show"
          >
            {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
          <v-icon
            v-if="drag"
            small
          >
            mdi-arrow-all
          </v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-expand-transition>
      <div
        v-show="show"
        :style="show ? 'height:' + cardContentHeight : ''"
        style="overflow: auto;"
      >
        <v-card-text>
          <slot />
        </v-card-text>

        <v-card-actions v-if="$slots.actions">
          <slot name="actions" />
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      headless: {
        type: Boolean,
        default: true,
      },
      title: {
        type: String,
        default: '',
      },
      subtitle: {
        type: String,
        default: '',
      },
      headerColor: {
        type: String,
        default: 'grey darken-3',
      },
      collapse: {
        type: Boolean,
        default: false,
      },
      drag: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        show: true,
        cardContentHeight: '',
        isHeadless: Boolean(this.headless),
      }
    },

    mounted() {
      this.cardContentHeight = this.calcCardContentHeight()
    },
    methods: {
      calcCardContentHeight() {
        return `calc(100% - ${this.$refs.cardHeader.$el.clientHeight}px)`
      },
    },
  }
</script>

<style lang="scss" scoped>
.theme--light {
  .v-list-item .v-list-item__subtitle {
    color: rgba(255, 255, 255, 0.7);
  }
}
</style>