import { Project } from "./datamodels";

export function getProject() {
    let projects_from_storage = JSON.parse(localStorage.getItem("projects"));

    // convert the array items back to a project object
    let restored_projects = [];
    
    if (projects_from_storage === null) {
        restored_projects = [{"title":"Todos","data":[]},{"title":"Notes","data":[]}];
        return restored_projects
    };

    for (let index = 0; index < projects_from_storage.length; index++) {
        const element = projects_from_storage[index];
        let restored_project_object = new Project(element.title, element.data);
        restored_projects.push(restored_project_object);
    }

    return restored_projects
}

export function saveProject(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}