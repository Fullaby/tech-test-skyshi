<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import Swal from "sweetalert2";
import { useCounterStore } from "../stores/counter";

export default {
  data() {
    return {};
  },
  components: {
   
  },
  props: ["el"],
  methods: {
    ...mapActions(useCounterStore, [
      "deleteActivity",
      "getList",
      "updateTodo",
      "listDetail",
      
    ]),
    updateEditTodo(){
            const options = {
  placement: 'bottom-right',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed',
  onHide: () => {
    document.querySelector('[modal-backdrop]').remove();
      console.log('modal is hidden');
  }
};
            const test= document.getElementById("modalEdit")
            const modal= new Modal(test,options)
            modal.hide()
            this.updateTodo({
             id: this.el.id,
             title: this.titleTodo,
             is_active: this.is_active,
             priority: this.priority,
             activity_group_id: this.el.activity_group_id
            })
           this.titleTodo= "",
           this.priority= this.el.priority
        },
    checkNotActive() {
      this.updateTodo({
        is_active: 0,
        id: this.el.id,
        activity_group_id: this.el.activity_group_id,
      });
    },
    checkActive() {
      this.updateTodo({
        is_active: 1,
        id: this.el.id,
        activity_group_id: this.el.activity_group_id,
      });
    },
    deleteActivityButton(id, groupId) {
      Swal.fire({
        title: `Apakah anda yakin menghapus activity “${this.el.title}”?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonColor: "#d33",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteActivity(id, groupId);
          Swal.fire(
            "Activity Berhasil Dihapus!",
            "Your activity has been deleted.",
            "success"
          );
        }
      });
    },
    showUp() {
      const options = {
        placement: "bottom-right",
        backdropClasses:
          "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        onShow: () => {
          console.log("modal is shown");
        },
      };
      
      const test = document.getElementById("modalEdit");
      const modal = new Modal(test, options);
      console.log(this.el.id, "INI ANEH")
      console.log(this.titleTodo, "AYA<<<<AMAMMA")
      this.listDetail(this.el.id, this.el.activity_group_id);
      console.log(this.el.title)
      modal.show();
     
    },
    closeModal(){
            const options = {
  placement: 'bottom-right',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed',
  onHide: () => {
    document.querySelector('[modal-backdrop]').remove();
      console.log('modal is hidden');
  }
};
            const test= document.getElementById("modalEdit")
            const modal= new Modal(test,options)
         
            modal.hide()
            console.log("halo")
          

        }
  },
  computed: {
    ...mapWritableState(useCounterStore, ["listActivity", "detailList","titleTodo","idTodo","is_active","activity_group_id","priority"]),
  },
  created() {
    this.getList(this.$route.params.id);
  },
};
</script>

<template>
<div>
<div id="modalEdit" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <form action="">
        <div class="relative bg-white rounded-lg shadow">
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b">
                <h3 class="text-xl font-semibold text-gray-900">
                  Edit List Item
                </h3>
                <button @click="closeModal()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div>
                <p>Nama List Item:</p>
                <input v-model="titleTodo" type="text" class="rounded-xl mt-2" style="width: 550px;" placeholder="Tambahkan nama Activity">
                <p class="pt-5">Priority:</p>
                <select v-model="priority" name="" id="" class="pl-5 rounded-xl mt-2" style="width: 200px; height: 50px;">
                    <option value="very-high" selected>Very High</option>
                    <option value="high">High</option>
                    <option value="normal">Medium</option>
                    <option value="low">Low</option>
                    <option value="very-low">Very Low</option>
                </select>
              </div>
            </div>
            <!-- Modal footer -->
            <div v-if="titleTodo.length > 0" class="flex justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button @click.prevent="updateEditTodo" data-modal-toggle="defaultModal" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
            </div>
            <div v-if="titleTodo.length == 0" class="flex justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button disabled data-modal-toggle="defaultModal" type="button" class="text-white bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300  dark:focus:ring-blue-800">Simpan</button>
            </div>
        </div>
    </form>
    </div>
</div>
  <div
    class="rounded-xl ml-10 mb-5"
    style="width: 1000px; height: 75px; box-shadow: 0 10px 40px -10px"
  >
 
    <input
      v-if="el.is_active == 0"
      @change="checkActive()"
      data-cy="todo-item-checkbox"
      type="checkbox"
      class="absolute mt-6 ml-5"
      style="width: 25px; height: 25px"
    />
    <input
      v-if="el.is_active == 1"
      @change="checkNotActive()"
      checked
      data-cy="todo-item-checkbox"
      type="checkbox"
      class="absolute mt-6 ml-5"
      style="width: 25px; height: 25px"
    />
    <div class="p-5 flex justify-between">
      <div class="h-44 pl-10">
        <div
          v-if="el.priority == 'very-high'"
          style="width: 15px; height: 15px; border-radius: 100%"
          class="bg-red-500 absolute mt-2"
        ></div>
        <div
          v-if="el.priority == 'high'"
          style="width: 15px; height: 15px; border-radius: 100%"
          class="bg-yellow-500 absolute mt-2"
        ></div>
        <div
          v-if="el.priority == 'normal'"
          style="width: 15px; height: 15px; border-radius: 100%"
          class="bg-emerald-500 absolute mt-2"
        ></div>
        <div
          v-if="el.priority == 'low'"
          style="width: 15px; height: 15px; border-radius: 100%"
          class="bg-blue-500 absolute mt-2"
        ></div>
        <div
          v-if="el.priority == 'very-low'"
          style="width: 15px; height: 15px; border-radius: 100%"
          class="bg-purple-500 absolute mt-2"
        ></div>
        <h4
          v-if="el.is_active == 0"
          class="font-bold pl-6"
          style="font-size: 16pt"
          data-cy="todo-item-title"
        >
          {{ el.title }}
          <button @click="showUp()" data-cy="todo-item-edit-button">
            <img
              src="https://cdn-icons-png.flaticon.com/512/266/266146.png"
              style="width: 15px"
              alt=""
            />
          </button>
        </h4>
        <h4
          v-if="el.is_active == 1"
          class="font-bold pl-6 text-neutral-300"
          style="font-size: 16pt"
          data-cy="todo-item-title"
        >
          {{ el.title }}
          <button @click="showUp()" data-cy="todo-item-edit-button">
            <img
              src="https://cdn-icons-png.flaticon.com/512/266/266146.png"
              style="width: 15px"
              alt=""
            />
          </button>
        </h4>
      </div>
      <div>
        <button
          @click="deleteActivityButton(el.id, el.activity_group_id)"
          data-cy="todo-item-delete-button"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png"
            class="pt-1"
            style="width: 18px; height: 25px"
            alt="trash-icon"
          />
        </button>
      </div>
    </div>
  </div>
</div>
</template>
