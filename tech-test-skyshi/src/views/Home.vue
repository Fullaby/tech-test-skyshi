
<script>
import CardTask from '../components/CardTask.vue'
import EmptyState from '../components/EmptyState.vue'
import { useCounterStore } from '../stores/counter'
import {mapState, mapActions, mapWritableState} from 'pinia'

export default{
    data(){
        return{

        }
    },
    components:{
        CardTask,
        EmptyState
    },
    methods:{
        ...mapActions(useCounterStore,["getTask","createTask"]),
        create(){
            this.createTask()
            this.getTask()
        }
    },
    computed:{
        ...mapWritableState(useCounterStore,["task"])
    },
    created(){
      this.getTask()
    }
}
</script>

<template>
    <div>
        <div class=" mr-44 ml-44 ">
            <div class="mt-10 mb-10 flex justify-between">
        <h1 class="font-bold" style="font-size: 30pt;" data-cy="activity-title">Activity</h1>
        <button data-cy="activity-add-button" @click="create()" class="bg-sky-500 rounded-full w-40 font-semibold text-white flex justify-center pt-3.5" style="font-size: 16pt;">+ TAMBAH</button>
            </div>
            <div class="grid grid-cols-4 gap-4 pb-10"  v-if="task.data.length > 0 ">
            <CardTask v-for="(el, index) in task.data" :key="index" :el="el"/>
            </div>
            <EmptyState data-cy="activity-empty-state" @click="create()" v-if="task.data.length == 0"/>
        </div>
    </div>
</template>