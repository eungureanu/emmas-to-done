export class Category {
    constructor (id, title){
        this.id = id;
        this.title = title;
    }
}

export class CategoryList {
    constructor(){
        this.categoryList = [
            {
                id: 0,
                title: "To Do"
            }
        ];
        this.id=1;
    }

    createCategory(title){
        this.categoryList.push(new Category(this.id, title));
        this.id++;
        return this.categoryList;
    }
    
    updateCategory(id, propertyToChange, newValue) {
        this.categoryList.map(object => {
            if (object.id == id) {
                object[propertyToChange] = newValue;
            }
        });
        return this.categoryList;
    }

    deleteCategory(id){
        this.categoryList = this.categoryList.filter(object => object.id !== id);
        return this.categoryList;
    }
}