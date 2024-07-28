import { toggleCategories } from "./eventhandlers";
import { getProject } from "./localStorageQuery";

// let notes = projects.filter(project => project.title.toLowerCase() === "notes");
const projects_panel = document.querySelector(".projects");

updateCount();
export function updateCount() {

    let projects = getProject();
    let todos = projects[0];
    let notes = projects[1];
    
    document.querySelector(".todos span:last-of-type").textContent = todos.data.length;
    document.querySelector(".notes span:last-of-type").textContent = notes.data.length;
}

updateProjectsList();
export function updateProjectsList() {
    let projects = getProject();
    projects_panel.innerHTML = "";

    if(projects.length < 2) {
        return
    }

    let span = document.createElement("span");
    span.textContent = "Projects";
    projects_panel.append(span);

    for (let i = 2; i < projects.length; i++) {
        const project = projects[i];
        
        let div = document.createElement("div");
        div.classList.add("project");
        div.classList.add("category");

        let span_name = document.createElement("span");
        span_name.textContent = project.title;

        let span_count = document.createElement("span");
        span_count.textContent = project.data.length;
        
        div.append(span_name);
        div.append(span_count);

        projects_panel.append(div)
    }

    let categories = document.querySelectorAll(".category");
    toggleCategories(categories);
}