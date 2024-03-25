import {ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allTasks } from "../http/task-api";

const temp = {

    state: () => ({}),

    getters: {},

    actions: {},


}

export const useTaskStore = defineStore('taskStore', () => {

    // State
    const tasks = ref([])


    // Getters
    const completedTask = computed(() => 
        tasks.value.filter((task) => task.is_completed)
    );
    const uncompletedTasks = computed(() => 
        tasks.value.filter((task) => !task.is_completed)
    )



    // Actions
    const fetchAllTasks =  async() => {
        const {data} = await allTasks()
        tasks.value  = data.data
    }

    return {
        tasks,
        completedTask,
        uncompletedTasks,
        fetchAllTasks
    }

})