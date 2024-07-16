import "./style.css";
import logo from "./assets/icon.png";
import { Notes, Project, Todo} from "./datamodels";

document.querySelector(".logo-text img").setAttribute("src", logo);

const defaultTodoProject = new Project("Todos");
const defaultNoteProject = new Project("Notes");

let files = {
    "todos" : {},
    "notes" : {},
    "projects" : {
        "todos" : [],
        "notes" : []
    }
}

if (localStorage.getItem("files")) {
    
    files = JSON.parse(localStorage.getItem("files"));

} else {
    localStorage.setItem("files", JSON.stringify(files));
}

export default function updateFiles(title, data, destination) {
    const old_files = JSON.parse(localStorage.getItem("files"));

    switch (destination) {
        
        case "todos":
            old_files.todos[title] = data;
            old_files.projects["todos"].append(data);
            break

        case "notes":
            old_files.notes[title] = data;
            old_files.projects["notes"].append(data);
            break

        default:
            old_files.projects[title] = data;
            break
    }

    localStorage.setItem("files", JSON.stringify(old_files));
}