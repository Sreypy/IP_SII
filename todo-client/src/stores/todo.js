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
    toggleStatus(id) {
      const index = this.todos.findIndex((t) => t.id == id);
      if (index >= 0) {
        this.todos[index].completedAt = this.todos[index].completedAt
          ? null
          : new Date().toISOString();
      }
    },

    // Add a new todo
    addTodo(name) {
      // Generate a new ID safely
      const newId =
        this.todos.length > 0
          ? Math.max(...this.todos.map((t) => t.id)) + 1
          : 1;

      this.todos.push({
        id: newId,
        name,
        description: "description",
        createdAt: new Date().toISOString(),
        completedAt: null,
      });
    },

    // Clear all todos
    clearAll() {
      this.todos = [];
    },
  },
});