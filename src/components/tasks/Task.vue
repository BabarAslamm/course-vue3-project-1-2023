<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input class="form-check-input mt-0" :class="completedClass" type="checkbox" :checked="task.is_completed"  />
            <div class="ms-2 flex-grow-1 " @dblclick="$event => isEdit = true"  :class="completedClass" title="Double click the text to edit or remove">
                <div class="relative" v-if="isEdit">
                    <input 
                        class="editable-task" 
                        type="text" 
                        @keyup.esc="undo" 
                        v-focus
                        v-model="editTask"
                        
                        @keyup.enter="updateTask"
                    />
                </div>
                <span v-else>{{ task.name }}</span>
            </div>
            
        </div>
        <!-- Task Action -->
        <TaskActions @edit="$event => isEdit = true" v-show="!isEdit" />
        
    </li>
</template>

<script setup>
import { computed, ref} from 'vue';
import TaskActions from './TaskActions.vue';


const props = defineProps({
    task: Object
})

const completedClass = computed(()=> props.task.is_completed ? "completed" : "")

///Edit
const editTask =ref(props.task.name)
const isEdit = ref(false)
const vFocus = {
    mounted : (el) => el.focus()
}

//Update Task
const emit = defineEmits(['updated'])
const updateTask = event =>{

    const updatedTask = { ...props.task, name: event.target.value}
    emit('updated', updatedTask)
    isEdit.value = false;

}

const undo = () => {
    isEdit.value = false
    editTask.value = props.task.name
}
</script>