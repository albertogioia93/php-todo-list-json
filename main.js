// 'use strict';
// const { createApp } = Vue;
// createApp({
//     data() {
//         return {
//         }
//     },
//     methods: {
//         getData(index) {
//             console.log(index);
//             axios.get('server.php', {
//                 params: {
//                     index
//                 }
//             })
//                 .then((response) => {
//                     this.current = response.data;
//                 })
//         },
//         addTodo(){
//         }
//     },
//     created() {
//         axios.get('server.php')
//             .then((response) => {
//             })
//     }
// }).mount('#app');

'use strict';
const { createApp } = Vue;
createApp({
    data() {
        return {
            todos: [],
            newTodo: ''
        }
    },
    methods: {
        getTodos() {
            axios.get('server.php')
                .then((response) => {
                    this.todos = response.data;
                })
        },
        // addTodo() {
        //     if (this.newTodo !== '') {
        //         axios.post('server.php', {
        //             newtodo: this.newTodo
        //         })
        //             .then((response) => {
        //                 this.newTodo = '';
        //                 this.todos.push(response.data);
        //             })
        //     }
        // },
        addTodo(){
            axios.post('server.php', {
              newtodo: this.newTodoText,
            })
              .then((response) => {
                this.getData();
                this.newTodoText = '';
              });
        },
        removeTodo(index) {
            axios.delete('server.php', {
                data: {
                    index
                }
            })
                .then((response) => {
                    this.todos.splice(index, 1);
                })
        },
        toggleDone(index) {
            const todo = this.todos[index];
            axios.put('server.php', {
                index,
                done: !todo.done
            })
                .then((response) => {
                    todo.done = !todo.done;
                })
        }
    },
    created() {
        axios.get('server.php')
          .then((response) => {
            this.todos = response.data;
          });
    }
}).mount('#app');
