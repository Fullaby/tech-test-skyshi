<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default{
    data(){
        return{
            title:"",
            priority: "very-high"
        }
    },
    methods:{
        ...mapActions(useCounterStore,["createList"]),
        closeModal(){
            const options = {
  placement: 'bottom-right',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed',
  onHide: () => {
    document.querySelector('[modal-backdrop]').remove();
      console.log('modal is hidden');
  }
};
            const test= document.getElementById("defaultModal")
            const modal= new Modal(test,options)
            modal.hide()
            
            console.log("halo")

        },
        addActivity(){
            const options = {
  placement: 'bottom-right',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed',
  onHide: () => {
    document.querySelector('[modal-backdrop]').remove();
      console.log('modal is hidden');
  }
};
            const test= document.getElementById("defaultModal")
            const modal= new Modal(test,options)
            modal.hide()
          
            this.createList({
               id: this.$route.params.id,
               title: this.title,
               priority: this.priority
            })
            this.title= ""
            this.priority= "very-high"
        }
    }
}
</script>
<template>
    <div>
        <!-- Main modal -->
<div id="defaultModal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <form action="">
        <div class="relative bg-white rounded-lg shadow">
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b">
                <h3 class="text-xl font-semibold text-gray-900" data-cy="modal-add-title">
                  Tambah List Item
                </h3>
                <button @click="closeModal()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only" data-cy="modal-add-close-button">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div>
                <p data-cy="modal-add-name-title">Nama List Item:</p>
                <input data-cy="modal-add-name-input" v-model="title" type="text" class="rounded-xl mt-2" style="width: 550px;" placeholder="Tambahkan nama Activity">
                <p data-cy="modal-add-priority-title" class="pt-5">Priority:</p>
                <select data-cy="modal-add-priority-dropdown" v-model="priority" name="" id="" class="pl-5 rounded-xl mt-2" style="width: 200px; height: 50px;">
                    <option data-cy="modal-add-priority-very-high" value="very-high" selected>Very High</option>
                    <option data-cy="modal-add-priority-high" value="high">High</option>
                    <option data-cy="modal-add-priority-medium" value="normal">Medium</option>
                    <option data-cy="modal-add-priority-low" value="low">Low</option>
                    <option data-cy="modal-add-priority-very-low" value="very-low">Very Low</option>
                </select>
              </div>
            </div>
            <!-- Modal footer -->
            <div v-if="title.length > 0" class="flex justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button data-cy="modal-add-save-button" @click.prevent="addActivity"  data-modal-toggle="defaultModal" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
            </div>
            <div v-if="title.length == 0" class="flex justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button  data-cy="modal-add-save-button" disabled data-modal-toggle="defaultModal" type="button" class="text-white bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300  dark:focus:ring-blue-800">Simpan</button>
            </div>
        </div>
    </form>
    </div>
</div>

    </div>
</template>