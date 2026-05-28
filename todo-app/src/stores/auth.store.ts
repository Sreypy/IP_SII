import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useTodoStore } from './todo.store'
import { currentRole } from '../apollo/client'

export type Role = 'anonymous' | 'teacher'

export const useAuthStore = defineStore('auth', () => {
  const role = ref<Role>(currentRole.value as Role)

  function setRole(newRole: Role) {
    role.value = newRole
    currentRole.value = newRole   // updates Apollo headers for all future requests
    useTodoStore().fetchTodos()   // re-fetch with the new role's permissions
  }

  const isTeacher = computed(() => role.value === 'teacher')

  return { role, isTeacher, setRole }
})