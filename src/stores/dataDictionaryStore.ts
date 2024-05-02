// src/stores/dataDictionaryStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export const useDataDictionaryStore = defineStore({
  id: 'dataDictionary',
  state: () => ({
    dataDictionary: {}
  }),
  actions: {
    async fetchDataDictionary() {
      const response = await axios.post('/api/system/dict')
      //解析red.data.data中的json数据
      this.dataDictionary = JSON.parse(response.data.data)
    }
  }
})
