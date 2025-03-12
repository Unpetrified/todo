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
    
    let allProjects = getProject(),
        project_title = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.textContent, // get project containing item
        item_title = e.currentTarget.closest(".todo-item-heading").firstChild.textContent,
        project_in_storage = allProjects.filter(project => project.title === project_title)[0],
        item_in_storage = project_in_storage.data.filter(item => item.title === item_title)[0],
        item_index = project_in_storage.data.indexOf(item_in_storage);

    project_in_storage.data.splice(item_index, 1);
    
    let isProjectEmpty = project_in_storage.data.length === 0,
        isCustomProject = project_title.toLowerCase() !== "todos" && project_title.toLowerCase() !== "notes",
        section_heading = project_title;

    if (isProjectEmpty && isCustomProject) {
        allProjects.splice(allProjects.indexOf(project_in_storage), 1);
        section_heading = "todos";
    }
    saveProject(allProjects);
    updateProjectSection(section_heading);
    updateCount();
    updateProjectsList();
}