import { CategoryList } from "./category_management";

export class Sidebar{
    constructor(){
        this.categoryListInstance = new CategoryList;

        this.categoryList = document.getElementById("category-list");
        this.newCategory = document.getElementById("new-category");
        this.addCategoryButton = document.getElementById("add-category");
        this.addCategoryButton.addEventListener("click", () => {
            this.addNewCategory(this.newCategory.value);
            this.newCategory.value="";
            this.renderSidebar();
            console.log(this.categoryListInstance.categoryList);

        });

        this.renderSidebar();
    }

    addNewCategory(value){
        this.categoryListInstance.createCategory(value);
    }

    // removeCategory(){
    //     ...
    // }

    renderSidebar(){
		this.categoryList.innerText = ""; // Revert to default
		this.categoryListInstance.categoryList.forEach(object => {
			this.categoryName = document.createElement("li");
            this.categoryName.innerText = object.title;
            this.categoryName.setAttribute("data-categoryid", object.id);
			this.categoryList.appendChild(this.categoryName);
		});
	}
}