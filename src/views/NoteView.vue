<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-12 w-auto text-justify p-4"
  >
    <div class="p-6 bg-gray-300 rounded-lg">
      <h2
        class="font-semibold break-all text-lg text-center text-gray-800 mt-2"
      >
        {{ store.selectedNote?.title }}
      </h2>

      <p class="mt-2 break-all text-gray-800 text-center">
        {{ store.selectedNote?.content[0] }}
      </p>
      <div class="flex justify-center md:justify-start gap-4">
        <button
          @click="confirmDelete()"
          class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Delete
        </button>
        <ModalEdit />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useNoteStore } from "@/store/postit";
import { useRoute, useRouter } from "vue-router";
import ModalEdit from "@/components/ModalEdit.vue";
const router = useRoute();
const ruth = useRouter();
const store = useNoteStore();
const confirmDelete = () => {
  if (confirm("Confirm deletion")) {
    store.deleteNote(store.selectedNote._id);
    ruth.push({ path: "/" });
  }
};
onMounted(async () => {
  await store.fetchDetail(router.params.id);
});
</script>
