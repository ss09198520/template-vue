<template>
  <questionnaireview-temp :is-view="false" />
</template>

<script>

import QuestionnaireviewTemp from './components/QuestionnaireViewTemp'

export default {
  name: 'AnswerQuestionnairetemp',
  components: { QuestionnaireviewTemp }
}
</script>