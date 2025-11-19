import { defineStore } from "pinia";
import axios from "axios";

export const useNoteStore = defineStore("note", {
  state: () => ({
    notes: [],
    selectedNote: null,
  }),
  // action lister toutes le methodes
  actions: {
    // afficher tous les postits
    async fetchNotes() {
      const res = await axios.get("https://post-it.epi-bluelock.bj/notes");
      this.notes = res.data.notes;
    },
    // créer un postit
    async createNote(createData) {
      await axios.post("https://post-it.epi-bluelock.bj/notes", createData);
      this.notes.push(createData);
    },
    // supprimer un postit
    async deleteNote(id) {
      await axios.delete(`https://post-it.epi-bluelock.bj/notes/${id}`);
      this.notes = this.notes.filter((note) => note._id !== id);
    },
    // afficher les details d'un postit
    async fetchDetail(id) {
      const res = await axios.get(
        `https://post-it.epi-bluelock.bj/notes/${id}`
      );
      this.selectedNote = res.data;
    },
    //modifier un postit
    async updateNote(id, title, content) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        title: title,
        content: content,
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://post-it.epi-bluelock.bj/notes/" + id, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .then(this.fetchNotes)
        .catch((error) => console.error(error));
    },
  },
});
