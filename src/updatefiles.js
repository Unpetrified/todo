import { getProject, saveProject } from "./localStorageQuery";
import { updateCount } from "./uimodifier";

export default function updateFiles(data, project_destination) {
    
    let restored_projects = getProject();

    for (let i = 0; i < restored_projects.length; i++) {
        
        const project = restored_projects[i];
        
        if (project_destination === project.title.toLowerCase()) {
            project.data.push(data);
        }
        
    }    

    saveProject(restored_projects);

}