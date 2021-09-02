import Vue from 'vue' 
let vue = new Vue()

/*
EventBus
  Stage Control : 狀態控制，讓各頁面知道自己目前在哪個階段 (e.g. 選擇手機→選擇促案→證號查詢...)
*/
const EventBus = {
  publish(functionName,...datas){
    vue.$emit(functionName,...datas);
  },
  subscriber(functionName,_function){
    vue.$off(functionName);
    vue.$on(functionName,_function);
  },
  clearAll(){
    vue.$off();
  }
}

export default EventBus;