// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'todomvc-app-css/index.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
var filter = {
  all (todos) {
    return todos
  },
  active (todos) {
    return todos.filter((todo) => {
      return !todo.completed
    })
  },
  completed (todos) {
    return todos.filter((todo) => {
      return todo.completed
    })
  }
}
let app1 = new Vue({
  el: '.todoapp',
  data: {
    todos: '',
    todoList: [],
    editedTodo: null,
    hashName: 'all'
  },
  computed: {
    remain () {
      return filter.active(this.todoList)
    },
    isAll: {
      get () {
        return this.remain.length === 0
      },
      set (value) {
        return this.todoList.forEach((todo) => {
          todo.completed = value
        })
      }
    },
    filteredTodos () {
      return filter[this.hashName](this.todoList)
    }
  },
  methods: {
    addTodo () {
      if (!this.todos) {
        return
      }
      this.todoList.push({ 'content': this.todos, 'completed': false })
      this.todos = ''
    },
    removeTodo (index) {
      this.todoList.splice(index, 1)
    },
    editTodo (todo) {
      this.editCache = todo.content
      this.editedTodo = todo
    },
    doneEdit (todo, index) {
      this.editedTodo = null
      if (!todo.content) {
        this.removeTodo(index)
      }
    },
    cancelEdit (todo) {
      this.editedTodo = null
      todo.content = this.editCache
    },
    clear () {
      this.todoList = filter.active(this.todoList)
    }
  },
  directives: {
    focus (el, value) {
      if (value) {
        el.focus()
      }
    }
  }
})

function hashChange () {
  let hashName = location.hash.replace(/#\/?/, '')
  if (filter[hashName]) {
    app1.hashName = hashName
  } else {
    location.hash = ''
    app1.hashName = 'all'
  }
}

window.addEventListener('hashchange', hashChange)
