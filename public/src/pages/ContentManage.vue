<template>
<div >

  <Slideout menu="#menu" panel="#panel" :toggleSelectors="['.toggle-button']" @on-open="open">
      <nav id="menu">
                  
      <calendar style="margin_left:2px;"
          :value="value"
          :disabled-days-of-week="disabled"
          :format="format"
          :clear-button="clear"
          :placeholder="placeholder"
          :pane="1"
          :borderWidth="borderWidth"
          :has-input="false"
          :on-day-click="onDayClick2">
        </calendar>

        <ul>
          <li class="menu-li"  v-for="(menu, index) in menus"  @click="onMenuClick(index)" :key="menu.name" :class="{ currentItem: menu.selected}">
            {{menu.name}}
          </li>
        </ul>
        <button @click="save">保存</button>
         
      </nav>
      <main id="panel">
        <header style="height: 5550px">
          <div style="height: 100%;">
            <button class="toggle-button">☰</button>
 
            <div id="editor">
              <textarea :value="input" @input="update"></textarea>
              <div v-html="compiledMarkdown"></div>
            </div>
          </div>
        </header>
      </main>
    </Slideout>

</div>
</template>

<script>
import marked from 'marked'
import lodash from 'lodash'
import Calendar from 'vue2-slot-calendar'
import Slideout from 'vue-slideout'

    
var serverBean={
  date : null,
  news1 : "",
  news2 : '',
  newsMd1 : '',
  newsMd2 : ''

}
var data = {
  input : "hello",
  disabled: [],
  value: '2015-01-01',
  format: 'yyyy-MM-dd',
  clear: true,
  placeholder: 'placeholder is displayed when value is null or empty',
  _dateMap:{},
  borderWidth:222,
  currentEditDate: '',
  menus:[ 
    {name:"维基新闻",
            selected:true,
            contentMd:"",
            contentHtml:""
            },
      {name:"百度新闻",
    selected:false,
             contentMd:"",
            contentHtml:""},
      {name:"当当当当",
    selected:false,
             contentMd:"",
            contentHtml:""},
],
}
export default {
  name: 'contentmanage',
  components: {
    // <my-component> 将只在父组件模板中可用
    'Calendar': Calendar,
     'Slideout': Slideout
  },
  data:  function () {
    return data
    },
  computed: {
    compiledMarkdown: function () {
     
      return marked(data.input, { sanitize: true })
    },
  },
  methods: {
    update: _.debounce(function (e) {
      data.input = e.target.value
    }, 300),

    onDayClick2: function(date){
    data.currentEditDate = date.toISOString().slice(0,10)
     this.$store.dispatch('FETCH_NEWS',{ date: data.currentEditDate}).then(
      content => {
        console.log(content)
        
      }
    )
  },
   open: function () {
        console.log('open event')
      },
    onMenuClick: function(index){
      data.menus.forEach(element => {
        if(element.selected){
          element.contentMd = data.input;
          element.contentHtml =  marked(data.input, { sanitize: true })
        }
        element.selected = false;
      });
      
      data.menus[index].selected = true
      data.input = data.menus[index].contentMd
    },
    save: function(){

    },
    

    
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
.currentItem{
  color:#f66;
}
.menu-li{
  height: 50px;
  line-height: 50px;
  padding-left:20px;
  border-bottom:1px solid;
  cursor:pointer;
}
 #editor {
  margin-left: 100px;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
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

.slideout-menu {
    position: fixed;
    top: 0;
    padding: 10px;
    bottom: 0;
    width: 222px;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
    display: none;
    background-color: rgb(246, 247, 239);
    color: black;
  }



  .slideout-panel {
    /* background-color: #4B5;
    color: white; */
    position: relative;
    z-index: 1;
    will-change: transform;
    min-height: 100vh;
  }

  .slideout-open body,
  .slideout-open .slideout-panel {
    overflow: hidden;
  }

  .slideout-open .slideout-menu {
     overflow: hidden;
    margin-top: 155px;
    display: block;
  }

</style>


