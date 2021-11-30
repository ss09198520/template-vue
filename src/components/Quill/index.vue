<template>
  <quill-editor
    :id="quillId"
    ref="vueQuillEditor"
    :value="content"
    :options="editorOption" 
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)"
  />
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
// 引入样式，此时样式是直接从quill文件中直接引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import toolbar from './toolbar'

export default {
  name: 'Quill',
  components: { quillEditor },
  props: {
    id: {
      type: String,
      default: function() {
        return 'quill-vue' + +new Date() + ((Math.random() * 10).toFixed(0) + '')
      }
    },
    content: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      // content: this.value,
      hasChange: false,
      hasInit: false,
      quillId: this.id,
      fullscreen: false,
      editorOption: {
        modules: {
          toolbar: toolbar
        },
        placeholder: '請設定跑馬燈內容', //提示
        readyOnly: false, //是否只讀
        theme: 'snow', //主題 snow/bubble
        syntax: true, //語法檢測
     },
    }
  },
  computed: {
    editor() {
      return this.$refs.vueQuillEditor.quill;
    },
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  },
  methods: {
    // components: { Editor },
    onEditorBlur() {
      //console.log('editor blur!', quill)
    },
    //獲得焦點
    onEditorFocus() {},
    // 開始
    onEditorReady() { },
    // 值發生變化
    onEditorChange(editor) {
      this.$emit('change', editor.html );
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  line-height: normal;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

</style>
