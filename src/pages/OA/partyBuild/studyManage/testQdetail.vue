<template>
    <div>
        <p>{{question}}</p>
  <el-radio v-model="radio" label="1">备选项</el-radio>
  <el-radio v-model="radio" label="2">备选项</el-radio>
   <el-radio v-model="radio" label="3">备选项</el-radio>
  <el-radio v-model="radio" label="4">备选项</el-radio>
  <p>回答正确</p>
  <p>{{c}}</p>
  <p>解析</p>
  <p>{{p}}</p>

    </div>
</template>

<script>
export default {
    name:'Questiondetail',
    data(){
        return{
            radio:'1',
            question:'aaaaaaaaaaaaaaaa(  ) aaaa',
            c:'aaaaaaaaaaaa',
            p:'bbbbbbbbbbbbbb'
        }
    },
    methods:{
        //新增提交表单
    addSubmit(){
 this.$emit('closeAddDio',false)
    },
    //关闭弹窗
    close(){
        this.$emit('closeAddDio',false)
    },
    }
}
</script>