<script>
import Swal from 'sweetalert2'
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default{
    data(){
        return{
            
        }
    },
    props:["el"],
    methods:{
        ...mapActions(useCounterStore,["delete","getTask","getDetail"]),
        deleteTask(id){
            Swal.fire({
  title: `Apakah anda yakin menghapus activity “${this.el.title}”?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Yes, delete it!',
  cancelButtonColor: '#d33',
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
}).then((result) => {
  if (result.isConfirmed) {
    this.delete(id)
    this.getTask()
    Swal.fire(
      'Activity Berhasil Dihapus!',
      'Your activity has been deleted.',
      'success'
    )
  }
})
           
        },
        toDetail(id){
            this.$router.push(`/detail/${id}`)
            console.log(id)
        }
    },
    computed:{
        formatTanggal(){
            const options = {year: 'numeric', month: 'long', day: 'numeric' };
            return `${new Date(this.el.created_at).toLocaleDateString("id-ID", options)}`
        }
    },
    created(){
        this.getTask()
    }
}
</script>

<template>
    <div data-cy="activity-item" class="rounded-xl" style="width: 230px; height: 250px; box-shadow: 0 10px 40px -10px;">
        <div class="p-5 flex flex-col">
            <a class="hover:cursor-pointer" @click="toDetail(el.id)">
            <div class=" h-44">
        <h4 class="font-bold" style="font-size: 16pt" data-cy="activity-item-title">{{el.title}}</h4>
            </div>
            </a>
            <div class="flex justify-between">
        <p class=" text-neutral-400" style="font-size: 16pt;" data-cy="activity-item-date">{{formatTanggal}}</p>
        <button data-cy="activity-item-delete-button" @click="deleteTask(el.id)"><img src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png" class="pt-1" style="width:18px; height:25px;" alt="trash-icon"></button>
            </div>
        </div>
    </div>
</template>