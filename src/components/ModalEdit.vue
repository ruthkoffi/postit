<template>
  <section>
    <div>
      <!-- Starts component -->
      <div class="flex justify-center" x-data="{ open: false }">
        <!-- Trigger -->
        <span x-on:click="open = true">
          <button
            type="button"
            class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Update
          </button>
        </span>
        <!-- Modal -->
        <div
          x-show="open"
          role="dialog"
          aria-modal="true"
          x-id="['modal-title']"
          aria-labelledby="modal-title-1"
          x-on:keydown.escape.prevent.stop="open = false"
          class="fixed inset-0 z-50 w-screen overflow-y-hidden"
          style="display: none"
        >
          <!-- Overlay -->
          <div
            x-show="open"
            x-transition.opacity=""
            class="fixed inset-0 bg-gray-800 bg-opacity-50"
            style="display: none"
          ></div>
          <!-- Panel -->
          <div
            x-show="open"
            x-on:click="open = false"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="transform opacity-0 translate-y-full"
            x-transition:enter-end="transform opacity-100 translate-y-0"
            x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="transform opacity-100 translate-y-0"
            x-transition:leave-end="transform opacity-0 translate-y-full"
            class="relative flex min-h-screen items-center justify-center p-4"
            style="display: none"
          >
            <div
              x-on:click.stop=""
              x-trap.noscroll.inert="open"
              class="relative w-full max-w-sm overflow-y-auto shadow-2xl bg-white ring-1 ring-gray-200 rounded-3xl p-10"
            >
              <div class="relative">
                <div class="flex flex-col text-center">
                  <p class="text-lg font-medium text-gray-500 lg:text-xl">
                    Update your Postit
                  </p>
                </div>
                <form action="" @submit.prevent="modif" class="mt-12">
                  <input
                    name="hidden"
                    autocomplete="false"
                    style="display: none"
                  />
                  <input name="_redirect" type="hidden" value="#" />
                  <div class="space-y-3">
                    <div class="">
                      <label
                        for="name"
                        class="block mb-3 text-sm font-medium text-black sr-only"
                      >
                        Title
                      </label>
                      <input
                        id="name"
                        name="text"
                        type="text"
                        v-model="title"
                        placeholder="Title"
                        aria-placeholder="Title"
                        class="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xl"
                      />
                    </div>
                    <div class="col-span-full">
                      <label
                        for="password"
                        class="block mb-3 text-sm font-medium text-black sr-only"
                        >Content</label
                      >
                      <textarea
                        rows="10"
                        cols="8"
                        id="password"
                        name="text"
                        type="text"
                        v-model="content"
                        placeholder="Content"
                        aria-placeholder="Content"
                        class="block w-full h-12 px-4 py-3 placeholder-gray-500 bg-gray-100 border-0 rounded-lg appearance-none text-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset text-xl"
                      >
                      </textarea>
                    </div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useNoteStore } from "@/store/postit";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const ruth = useRouter();
const store = useNoteStore();
const route = useRoute();
const title = ref("");
const content = ref("");

onMounted(async () => {
  await store.fetchDetail(route.params.id);
  title.value = store.selectedNote?.title;
  content.value = store.selectedNote?.content;
});

const modif = async () => {
  await store.updateNote(route.params.id, title.value, content.value);
  ruth.push({ path: "/" });
};
</script>
