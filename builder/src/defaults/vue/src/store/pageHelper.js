import { defineStore } from "pinia";

export const useHelpStore = defineStore("help", {
  state: () => ({
    helpData: null,
    isHelpVisible: false,
  }),
  actions: {
    toggleHelpModal() {
      if (this.helpData) {
        this.isHelpVisible = !this.isHelpVisible;
      }
    },
    setHelpData(data) {
      this.helpData = data || null;
    },
  },
});