import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [], // array to store all todos
  }),

  getters: {
    // Count only pending todos (not completed)
    countTodos: (state) =>
      state.todos.filter((task) => task.completedAt === null).length,

    // Optional: Count completed todos
    countCompleted: (state) =>
      state.todos.filter((task) => task.completedAt !== null).length,
  },

  actions: {
    // Fetch todos from NestJS server
    async fetchTodos() {
      try {
        const response = await axios.get("http://localhost:3100/tasks");
        this.todos = response.data; // expect an array of todos from the API
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    },

    // Toggle completed status of a todo
    async toggleStatus(id) {
      try {
        const todo = this.todos.find((t) => t.id == id);
        if (todo) {
          const endpoint = todo.completedAt ? `${id}/pending` : `${id}/done`;
          await axios.patch(`http://localhost:3100/tasks/${endpoint}`);
          // Update local state
          todo.completedAt = todo.completedAt ? null : new Date().toISOString();
        }
      } catch (error) {
        console.error("Failed to toggle status:", error);
      }
    },

    // Add a new todo
    async addTodo(name) {
      try {
        const response = await axios.post("http://localhost:3100/tasks", {
          name,
          description: "description",
        });
        this.todos.push(response.data);
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    },

    // Clear all todos
    async clearAll() {
      try {
        for (const todo of this.todos) {
          await axios.delete(`http://localhost:3100/tasks/${todo.id}`);
        }
        this.todos = [];
      } catch (error) {
        console.error("Failed to clear todos:", error);
      }
    },
  },
});