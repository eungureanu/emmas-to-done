import { TodoList } from "./todoList";
import { Sidebar } from "./sidebar";

export class Modal{
	constructor(){

		this.availableCategories = new Sidebar;
		
		this.modal = document.getElementById("modal");
		this.overlay = document.getElementById("overlay");
		this.submitNewTodo = document.getElementById("submit-todo");
		this.cancel = document.getElementById("cancel");
		this.todoForm = document.getElementById("todo-form");

		this.todoTitle = document.getElementById("title");
		this.todoDetails = document.getElementById("description");
		this.todoDueDate = document.getElementById("due-date");
		this.todoPriority = document.getElementById("prio");
		this.todoCategories = document.getElementById("category");
	}

	populate(object){
		this.todoTitle.value = object.title;
		this.todoDetails.value = object.details;
		this.todoDueDate.value = object.duedate;
		this.todoPriority.value = object.priority;
		this.todoCategories.value = object.category;
	
		this.submitNewTodo.innerText = "Save";
		this.submitNewTodo.id = "save-todo"
	}

	submit(todoListInstance){
		todoListInstance.createTodo(this.todoTitle.value, this.todoDetails.value, this.todoDueDate.value, this.todoPriority.value, this.todoCategories.value);
		this.close();
	}

	save(todoListInstance, id){
		todoListInstance.updateTodo(id, this.todoTitle.value, this.todoDetails.value, this.todoDueDate.value, this.todoPriority.value, this.todoCategories.value);
		this.close();
	}

	open(){
		this.modal.classList.add("active");
		this.overlay.classList.add("active");
		this.getCategories();
		console.log(this.availableCategories.categoryListInstance.categoryList);
	}

	close() {
		this.todoForm.reset();
		this.modal.classList.remove("active");
		this.overlay.classList.remove("active");
	}

	getCategories(){//needs to work with the most recent list of categories not with the default one
		this.todoCategories.innerHTML = "";
		this.availableCategories.categoryListInstance.categoryList.forEach(object => {
			this.availableCategory = document.createElement("option");
			this.availableCategory.innerText = object.title;
			this.todoCategories.appendChild(this.availableCategory);
			// console.log(this.availableCategories.categoryListInstance.categoryList);
		})
	}
}

export class Dashboard {
	constructor(){

		this.todoListInstance = new TodoList;
		this.modal = new Modal;

		this.todoList = document.getElementById("todo-list");
		this.addNewTodo = document.getElementById("add-new-todo");

		/* Inside the event handler functions, 'this' refers to the element that triggered the event, not the Dashboard instance. 
        Another option is to bind the methods to the class instance e.g. add this in the constructor 'this.open = this.open.bind(this)'; */
		this.addNewTodo.addEventListener("click", () => {
			this.modal.open();
			this.modal.submitNewTodo.innerText = "Add";
			this.modal.submitNewTodo.id = "submit-todo";
		})

		this.modal.todoForm.addEventListener("click", (event) => {
			if (event.target.type == "button"){
				if (event.target.id == "cancel"){
					this.modal.close();
				} else if (event.target.id == "submit-todo"){
					this.modal.submit(this.todoListInstance);
					this.renderDashboard();
				} else if (event.target.id == "save-todo"){
					this.modal.save(this.todoListInstance, this.objectToUpdate.id);
					this.renderDashboard();
				}
			}
		})

	};

	createCard(object){

		this.todoCard = document.createElement("div");

		this.todoCardStatus = document.createElement("input");

		this.todoCardTitle = document.createElement("div");
		this.todoCardDetails = document.createElement("div");
		this.todoCardDueDate = document.createElement("div");
		this.todoCardPrio = document.createElement("div");
		this.todoCardCategory = document.createElement("div");
        
		this.todoCardEditButton = document.createElement("button");
		this.todoCardEditButton.addEventListener("click", (event) => {this.triggerEdit(event);});

		this.todoCardDeleteButton = document.createElement("button");
		this.todoCardDeleteButton.addEventListener("click", (event) => { this.deleteCard(event); });


		this.todoList.appendChild(this.todoCard);
		this.todoCard.append(this.todoCardStatus, this.todoCardTitle, this.todoCardDetails, this.todoCardDueDate, this.todoCardPrio, this.todoCardCategory, this.todoCardEditButton, this.todoCardDeleteButton);
		this.todoCard.classList.add("item-card");
		this.todoCard.setAttribute("data-itemid", object.id);

		this.todoCardStatus.type = "checkbox";
		this.todoCardStatus.addEventListener("click", (event) => { this.markDone(event)});

		this.todoCardTitle.classList.add("todo-title");
		this.todoCardTitle.innerText = object.title;

		this.todoCardDetails.classList.add("todo-details");
		this.todoCardDetails.innerText = object.details;

		this.todoCardDueDate.classList.add("todo-due");
		this.todoCardDueDate.innerText = "Due date: " + object.duedate;

		this.todoCardPrio.classList.add("todo-prio");
		this.todoCardPrio.innerText = "Priority: " + object.priority;

		this.todoCardCategory.classList.add("todo-cat");
		this.todoCardCategory.innerText = "Category: " + object.category;

		this.todoCardEditButton.classList.add("todo-edit");
		this.todoCardEditButton.innerText = "Edit";

		this.todoCardDeleteButton.classList.add("todo-delete");
		this.todoCardDeleteButton.innerText = "Delete";

		return this.todoCard;
	}

	deleteCard(event){
		if (event.target.className == "todo-delete"){
			const parentCard = event.target.closest(".item-card");
			const itemID = parentCard.dataset.itemid;

			//to get directly the object with the ID corresponding to the card, validation is done in the getTodo method of the TodoList class
			this.objectToUpdate = this.todoListInstance.getTodo(itemID);
			this.todoList.removeChild(parentCard);
			this.todoListInstance.deleteTodo(this.objectToUpdate.id);
			}
		this.renderDashboard();
	}

	triggerEdit(event){
		this.modal.open();

		if (event.target.className == "todo-edit"){
			const parentCard = event.target.closest(".item-card");
			const itemID = parentCard.dataset.itemid;

			this.objectToUpdate = this.todoListInstance.getTodo(itemID);
			this.modal.populate(this.objectToUpdate);
		}
	}

	renderDashboard(){  //why is the category not shown properly in the card???
		this.todoList.innerHTML = ""; // Clear existing content 
		this.todoListInstance.todoList.forEach(object => {
			this.todoCard = this.createCard(object);
			this.todoList.appendChild(this.todoCard);
		});
	}

	markDone(event){
		if (event.target.type == "checkbox"){
			const parentCard = event.target.closest('.item-card');
			const itemID = parentCard.dataset.itemid;
			parentCard.classList.toggle('todo-done', event.target.checked);
		}
	}
}