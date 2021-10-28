<template>
  <questionnaire-view :is-edit="true" />
</template>

<script>
import QuestionnaireView from './components/QuestionnaireView'

export default {
  name: 'AnswerQuestionnaire',
  components: { QuestionnaireView }
}
</script>

