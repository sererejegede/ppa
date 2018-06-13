import Vue from 'vue'

const API_URL = `http://localhost:8000/api`

export default {
  get (url) {
    return Vue.http.get(`${API_URL}/${url}`)
  },
  post (url, data = {}) {
    return Vue.http.post(`${API_URL}/${url}`, data)
  }
}
