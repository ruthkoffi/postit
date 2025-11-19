<template>
  <div>
    <p class="font-bold text-center text-2xl">
      Organize your time by creating sticky notes
    </p>
    <div class="bg-gray-400 px-2 py-10">
      <ModalAdd />
      <div id="features" class="mx-auto max-w-6xl">
        <ul
          class="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3"
        >
          <div v-for="note in store.notes" :key="note._id">
            <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
              <h3 class="my-3 font-display font-medium truncate">
                {{ note.title }}
              </h3>
              <p class="mt-1.5 text-sm leading-6 text-secondary-500 truncate">
                {{ note.content[0] }}
              </p>
              <br />
              <router-link
                :to="`note/${note._id}`"
                class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
              >
                Read more
              </router-link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { onMounted } from "vue";
import { useNoteStore } from "@/store/postit";
import ModalAdd from "@/components/ModalAdd.vue";

const store = useNoteStore();
// console.log(store.notes);

onMounted(async () => {
  await store.fetchNotes();
});
</script>
