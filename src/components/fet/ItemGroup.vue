<template>
  <v-list-group v-if="!item.hidden">
    <template v-slot:activator>
      <v-list-item-action>
        <v-icon v-text="item.meta.icon" />
      </v-list-item-action>
      <v-list-item-title v-text="item.meta.title" />
    </template>

    <template v-for="child in item.children">
      <fet-item 
        v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)"
        :item="child" 
        :key="resolvePath(child.path)" 
        :to="resolvePath(child.path)"
        :color="color">
      </fet-item>
      
      <fet-item-sub-group v-else :key="child.path" :item="child" :base-path="child.path" :color="color"/>
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
    },
    mounted() {
      console.log('mounted-group',  this.item);
      // console.log('!!item.children', !this.item.hidden && !!this.item.children && !!this.item.children.length);
    },
    data() {
      // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
      // TODO: refactor with render function
      this.onlyOneChild = null
      return {}
    },

    methods: {
      hasOneShowingChild(children = [], parent) {
        console.log('hasOneShowingChild', children , parent)
        console.log('basePath', this.basePath)
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            // console.log('this.onlyOneChild', this.onlyOneChild)
            return true
          }
        })
        console.log('showingChildren.length', showingChildren.length ,this.onlyOneChild)
        console.log('onlyOneChild.children', this.onlyOneChild.children)
        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length >= 1) {
          // console.log('showingChildren.length >= 1', parent.path)
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          // console.log('showingChildren.length === 0', this.onlyOneChild)
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

        // 可见的元素超过一个
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
</style>
