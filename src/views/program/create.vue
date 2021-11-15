<template>
  <program-view :is-edit="false" />
</template>

<script>
import ProgramView from './components/ProgramEditView'

export default {
  name: 'ProgramCreateView',
  components: { ProgramView }
}
</script>