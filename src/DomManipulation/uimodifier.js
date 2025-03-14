import { getProject } from "../AppLogic/localStorageQuery";
import domGenerator from "./domgenerator";
import { deleteItem } from "../AppLogic/updatefiles";

const projects_panel = document.querySelector(".projects");

export function updateCount() {
    let projects = getProject();
    let todos = projects.filter(project => project.title.toLowerCase() === "todos")[0];
    let notes = projects.filter(project => project.title.toLowerCase() === "notes")[0];
    
    document.querySelector(".todos span:last-of-type").textContent = todos.data.length;
    document.querySelector(".notes span:last-of-type").textContent = notes.data.length;
}

updateCount();

export function toggleCategories(categories = document.querySelectorAll(".category")) {
    categories.forEach(category => {
        category.addEventListener("click", (e) => {

            categories.forEach(c => {
                c.classList.remove("active")
            })

            category.classList.add("active");
            
            updateProjectSection(category.getAttribute("id"));
            
        })
    });
}

export function updateProjectsList() {

    let projects = getProject().filter(project => project.title.toLowerCase() !== "todos" && project.title.toLowerCase() !== "notes" );
    projects_panel.innerHTML = "";

    let span = document.createElement("span");
    span.textContent = "Projects";
    projects_panel.append(span);

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        
        let div = document.createElement("div");
        div.classList.add("project");
        div.classList.add("category");
        div.setAttribute("id", project.title);

        let span_name = document.createElement("span");
        span_name.textContent = project.title;

        let span_count = document.createElement("span");
        span_count.textContent = project.data.length;
        
        div.append(span_name);
        div.append(span_count);

        projects_panel.append(div)
    }

    toggleCategories();
}

updateProjectsList();

export function updateProjectSection(section_heading) {

    let project_list = getProject().filter(project => project.title.toLowerCase() === section_heading.toLowerCase())[0].data;

    switch (section_heading.toLowerCase()) {
        case "todos":
            domGenerator.todos(project_list);
            break;
        
        case "notes":
            domGenerator.notes(project_list);
            break;
    
        default:
            domGenerator.todos(project_list, section_heading);
            break;
    }

    getDeleteBtns();
}

function getDeleteBtns() {
    let deleteBtns = document.querySelectorAll("#delete-btn");
    
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", deleteItem)
    })
}