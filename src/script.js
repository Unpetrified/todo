import "./style.css";
import logo from "./assets/icon.png";
import { Project } from "./datamodels";

document.querySelector(".logo-text img").setAttribute("src", logo);

const defaultTodoProject = new Project("Todos", []);
const defaultNoteProject = new Project("Notes", []);

let projects = [defaultTodoProject, defaultNoteProject];

if (!localStorage.getItem("projects")) {
    
    localStorage.setItem("projects", JSON.stringify(projects));

}