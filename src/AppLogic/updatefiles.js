import { updateCount, updateProjectSection, updateProjectsList } from "../DomManipulation/uimodifier";
import { getProject, saveProject } from "./localStorageQuery";

export function updateFiles(data, project_destination) {
    
    let restored_projects = getProject();

    for (let i = 0; i < restored_projects.length; i++) {
        
        const project = restored_projects[i];
        
        if (project_destination === project.title.toLowerCase()) {
            project.data.push(data);
        }
        
    }    

    saveProject(restored_projects);

}

export function deleteItem(e) {
    console.log("clicked");
    
    let allProjects = getProject(),
        project_title = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.textContent, // get project containing item
        item_title = e.currentTarget.closest(".todo-item-heading").firstChild.textContent,
        project_in_storage = allProjects.filter(project => project.title === project_title)[0],
        item_in_storage = project_in_storage.data.filter(item => item.title === item_title)[0],
        item_index = project_in_storage.data.indexOf(item_in_storage);

    project_in_storage.data.splice(item_index, 1);
    
    // if (project_in_storage.data.length === 0 && (project_title.toLowerCase() !== "todos" || project_title.toLowerCase() !== "notes")) {
    //     allProjects.splice(allProjects.indexOf(project_in_storage), 1);
        
    // }

    saveProject(allProjects);
    updateProjectSection(project_title);
    updateCount();
    updateProjectsList();
    return
}

export function editItem(e) {
    const allProjects = getProject();
    console.log(allProjects);
    console.log(e.target);
    
    saveProject(allProjects);
}