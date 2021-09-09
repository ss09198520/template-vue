<template>
  <v-list-group 
    v-if="!item.hidden"
    :sub-group="subGroup"
    append-icon="mdi-chevron-down"
    prepend-icon=""
    color="primary"
  >

    <template v-slot:activator>
      <v-list-item-action v-if="item.meta.icon">
        <v-icon v-text="item.meta.icon" />
      </v-list-item-action>
      <v-list-item-title v-text="item.meta.title" />
    </template>

    <template v-for="child in item.children">
      <fet-item 
        v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)"
        :key="resolvePath(child.path)" 
        :item="child" 
        :to="resolvePath(child.path)"
        :color="color"
      />
      
      <fet-item-sub-group v-else :key="resolvePath(child.path)"  :item="child" :base-path="resolvePath(child.path)" :color="color"/>
    </template>
  </v-list-group>
</template>

<script>
  // Utilities
  import path from 'path'
  import { isExternal } from '@/utils/validate'
  
  export default {

    inheritAttrs: false,
    props: {
      item: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      },
      subGroup: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
      // TODO: refactor with render function
      this.onlyOneChild = null
      return {}
    },
    mounted() {
      console.log('subGroup', this.subGroup)
    },

    methods: {
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })
        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length >= 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          return true
        }
        return false
      },

      onlyOneChild() {
        if (!this.item.children) {
          return this.item
        }
        let oneChild
        const showingChildren = this.item.children.filter(item => {
          if (!item.hidden) {
            oneChild = item
          }
          return !item.hidden
        })

        if (showingChildren.length > 1) return false

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return oneChild
        }

        if (showingChildren.length === 0) {
          return { ... parent, path: '', noShowingChildren: true }
        }

        return oneChild
      },

      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      },
    },
  }
</script>

<style>
.v-list-group__activator p {
  margin-bottom: 0;
}
.v-list-item__action {
    margin-right: 32px !important;
}
</style>
