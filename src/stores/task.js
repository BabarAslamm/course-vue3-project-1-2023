import { defineStore } from "pinia"

export const useTaskStore = defineStore('taskStore', {

    state: () => ({
        tasks: [],
        task: {
            id: 1,
            name: 'First task from store',
            is_completed: false
        }
    })


})