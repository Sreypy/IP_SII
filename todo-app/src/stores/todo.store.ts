import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apolloClient } from '../apollo/client'
import { ADD_TODO, DELETE_TODO, GET_TODOS, TODOS_SUB, TOGGLE_TODO } from '../graphql/todos'

export type Todo = {
  id: string
  title: string
  is_done: boolean
  created_at: string
}

export const useTodoStore = defineStore('todo', () => {

  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  //1. Filtering (Active/Done tabs)

  const activeTodos = computed(() => todos.value.filter(t => !t.is_done))
  const doneTodos = computed(() => todos.value.filter(t => t.is_done))

  
  async function fetchTodos() {
    loading.value = true
    error.value = null
    try {
      const { data } = await apolloClient.query<{ todos: Todo[] }>({
        query: GET_TODOS,
        fetchPolicy: 'network-only', // keep it simple for students
      })
      todos.value = data.todos
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load todos'
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) {
    const clean = title.trim()
    if (!clean) return

    await apolloClient.mutate({
      mutation: ADD_TODO,
      variables: { title: clean },
    })

    // simplest approach for class:
    await fetchTodos()
  }

  async function toggleTodo(todo: Todo) {
    await apolloClient.mutate({
      mutation: TOGGLE_TODO,
      variables: { id: todo.id, done: !todo.is_done },
    })
    await fetchTodos()
  }

  async function deleteTodo(id: string) {
    await apolloClient.mutate({
      mutation: DELETE_TODO,
      variables: { id },
    })
    await fetchTodos()
  }

  // Optional: realtime updates (subscription)
  function startRealtime() {
    const obs = apolloClient.subscribe<{ todos: Todo[] }>({
      query: TODOS_SUB,
    })

    const sub = obs.subscribe({
      next: ({ data }) => {
        if (data?.todos) todos.value = data.todos
      },
      error: (e) => {
        // keep app running even if WS fails
        console.error('Subscription error', e)
      },
    })

    return () => sub.unsubscribe()
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,

    activeTodos,
    doneTodos,
  }
})