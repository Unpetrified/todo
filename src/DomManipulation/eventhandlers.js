import formFieldGenerator from "./formgenerator";
import { Notes, Project, Todo} from "../AppLogic/datamodels";
import { updateFiles } from "../AppLogic/updatefiles";
import { getProject, saveProject } from "../AppLogic/localStorageQuery";
import { updateCount, updateProjectsList, updateProjectSection, toggleCategories } from "./uimodifier";

const form = document.querySelector("form"),
      open_form = document.querySelector("header svg"),
      pop_form = document.querySelector(".pop-up"),
      blanket = document.querySelector(".blanket"),
      open_todo_form = document.querySelector(".open-todo"),
      open_project_form = document.querySelector(".open-project"),
      open_note_form = document.querySelector(".open-note"),
      close_form = document.querySelector(".pop-up svg"),
      projects = document.querySelectorAll(".project");

let categories = document.querySelectorAll(".category");

open_form.addEventListener("click", () => {

   toggleFormField(true);
    
    blanket.style.display = "block";
    pop_form.classList.add("state");

});

toggleCategories(categories);
toggleCategories(projects);

open_todo_form.addEventListener("click", (ev) => toggleFormField(false, ev));
open_note_form.addEventListener("click", (ev) => toggleFormField(false, ev));
open_project_form.addEventListener("click", (ev) => toggleFormField(false, ev));

close_form.addEventListener("click", closeForm)

function toggleFormField(manual, e="") {

    form.innerHTML = "";

    // remove tab indicator
    open_todo_form.classList.remove("active-form");
    open_note_form.classList.remove("active-form");
    open_project_form.classList.remove("active-form");
    
    // set todo field as default when the form is opened
    if (manual) {
        form.append(formFieldGenerator.todo());
        form.append(formFieldGenerator.submit("Make Todo"));
        open_todo_form.classList.add("active-form");

        return
    } 
    
    // display the form field corresponding with the clicked formtype
    e.target.classList.add("active-form");
    switch (e.target) {
        case open_todo_form:
            form.append(formFieldGenerator.todo());
            form.append(formFieldGenerator.submit("Make Todo"));
            break
        
        case open_note_form:
            form.append(formFieldGenerator.note());
            form.append(formFieldGenerator.submit("Create Note"));
            break
        
        default:
            form.append(formFieldGenerator.project());
            form.append(formFieldGenerator.submit("Create Project"));
            break
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let active = document.querySelector("form>fieldset");

    let field = active.className;

    switch (field) {
        case "todo-field":
            let todo_title = document.querySelector("#title").value,
                todo_description = document.querySelector("#description").value,
                due_date = document.querySelector("#due-date").value,
                todo_project_affliation = document.querySelector("#affliation").value,
                todo = new Todo(todo_title, todo_description, due_date);

            updateFiles(todo, todo_project_affliation);
            updateProjectSection(todo_project_affliation.toLowerCase());

            break;

        case "notes-field":
            let note_title = document.querySelector("#title").value,
                note_description = document.querySelector("#description").value,
                note_project_affliation = document.querySelector("#affliation").value,
                note = new Notes(note_title, note_description);

                updateFiles(note, note_project_affliation);
                updateProjectSection("notes");
                
            break;

        default:
            let projects = getProject();

            let project_title = document.querySelector("#title").value;
            
            let existing_project = projects.filter(project => project.title.toLowerCase() === project_title.toLowerCase());
            
            if(existing_project.length === 0) {
                let project = new Project(project_title, []);

                projects.push(project);   
            }

            saveProject(projects);

            break;
    }

    closeForm();
    toggleCategories()
})

function closeForm() {
    blanket.style.display = "none";
    form.innerHTML = "";
    pop_form.classList.remove("state");
    updateCount();
    updateProjectsList();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#todos").classList.add("active");
    updateProjectsList();
    updateProjectSection("todos");
    toggleCategories();
});

