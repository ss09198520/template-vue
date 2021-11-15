<template>
  <program-view :is-edit="true" />
</template>

<script>
import ProgramView from './components/ProgramEditView'

export default {
  name: 'ProgramEditView',
  components: { ProgramView }
}
</script>