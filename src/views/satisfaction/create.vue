<template>
  <questionnaire-view :is-edit="false" />
</template>

<script>
import QuestionnaireView from './components/QuestionnaireEditView'

export default {
  name: 'CreateQuestionnaire',
  components: { QuestionnaireView }
}
</script>