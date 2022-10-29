<script>
import EmptyList from '../components/EmptyList.vue'
import ListCard from '../components/ListCard.vue'
import ModalAdd from '../components/ModalAdd.vue'
import { mapState, mapActions, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default{
    data(){
        return{
           
        }
    },
    components:{
        EmptyList,
        ModalAdd,
        ListCard,
    },
    methods:{
        ...mapActions(useCounterStore,["getDetail","getTask","getList","updateActivity"]),
        activityTitleUpdate(){
            this.updateActivity({
                id: this.$route.params.id,
                title: this.title
            })
        },
        backToHome(){
            this.$router.push('/')
        },
        showUp(){
            const options = {
  placement: 'bottom-right',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  onShow: () => {
      console.log('modal is shown');
  }
 
};
            const test= document.getElementById("defaultModal")
            const modal= new Modal(test,options)
            modal.show()
         
            console.log("halo")
        }

        
    },
    computed:{
        ...mapWritableState(useCounterStore,["detail","listActivity","title"])
    },
    created(){
        this.getDetail(this.$route.params.id)
        this.getList(this.$route.params.id)
        this.getTask()
        this.title= this.detail.title
    },
    mounted(){
        this.getDetail(this.$route.params.id)
        this.getList(this.$route.params.id)
        this.getTask()
      
    }
}
</script>

<template>
    <div>
        <div>
        <ModalAdd/>
        </div>
    <div style="margin: 0px 174.5px;" class="flex justify-between">
        <div class="flex mt-5">
            <button data-cy="todo-back-button" @click="backToHome()"><img src="https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767523-1502427.png" alt="" style="width: 80px;"></button>
            <input @change="activityTitleUpdate()" class=" font-bold focus:outline-none focus:border-b-2" style="font-size: 20pt;" v-model="title" data-cy="todo-title" />
        </div>
        
        <div class="flex">
            <button data-cy="todo-sort-button" class="mt-7 mr-5"><img src="https://cdn-icons-png.flaticon.com/512/130/130898.png"  style="width: 30px;" alt=""></button>
            <button @click="showUp()" data-cy="todo-add-button" class="bg-sky-500 rounded-full w-40 h-12 font-semibold text-white flex justify-center mt-10 pt-2" style="font-size: 16pt;">+ TAMBAH</button>
        </div>
    </div>
    <div class="flex justify-center pt-10">
        <div v-if="listActivity.todo_items.length > 0" class="pb-10"> 
        <ListCard data-cy="todo-item" v-for="(el, index) in listActivity.todo_items" :key="index" :el="el"/>
        </div>
        <div v-if="listActivity.todo_items.length == 0">
        <button @click="showUp()">
        <EmptyList data-cy="todo-empty-state" />
        </button>
        </div>
    </div>
    </div>
</template>