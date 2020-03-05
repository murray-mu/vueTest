<template>
  <el-tree
    class="filter-tree"
    :data="list"
    :props="defaultProps"
    default-expand-all
    ref="tree">
  </el-tree>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tmpOwnerName: '',
      count: 1,
      list: null,
      listLoading: true,
      defaultProps: {
        children: 'data',
        label: 'name'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        debugger
        this.list = sortBykey(response, 'Cat')
        this.listLoading = false
      })
    }

  },
  computed: {
    sortList: function() {
      return sortBykey(this.list, 'Cat')
    }
  }
}
function makeSort(dataArray) {
  for (var i = 1; i <= dataArray.length - 1; i++) {
    for (var j = 0; j <= dataArray.length - i - 1; j++) {
      if (dataArray[j].name >= dataArray[j + 1].name) {
        var temp = dataArray[j]
        dataArray[j] = dataArray[j + 1]
        dataArray[j + 1] = temp
      }
    }
  }
  return dataArray
}

function sortBykey(ary, key) {
  var newList = []
  var type = key
  var infoItem
  var Female = []
  var Male = []
  ary.forEach(item => {
    infoItem = item
    if (item.pets != null) {
      item.pets.forEach(pets => {
        if (pets.type === type) {
          var gender = infoItem.gender
          if (gender === 'Female') {
            Female.push(pets)
          } else {
            Male.push(pets)
          }
        }
      })
    }
  })

  var tempFemale = []
  var tempMale = []

  tempFemale['name'] = 'Female'
  tempFemale['data'] = makeSort(Female)
  tempMale['name'] = 'Male'
  tempMale['data'] = makeSort(Male)
  newList.push(tempFemale)
  newList.push(tempMale)
  return newList
}

</script>
