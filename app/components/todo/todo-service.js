/*import Todo from "../../models/todo.js";

// @ts-ignore
const todoApi = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/Jasper/todos',
	timeout: 5000
});

let _state = {
	todos: [],
	error: {},
}
let _subscribers = {
	todos: [],
	error: []
}

function deleteElemFromArray(arr, objId) {
    var i = arr.length
    for (var j = 0; j < i; j++) {
        let objectId = arr[j]._id
        if (objectId == objId) { 
            arr.splice(j, 1)
            break;
        }    
    }
    return arr
}
function _setState(prop, data) {
   	_state[prop] = data
    _subscribers[prop].forEach(fn => fn())
}

export default class TodoService {
    
	get TodoError() {
		return _state.error
    }

    get Todos() {
        return _state.todos
    }
    
	addSubscriber(prop, fn) {
		_subscribers[prop].push(fn)
	}

	getTodos() {
		todoApi.get()
            .then(res => {
                let todos = res.data.data.map(t => new Todo(t))
                _setState("todos", todos)
				// WHAT DO YOU DO WITH THE RESPONSE?
			})
            .catch(err => _setState('error', err.response.data))
	}

    addTodo(todo) {
        todoApi.post('', todo)
            .then(res => {
                let newTodo = new Todo(res.data.data)
                let newTodos = this.Todos
                newTodos.push(newTodo)
               _setState("todos", newTodos);
                //   WHAT DO YOU DO AFTER CREATING A NEW TODO?
            })
			.catch(err => _setState('error', err.response.data))
	}

	toggleTodoStatus(todoId) {
		let todo = _state.todos.find(todo => todo._id == todoId)
		// Be sure to change the completed property to its opposite
		// todo.completed = !todo.completed <-- THIS FLIPS A BOOL
        todo.completed = !todo.completed
		todoApi.put(todoId, todo)
            .then(res => {
                if (res.status == 200) {
                    console.log("response was good")
                    _setState("todos", this.Todos)
                } else {
                    console.log("response was not good")
                }
          		//DO YOU WANT TO DO ANYTHING WITH THIS?
			})
			.catch(err => _setState('error', err.response.data))
	}

	removeTodo(todoId) {
		// This one is on you to write.... 
		// The http method is delete at the todoId  
        todoApi.delete(todoId)
            .then(res => {
              //  console.log("Response from delete: ", res)
                _setState("todos", deleteElemFromArray(this.Todos, todoId))
                //created delete function so that I didnt need to do another get request.
            })
            .catch(err => _setState('error', err.response.data))
	}

}
*/