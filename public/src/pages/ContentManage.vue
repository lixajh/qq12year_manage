<template>
<div style="height: 100%;">
<calendar class='left-float'
    :value="value"
    :disabled-days-of-week="disabled"
    :format="format"
    :clear-button="clear"
    :placeholder="placeholder"
    :pane="1"
    :has-input="false"
    :on-day-click="onDayClick2"
    
  ></calendar>
<div id="editor">
  <textarea :value="input" @input="update"></textarea>
  <div v-html="compiledMarkdown"></div>
</div>
</div>
</template>

<script>
import marked from 'marked'
import lodash from 'lodash'
import Calendar from 'vue2-slot-calendar'

var data = {
  input : "hello",
  disabled: [],
  value: '2015-01-01',
  format: 'yyyy-MM-dd',
  clear: true,
  placeholder: 'placeholder is displayed when value is null or empty',
  _dateMap:{}
}
export default {
  name: 'contentmanage',
  components: {
    // <my-component> 将只在父组件模板中可用
    'Calendar': Calendar
  },
  data:  function () {
    return data
    },
  computed: {
    compiledMarkdown: function () {
     
      return marked(data.input, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      data.input = e.target.value
    }, 300),

    onDayClick2: function(){
    alert("aa")
  }
    
  },
 
  // watch: {
  //   '$route': 'fetchList'
  // },

  mounted () {
    // if(this.$route.params.day === '2017-12-09'){
    // let m_song1s = [
      
    //   {
    //     title: '2017-12-09 嘉宾：马未都',
    //     author: '锵锵三人行',      
    //     url: 'http://198.46.248.122:8888/2009-01-13.mp3',
    //     pic: 'http://devtest.qiniudn.com/Preparation.jpg'
    //   }
    
    // ]

    // this.$store.commit('SET_SONGS', m_song1s)
    // }else{
    //   let m_song1s = [     
    //     {
    //       title: '2017-12-08 嘉宾：马未都',
    //       author: '锵锵三人行',      
    //       url: 'http://198.46.248.122:8888/2014-01-15.mp3',
    //       pic: 'https://avatars0.githubusercontent.com/u/1683811?s=400&v=4'
    //     }  
    //   ]
    //   this.$store.commit('SET_SONGS', m_song1s)
    // } 
  
  // console.log('aab'+this.$route.params.day)
  // this.$store.commit('SET_DATE', this.$route.params.day)   
  },

//   beforeMount () {
//   let day = this.$route.params.day  
//       console.log(day)

//      this.$store.dispatch('FETCH_CONTENT',{ date: day}).then(
//       content => {
//         console.log(content)
//  console.log(content.data)
//   console.log(content.data.audio)
//          let m_song1s = [     
//         {
//           title: day,
//           author: '锵锵三人行',      
//           url: content.data.audio,
//           pic: 'https://avatars0.githubusercontent.com/u/1683811?s=400&v=4'
//         }  
//       ]
//       this.$store.commit('SET_SONGS', m_song1s)
//       this.$store.commit('SET_DATE', this.$route.params.day)   
//       }
//     )
//   }


}

</script>

<style>

html, body {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

 #editor {
  margin-left: 100px;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}
.left-float{
  float:left
}
textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>


