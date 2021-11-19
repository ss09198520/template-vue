<template>
  <questionnaire-view :is-edit="true" />
</template>

<script>
import QuestionnaireView from './components/QuestionnaireEditView'

export default {
  name: 'EditQuestionnaire',
  components: { QuestionnaireView }
}
</script>