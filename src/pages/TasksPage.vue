<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask @added="handelAddedTask" />
                    
                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" 
                        @updated="handleUpdateTask"
                        @completed="handleCompleteTask"
                    />

                    <!-- Show toggle button -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary"
                            
                            @click="ShowCompletedTasks = !ShowCompletedTasks"
                        >
                            <span v-if="!ShowCompletedTasks">Show Completed Tasks</span>
                            <span v-else>Hide Completed Tasks</span>
                            
                        </button>
                    </div>
        
                    <!-- List of completed tasks -->
                    <Tasks :tasks="completedTask"
                        :show="CompletedTaskIsVisible && ShowCompletedTasks"
                        @updated="handleUpdateTask"
                        @completed="handleCompleteTask"
                    />
                    
                </div>
            </div>
        </div>
    </main>
</template>


<script setup>
import { onMounted, ref, computed } from "vue";
import { allTasks, createTask, updateTask, completeTask } from "../http/task-api";
import Tasks from "../components/tasks/Tasks.vue";
import NewTask from "../components/tasks/NewTask.vue"

const tasks = ref([])

onMounted (async () => {
  const {data} = await allTasks()
  tasks.value  = data.data
})

const uncompletedTasks = computed(()=> tasks.value.filter(task => !task.is_completed))
const completedTask = computed(()=> tasks.value.filter(task => task.is_completed))
const showToggleCompletedBtn = computed(
    ()=> completedTask.value.length > 0 && uncompletedTasks.value.length > 0
)

const CompletedTaskIsVisible = computed(
    () => uncompletedTasks.value.length === 0 || completedTask.value.length > 0
)

const ShowCompletedTasks = ref(false);

const handelAddedTask = async(newTask)=>{
 const { data: createdTask} = await createTask(newTask);
 console.log(createdTask.data)
 tasks.value.unshift(createdTask.data)

}

/// Update Task
const handleUpdateTask = async (task) => {
    const { data: updatedTask } = await updateTask(task.id, {
        name: task.name
    })
    const currentTask = tasks.value.find(item => item.id === task.id)
    currentTask.name = updatedTask.data.name

}
// Mark Task As Completed or Un-Completed
const handleCompleteTask = async (task) => {
    console.log('handleCompleteTask', task)
    const {data : completedTask } = await completeTask(task.id, {
        is_completed: task.is_completed
    })

    const currentTask = tasks.value.find(item => item.id === task.id)
    currentTask.is_completed = completedTask.data.is_completed

}

</script>