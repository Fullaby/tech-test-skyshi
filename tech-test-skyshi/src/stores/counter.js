import { defineStore } from 'pinia'
import axios from 'axios'
export const useCounterStore = defineStore({
  id: "tech-test",
  state: ()=>({
    task: "",
    detail: "",
    listActivity:"",
    detailList:"",
    title: "",
    priority: "",
    is_active: "",
    idTodo: "",
    activity_group_id: "",
    titleTodo:""
  }),
  actions: {
    async getTask(){
      try {
        let {data}= await axios("https://todo.api.devcode.gethired.id/activity-groups?email=stevenleonardo57@gmail.com")
        console.log(data)
        this.task= data
      } catch (error) {
        console.log(error);
      }
    },

    async createTask(){
      try {
        let {data}= await axios("https://todo.api.devcode.gethired.id/activity-groups",{
          method: "post",
          data:{
            title: "New Activity",
            email: "stevenleonardo57@gmail.com"
          }
        })
        console.log("create new activity")
        this.getTask()
      } catch (error) {
        console.log(error);
      }
    },
    async delete(id){
      try {
        await axios(`https://todo.api.devcode.gethired.id/activity-groups/${id}`,{
          method: "delete"
        })
        this.getTask()
        console.log("delete success")
      } catch (error) {
        console.log(error);
      }
    },
    async getDetail(id){
      try {
        let {data}= await axios(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
        this.detail= data
        console.log(data)
        this.getTask()
        this.title= data.title
        
      } catch (error) {
        console.log(error);
      }
    },
    async createList(value){
      try {
        await axios("https://todo.api.devcode.gethired.id/todo-items",{
          method: "post",
          data: {
            activity_group_id: value.id,
            title: value.title,
            is_active: 0,
            priority: value.priority
          }
        })
        this.getList(value.id)
      } catch (error) {
        console.log(error);
      }
    },
    async getList(id){
      try {
        let {data}= await axios(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
        this.listActivity= data
        console.log(data)
        this.getTask()
   
      } catch (error) {
        console.log(error);        
      }
    },
    async deleteActivity(id,groupId){
      try {
        await axios(`https://todo.api.devcode.gethired.id/todo-items/${id}`,{
          method:"delete"
        })
        console.log(("success"));
        this.getList(groupId)
      } catch (error) {
        console.log(error);
      }
    },
    async listDetail(id,groupId){
      try {
        let {data}= await axios(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
        this.getList(groupId)
        this.titleTodo= data.title
        this.is_active= data.is_active
        this.priority= data.priority,
        this.activity_group_id= data.activity_group_id
        this.idTodo= data.id
        console.log(data, "HALO DARI COUNTER")
        this.detailList= data
      } catch (error) {
        console.log(error);
      }
    },
    async updateActivity(value){
      try {
        await axios(`https://todo.api.devcode.gethired.id/activity-groups/${value.id}`,{
          method:"patch",
          data:{
            title: value.title
          }
        })
        this.getTask()
      } catch (error) {
        console.log(error);
      }
    },
    async updateTodo(value){
      try {
        await axios(`https://todo.api.devcode.gethired.id/todo-items/${value.id}`,{
          method: "patch",
          data: {
            title: value.title,
            priority: value.priority,
            is_active: value.is_active
          }
        })
        this.getList(value.activity_group_id)

      } catch (error) {
        console.log(error);
      }
    }
  }
})
