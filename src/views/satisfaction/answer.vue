<template>
  <questionnaire-view :is-view="false" />
</template>

<script>
import QuestionnaireView from './components/QuestionnaireView'

export default {
  name: 'AnswerQuestionnaire',
  components: { QuestionnaireView }
}
</script>