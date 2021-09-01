<template>
  <div class="components-container">
    <aside>
      Based on <a class="link-type" href="https://github.com/rowanwins/vue-dropzone"> dropzone </a>.
    </aside>
    <div class="editor-container">
      <dropzone id="myVueDropzone" url="https://httpbin.org/post" :options="dropzoneOptions" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
    </div>
  </div>
</template>

<script>
import Dropzone from '@/components/Dropzone'

export default {
  name: 'DropzoneDemo',
  components: { Dropzone },
  data: function () {
    return {
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
      }
    }
  },
  methods: {
    dropzoneS(file) {
      console.log('this.$message', this.$message)
      console.log(file)
    },
    dropzoneR(file) {
      console.log(file)
    }
  }
}
</script>

