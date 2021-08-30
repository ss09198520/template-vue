<template>
  <v-card
    tile
    v-bind="$attrs"
    width="250"
    v-on="$listeners"
  >
    <v-card-title
      class="text-body-2 pa-3"
      :class="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
    >
      <span v-if="data && data.notifications && data.notifications.length > 0">
        您有 {{ data.notifications.length }} 則{{ enumType[data.type] }}
      </span>
      <span v-else>您目前沒有新的訊息</span>
    </v-card-title>

    <v-card-text class="pa-0">
      <div
        v-if="!loaded"
        class="text-center"
      >
        <v-progress-circular
          class="my-2"
          color="secondary"
          indeterminate
        />
      </div>
      <template v-if="data && data.type === 1">
        <v-list
          v-if="loaded && data.notifications && data.notifications.length > 0"
          dense
          max-height="180"
          style="overflow-y: scroll"
        >
          <v-list-item
            v-for="item in data.notifications"
            :key="item.id"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list>
      </template>
      <template v-if="data && data.type === 2">
        <v-list
          v-if="loaded && data.notifications && data.notifications.length > 0"
          dense
          three-line
          max-height="180"
          style="overflow-y: scroll"
        >
          <v-list-item
            v-for="item in data.notifications"
            :key="item.id"
            link
          >
            <v-list-item-content class="align-self-auto">
              <v-list-item-title
                class="primary--text"
                v-text="item.title"
              />
              <v-list-item-subtitle v-text="item.text" />
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text v-text="item.time" />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </template>
      <template v-if="data && data.type === 3">
        <v-list
          v-if="loaded && data.notifications && data.notifications.length > 0"
          dense
          max-height="180"
          style="overflow-y: scroll"
        >
          <v-list-item
            v-for="item in data.notifications"
            :key="item.id"
            link
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
              <v-list-item-subtitle>
                <v-progress-linear
                  :value="item.persentage"
                  :color="item.color"
                  height="10"
                  striped
                />
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text v-text="item.persentage + '%'" />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </template>
    </v-card-text>

    <a
      v-if="data && data.seeAllLink"
      :href="data.seeAllLink"
    >
      <v-card-actions
        class="text-body-2 ma-0 pa-3"
        :class="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      >
        查看全部 <v-icon color="primary">mdi-chevron-right</v-icon>
      </v-card-actions>
    </a>
  </v-card>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      data: {
        type: [Object],
        default: undefined,
      },
    },
    data() {
      return {
        enumType: {
          1: '新通知',
          2: '新訊息',
          3: '待辦事項',
        },
        loaded: false,
      }
    },
    mounted() {
      setTimeout(() => {
        this.loaded = true
      }, 1000)
    },
  }
</script>

<style lang="scss" scoped></style>