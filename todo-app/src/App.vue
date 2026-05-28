<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useTodoStore } from './stores/todo.store'
import { useAuthStore } from './stores/auth.store'

const authStore = useAuthStore()
const todoStore = useTodoStore()
const title = ref('')
let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  if (!title.value.trim()) return
  todoStore.addTodo(title.value)
  title.value = ''
}

// challenges1
const filter = ref<'all' | 'active' | 'done'>('all')

const visibleTodos = computed(() => {
  if (filter.value === 'active') return todoStore.activeTodos
  if (filter.value === 'done') return todoStore.doneTodos
  return todoStore.todos
})
</script>

<template>
  <div class="todo-container">
    <div class="todo-card">
      <h1 class="todo-title">My Todos</h1>

      <!-- challenges4 -->

      <!-- Role switcher -->
      <div class="role-switcher">
        <span class="role-label">Role:</span>
        <button
          @click="authStore.setRole('anonymous')"
          :class="{ active: authStore.role === 'anonymous' }"
        >
          👁 Anonymous
        </button>
        <button
          @click="authStore.setRole('teacher')"
          :class="{ active: authStore.role === 'teacher' }"
        >
          ✏️ Teacher
        </button>
      </div>

      <!-- Add form — hidden for anonymous -->
      <form v-if="authStore.isTeacher" @submit.prevent="onAdd" class="todo-form">
        <input
          v-model="title"
          placeholder="What needs to be done?"
          class="todo-input"
        />
        <button type="submit" class="todo-add-btn">Add</button>
      </form>

      <!-- //challenges1 -->

      <!-- Filter tabs -->
      <div class="tabs">
        <button @click="filter = 'all'"    :class="{ active: filter === 'all' }">All</button>
        <button @click="filter = 'active'" :class="{ active: filter === 'active' }">Active</button>
        <button @click="filter = 'done'"   :class="{ active: filter === 'done' }">Done</button>
      </div>

      <p v-if="todoStore.error" class="todo-error">{{ todoStore.error }}</p>
      <p v-if="todoStore.loading" class="todo-loading">Loading...</p>

      <ul class="todo-list">
        <li
          v-for="todo in visibleTodos"
          :key="todo.id"
          class="todo-item"
          :class="{ done: todo.is_done }"
        >
          <label class="todo-label">
            <input
              type="checkbox"
              :checked="todo.is_done"
              @change="authStore.isTeacher && todoStore.toggleTodo(todo)"
              :disabled="!authStore.isTeacher"
              class="todo-checkbox"
            />
            <span class="todo-text">{{ todo.title }}</span>
          </label>
          <!-- Delete only for teacher -->
          <button
            v-if="authStore.isTeacher"
            @click="todoStore.deleteTodo(todo.id)"
            class="todo-delete-btn"
          >✕</button>
        </li>

        <li v-if="visibleTodos.length === 0" class="todo-empty">
          No {{ filter === 'all' ? '' : filter }} todos yet.
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4ff, #e8f0fe);
  padding: 2rem;
}

.todo-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 420px;
  padding: 2rem;
}

.todo-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.todo-input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid #d0d7de;
  border-radius: 0.5rem;
  font-size: 0.95rem;
}

.todo-add-btn {
  background: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.todo-add-btn:hover { background: #0056b3; }

/* ── Tabs ── */
.tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.tabs button {
  flex: 1;
  padding: 0.4rem 0;
  border: 1px solid #d0d7de;
  border-radius: 0.5rem;
  background: transparent;
  color: #555;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tabs button:hover {
  background: #f0f4ff;
  border-color: #007bff;
  color: #007bff;
}

.tabs button.active {
  background: #007bff;
  border-color: #007bff;
  color: #fff;
  font-weight: 600;
}

/* ── List ── */
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.5rem;
  transition: background 0.2s;
}

.todo-item.done { background: #e8f5e9; }

.todo-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #007bff;
}

.todo-text { font-size: 0.95rem; color: #333; }

.todo-item.done .todo-text {
  text-decoration: line-through;
  color: #777;
}

.todo-delete-btn {
  background: transparent;
  border: none;
  color: #ff4d4f;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s;
}
.todo-delete-btn:hover { color: #d9363e; }

.todo-empty {
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
  padding: 1rem 0;
}

/* ── Role Switcher ── */
.role-switcher {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
  padding: 0.5rem 0.75rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.role-label {
  font-size: 0.8rem;
  color: #888;
  margin-right: 0.2rem;
}

.role-switcher button {
  flex: 1;
  padding: 0.3rem 0.5rem;
  border: 1px solid #d0d7de;
  border-radius: 0.4rem;
  background: transparent;
  color: #555;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.role-switcher button.active {
  background: #2c3e50;
  border-color: #2c3e50;
  color: #fff;
  font-weight: 600;
}

.todo-error  { color: #ff4d4f; text-align: center; margin-bottom: 0.5rem; }
.todo-loading { text-align: center; color: #555; }
</style>