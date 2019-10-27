import TodoService from "./todo-service.js";
//import Todo from "../../models/todo.js";

const _todoService = new TodoService()

var acronyms = {
    lol: ["laugh out loud"],
    ttyl: ["Talk to you later"],
    idgaf: ["I dont give a f*ck"],
    yolo: ["You only live once"],
    hmu: ["Hit me up"]
}


function _drawTime() {
   // var myVar =
    setInterval(myTimer, 1000);

    function myTimer() {
        var d = new Date();
        let template = ""
        template += `<span class="align-middle">${d.toLocaleTimeString()}</span>`
        document.getElementById("time").innerHTML = template

    }
}

function _drawTodosWithAcronyms() {
    var todos = _todoService.Todos // retrieving the todos 
    var template = "" // for the final result to be inserted into the html
 
    document.getElementById('todoCount').innerText = todos.length //simple counter for how many todos there are
    
    for (var j = 0; j < todos.length; j++) { // iterating through the todos 

        var todoStr = "" // for reconstructing the todo description with div and span elements 
        var todoItem = todos[j]  // single todo
        var todoDescriptionArr = todoItem.description.split(" ") //splitting the todo's description into an array of strings

        for (let k = 0; k < todoDescriptionArr.length; k++) { // iterating over the array of strings
            var key = todoDescriptionArr[k].toLowerCase() // changing each string to lowercase to compare against keys in acronym object
            if (acronyms.hasOwnProperty(key)) { // searching for a string that equals a key in the acronym object
                /* When string matches a key in the object create div & span for :hover use in css and add it to the todoStr*/
                todoStr += `<div class="acronym">${todoDescriptionArr[k]}<span class="acronymText"> ${acronyms[key][0]}</span></div>`;
            } else {
                /* adding the string that doesnt match a key back into the reconstructed todoStr string */ 
                todoStr += todoDescriptionArr[k]
            }
            if (k != todoDescriptionArr.length - 1) {
                /* adding a space if not currently on the last element in the array of strings */
                todoStr += ` `
            } 
        }

        if (todoItem.completed == false) {
            template += `
				<div><input type="checkbox" id="${todoItem._id}" onclick="app.controllers.todoController.toggleTodoStatus('${todoItem._id}')">${todoStr}</div>
				`
        } else {
            template += `
				<div><input type="checkbox" id="${todoItem._id}" onclick="app.controllers.todoController.toggleTodoStatus('${todoItem._id}')" checked><span class="todoFormat">${todoStr.strike()}</span>
				<i onclick="app.controllers.todoController.removeTodo('${todoItem._id}')"class="fas fa-trash-alt"></i></div>
				`
        }
    }
    document.getElementById('todolist').innerHTML = template
}


function _drawError() {
	console.error('[TODO ERROR]', _todoService.TodoError)
	//document.querySelector('#todo-error').textContent = `${_todoService.TodoError.message}`

}


export default class TodoController {
	constructor() {
       // _todoService.addSubscriber('error', _drawError)
        _todoService.addSubscriber('todos', _drawTodosWithAcronyms)
        _todoService.getTodos()
        _drawTime()
		// Don't forget to add your subscriber
	}

    addTodo(e) {
        e.preventDefault()
        var form = e.target
        // TAKE THE INFORMATION FORM THE FORM
        var todo = {
            description: form.description.value,
            completed: false,
            user: 'Jasper'
            // DONT FORGET TO BUILD YOUR TODO OBJECT
        }
        form.reset()
        //PASSES THE NEW TODO TO YOUR SERVICE
        //DON'T FORGET TO REDRAW THE SCREEN WITH THE NEW TODO
        //YOU SHOULDN'T NEED TO CHANGE THIS
        //^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT

        _todoService.addTodo(todo)
    }

	toggleTodoStatus(todoId) {
		// asks the service to edit the todo status
        _todoService.toggleTodoStatus(todoId)
    }

    removeTodo(todoId) {
		// ask the service to run the remove todo with this id
        _todoService.removeTodo(todoId)
    }



}
