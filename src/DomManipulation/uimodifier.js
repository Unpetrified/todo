import { getProject } from "../AppLogic/localStorageQuery";
import domGenerator from "./domgenerator";

const projects_panel = document.querySelector(".projects");

updateCount();
export function updateCount() {

    let projects = getProject();
    let todos = projects[0];
    let notes = projects[1];
    
    document.querySelector(".todos span:last-of-type").textContent = todos.data.length;
    document.querySelector(".notes span:last-of-type").textContent = notes.data.length;
}

// updateProjectsList();
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
}
// [
// {"title":"Todos",
// "data":[{"title":"Print form","description":"Remember to print it on your way home","due_date":"2025-03-08","priority":"medium"},
// {"title":"Go see naza","description":"She is a bitch","due_date":"2025-03-26","priority":"high"}
// ]},
// 
// {"title":"Notes",
// "data":[
// {"title":"Type","description":"I am tired\n"},
// {"title":"Another one","description":"This is a new note\n"}
// ]},
// 
// {"title":"Build software",
// "data":[]},
// {"title":"Write a book",
// "data":[]},
// {"title":"Have some fun",
// "data":[]}]
export function updateProjectSection(section_heading) {
    let project_list = getProject().filter(project => project.title.toLowerCase() === section_heading.toLowerCase())[0].data;

    switch (section_heading) {
        case "todos":
            domGenerator.todos(project_list);
            break;
        
        case "notes":
            domGenerator.notes(project_list);
            break;
    
        default:
            domGenerator.projects(project_list, section_heading);
            break;
    }
}