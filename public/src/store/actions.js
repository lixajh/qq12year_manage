import {
  fetchIndex,
  fetchDaily,
  fetchTest,
  fetchContent,
  fetchNews,
  saveNews,
} from '../api'


export default {
  // the index.json
  FETCH_INDEX ({ commit, dispatch, state }) {
    return state.calendar
    ? { calendar: state.calendar, 
        days: state.days, 
        today: state.today 
      }
    : fetchIndex().then(data => {

      let calendar = data
        , days = Object.keys(calendar)
        , today = ([...days].pop()).split('.')[0]

      commit('SET_CALENDAR', data)
      commit('SET_TODAY', today)
      commit('SET_DAYS', days)

      return Promise.resolve({ calendar, days, today })
    })
  },

  FETCH_DAILY ({ commit, dispatch, state }, { day: day }) {

    if (day === 'today') {
      day = state.today
    }
    if (state.dailys[day+'.daily']) {
      return state.dailys[day +'.daily']
    }
    else {
      let requestObjectID = state.calendar[day+'.daily']
      return fetchDaily(requestObjectID).then(data => {
        commit('SET_DAILY', { day: day + '.daily', data: data })
        return data
      })
    }
  },
  FETCH_TEST ({ commit, dispatch, state }) {
    return fetchTest()
    .then(data => {
     
      let days = data['date']
      console.log("json:" + days)
      commit('SET_DAYS', days)

      return Promise.resolve({ days })
    })
  },

  FETCH_CONTENT ({ commit, dispatch, state }, { date: day }) {
    console.log("df"+day)
    return fetchContent(day)
    .then(data => {
     
      // commit('SET_DAYS', data)

      return Promise.resolve({ data })
    })
  },

  FETCH_NEWS ({ commit, dispatch, state }, { date: day }) {

    return fetchNews(day).then(responseBean => {
      if(responseBean.code != 200 || responseBean.message != "SUCCESS"){
        return Promise.reject("获取数据失败")
      }
      console.log("ccc:" + responseBean)
      return Promise.resolve(responseBean )
    })
  },
  SAVE_NEWS ({ commit, dispatch, state }, serverBean) {
    
        return saveNews(serverBean)
        .then(respinseBean => {
          if(respinseBean.code != 200 || respinseBean.message != "SUCCESS"){
            return Promise.reject("获取数据失败")
          }
          // commit('SET_DAYS', data)
    
          return Promise.resolve(respinseBean.data )
        })
      }
}