<template>
  <questionnaire-view :is-view="true" />
</template>

<script>
import QuestionnaireView from './components/QuestionnaireView'

export default {
  name: 'PreviewQuestionnaire',
  components: { QuestionnaireView }
}
</script>

