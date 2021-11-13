<template>
  <program-edit-view :is-edit="true" />
</template>

<script>
import ProgramEditView from './components/ProgramEditView'

export default {
  name: 'ProgramEditView',
  components: { ProgramEditView }
}
</script>