<template>
  <div>
  <el-select @change="selectChanged" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <br>
    <br>
    <br>
  <el-table
    :data="tableData"
    style="width: 50%">

    <el-table-column
      prop="value1"
      label=""
      width="180">
    </el-table-column>
    <el-table-column
      prop="value2"
      label="">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { getCities, getWeather } from '@/api/weather'
export default {
  data() {
    return {
      tableData: [],
      options: [],
      value: 'Beijing'
    }
  },
  created() {
    this.fetchData()
    this.fetchWeather('101010100')
  },
  methods: {
    selectChanged(value) {
      this.value = value
      this.fetchWeather(value)
    },
    fetchData() {
      getCities().then(response => {
        debugger
        this.options = response
      })
    },
    fetchWeather(value) {
      getWeather(value).then(response => {
        debugger
        this.tableData = response
      })
    }
  }
}
</script>
