<template>
  <v-app>
    <v-app-bar
      app
      color=""
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
      {{qqq}}
    </v-main>
  </v-app>
</template>

<script>


import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    qqq:'!@#!@#!@#'
  }),

  created () {
    console.log(this)
    console.log('created : ' + this._isVue)
  },
  mounted () {
    console.log('mounted')
  },
  beforeMount () {
    // start progress bar
    console.log('beforeMount')
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
};

let a;
a = [5, 10, 15]; 
console.log(a);

let aa,d,c;
[aa, d, ...c] = [5, 10, 15, 20, 25];
console.log(aa);

console.log(d);

console.log(a,aa,d,c);

  

  for( var i = 0; i < 5; i++ ) {
      setTimeout( ()=> {
        console.log('setTimeout前', i)
      }, 1000)
  }

  // for( var i = 0; i < 5; i++ ) {
  //   console.log('setTimeout前',i);
  //   ((i) => {
  //     setTimeout( ()=> {
  //       console.log(i)
  //     }, 1000)
  //   })(i);
  // }

console.log('role ')
const { role: aaa } = { role: 10 }
console.log({ role: aaa });

// 在 JS 的程式碼插入 HTML 內容，我們需要這樣寫
const cityFieldEs5 = '<div>\n' + '<ol>\n' + '<li>\n' + '</li>\n'+ '</ol>\n'+ '</div>\n'

// 上面寫的方式相當複雜且不易閱讀，如果透過 ES6 的字串模組語法，我們可以這樣寫
const cityFieldEs6 = `
<div>
  <ol>
    <li>
    </li>
  </ol>
</div>
`
console.log(cityFieldEs5 , cityFieldEs6);


const mathDouble = (a) => { // 箭頭函式表達式寫法
  return a * 2;
}

const mathDouble2 = (a,b) => { // 箭頭函式表達式寫法
  return a * 2 / b ;
}

const mathDouble3 = (a) => a * 2;

console.log(`asas`,  mathDouble (10) ,mathDouble2(20,2)) // 呼叫函式
console.log(status);
console.log(mathDouble3(2));
// 另一個範例是在字串模組串中嵌入變數，以作者這裡最近很常接 API 的格式為範例
// Sample 1
// export const fetchMasterDownloadUrl = (masterNumber, attachmentType) => (attachmentId) => () => {
//   // 下載文件的 API 中，我們使用了 masterNumber、attachmentType、attachmentId 這三個變數，故也需要使用字串模組
//   const url = `/documents/masters/${masterNumber}/attachments/${attachmentType}/${attachmentId}`
//   return API.get(url).then((response) => {
//     const { data } = response // 這個是解構的寫法
//     if (data && data.errors !== undefined) {
//       return Promise.reject(data.errors)
//     }
//     const { download_url } = data // 這個是解構的寫法
//     if (!download_url) {
//       return Promise.reject(translate('api.error.noDownloadUrl'))
//     }
//     return Promise.resolve({
//       downloadUrl: download_url
//     })
//   }).catch(error => {
//     if (!error.response || !error.response.data) { return Promise.reject(error) }
//     const { errors, message } = error.response.data
//     if (message) { return Promise.reject(message) }
//     if (errors) { return Promise.reject(errors) }
//     return Promise.reject(error)
//   })
// }

</script>
