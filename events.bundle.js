/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AppLogic/datamodels.js":
/*!************************************!*\
  !*** ./src/AppLogic/datamodels.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Notes: () => (/* binding */ Notes),
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   Todo: () => (/* binding */ Todo)
/* harmony export */ });
class Todo {
    constructor(title, description, due_date, priority) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.priority = priority;
    }

}

Todo.prototype.getProperties = function() {
    const properties = {"title" : this.title, "description" : this.description, "due date" : this.due_date, "priority" : this.priority}
    return properties
}

class Notes {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

Notes.prototype.getProperties = function() {
    const properties = {"title" : this.title, "description" : this.description}
    return properties
}

class Project {
    constructor(title, data) {
        this.title = title;
        this.data = data;
    }
}

Project.prototype.getData = function() {   
    return this.data
}

Project.prototype.updateData = function(item) {   
    this.data.push(item);
}

Project.prototype.removeItem = function(item) {   
    this.data.splice(this.data.indexof(item), 1);
}

/***/ }),

/***/ "./src/AppLogic/localStorageQuery.js":
/*!*******************************************!*\
  !*** ./src/AppLogic/localStorageQuery.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getProject: () => (/* binding */ getProject),
/* harmony export */   saveProject: () => (/* binding */ saveProject)
/* harmony export */ });
/* harmony import */ var _datamodels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datamodels */ "./src/AppLogic/datamodels.js");


function getProject() {
    let projects_from_storage = JSON.parse(localStorage.getItem("projects"));

    // convert the array items back to a project object
    let restored_projects = [];
    
    if (projects_from_storage === null) {
        restored_projects = [{"title":"Todos","data":[]},{"title":"Notes","data":[]}];
        return restored_projects
    };

    for (let index = 0; index < projects_from_storage.length; index++) {
        const element = projects_from_storage[index];
        let restored_project_object = new _datamodels__WEBPACK_IMPORTED_MODULE_0__.Project(element.title, element.data);
        restored_projects.push(restored_project_object);
    }

    return restored_projects
}

function saveProject(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

/***/ }),

/***/ "./src/AppLogic/updatefiles.js":
/*!*************************************!*\
  !*** ./src/AppLogic/updatefiles.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteItem: () => (/* binding */ deleteItem),
/* harmony export */   updateFiles: () => (/* binding */ updateFiles)
/* harmony export */ });
/* harmony import */ var _DomManipulation_uimodifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DomManipulation/uimodifier */ "./src/DomManipulation/uimodifier.js");
/* harmony import */ var _localStorageQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorageQuery */ "./src/AppLogic/localStorageQuery.js");



function updateFiles(data, project_destination) {
    
    let restored_projects = (0,_localStorageQuery__WEBPACK_IMPORTED_MODULE_1__.getProject)();

    for (let i = 0; i < restored_projects.length; i++) {
        
        const project = restored_projects[i];
        
        if (project_destination === project.title.toLowerCase()) {
            project.data.push(data);
        }
        
    }    

    (0,_localStorageQuery__WEBPACK_IMPORTED_MODULE_1__.saveProject)(restored_projects);

}

function deleteItem(e) {
    
    let allProjects = (0,_localStorageQuery__WEBPACK_IMPORTED_MODULE_1__.getProject)(),
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
    (0,_localStorageQuery__WEBPACK_IMPORTED_MODULE_1__.saveProject)(allProjects);
    (0,_DomManipulation_uimodifier__WEBPACK_IMPORTED_MODULE_0__.updateProjectSection)(section_heading);
    (0,_DomManipulation_uimodifier__WEBPACK_IMPORTED_MODULE_0__.updateCount)();
    (0,_DomManipulation_uimodifier__WEBPACK_IMPORTED_MODULE_0__.updateProjectsList)();
}

/***/ }),

/***/ "./src/DomManipulation/domgenerator.js":
/*!*********************************************!*\
  !*** ./src/DomManipulation/domgenerator.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _elementMakers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elementMakers */ "./src/DomManipulation/elementMakers.js");


const section = document.querySelector(".list");

function generateTodos(todoList, section_head = "Todos") {

    let sectionHeading = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getSectionHeading(section_head),
        todos = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectContainer();
    
    todoList.forEach(todo => {
        let todoItem = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectCard(),
            todoHeadingContainer = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectHeading(),
            todoHeading = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectTitle(todo["title"]),
            actionBtns = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getButtons(),
            todo_description = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectDescription(todo["description"]),
            todo_date = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectDate(todo["due_date"]);

        todoHeadingContainer.append(todoHeading, actionBtns);
        todoItem.append(todoHeadingContainer, todo_description, todo_date);
        todos.append(todoItem);
    });

    section.innerHTML = "";
    section.append(sectionHeading, todos);
}

function generateNotes(noteList) {

    let sectionHeading = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getSectionHeading("Notes");
    let notes = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectContainer();

    noteList.forEach(note => {
        let noteItem = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectCard(),
            noteHeadingContainer = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectHeading(),
            noteHeading = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectTitle(note["title"]),
            actionBtns = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getButtons(),
            note_description = _elementMakers__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectDescription(note["description"]);

        noteHeadingContainer.append(noteHeading, actionBtns);
        noteItem.append(noteHeadingContainer, note_description);
        notes.append(noteItem);
    });

    section.innerHTML = "";
    section.append(sectionHeading, notes);
}

const domGenerator = {
    "todos" : generateTodos,
    "notes" : generateNotes,
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domGenerator);

/***/ }),

/***/ "./src/DomManipulation/elementMakers.js":
/*!**********************************************!*\
  !*** ./src/DomManipulation/elementMakers.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todosvgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todosvgs */ "./src/DomManipulation/todosvgs.js");


function getLabel(id="", text_content="") {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    
    label.textContent = text_content;

    return label
}

function getInput(id, type, name="", value="") {
    const input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", type);
    input.setAttribute("required", true)

    return input
}

function getTextArea(id, name, rows) {
    const text_area = document.createElement("textarea");
    text_area.setAttribute("id", id);
    text_area.setAttribute("name", name);
    text_area.setAttribute("rows", rows);
    text_area.setAttribute("required", true)

    return text_area
}

function getSelection(choices) {
    let select = document.createElement("select");
    select.setAttribute("id", "affliation");
    select.setAttribute("required", true);

    choices.forEach(choice => {
        let option = document.createElement("option");
        option.setAttribute("value", choice.title.toLowerCase());
        option.textContent = choice.title;
        select.append(option);
    });

    return select
}


function getSectionHeading(section_heading) {
    let section_head = document.createElement("h2");
    section_head.setAttribute("class", "todo-heading");
    section_head.textContent = section_heading;
    return section_head;
}

function getProjectContainer() {
    let div = document.createElement("div");
    div.setAttribute("class", "todo-items");
    return div
}

function getProjectCard() {
    let div = document.createElement("div");
    div.setAttribute("class", "todo-item");
    return div
}

function getProjectHeading() {
    let span = document.createElement("span");
    span.setAttribute("class", "todo-item-heading");
    return span
}

function getProjectTitle(value) {
    let heading = document.createElement("h4");
    heading.textContent = value;
    return heading
}

function getSVG(svg_value, id) {
    let svg = document.createElement("div");
    svg.setAttribute("id", id);
    svg.innerHTML = svg_value;
    return svg
}

function getButtons() {
    let div = document.createElement("div");
    div.setAttribute("class", "buttons");
    let deleteBtn = getSVG(_todosvgs__WEBPACK_IMPORTED_MODULE_0__.deleteSvg, "delete-btn");
    div.append( deleteBtn);
    return div
}

function getProjectDescription(description) {
    let p = document.createElement("p");
    p.setAttribute("class", "todo-item-description");
    p.textContent = description;
    return p
}

function getProjectDate(date) {
    let p = document.createElement("p");
    p.setAttribute("class", "todo-item-date");
    p.textContent = date;
    return p
}

const makers = {
    "getLabel" : getLabel, 
    "getInput" : getInput,
    "getTextArea" : getTextArea,
    "getSelection" : getSelection,
    "getSectionHeading" : getSectionHeading,
    "getProjectContainer" : getProjectContainer,
    "getProjectCard" : getProjectCard,
    "getProjectHeading" : getProjectHeading,
    "getProjectTitle" : getProjectTitle,
    "getButtons" : getButtons,
    "getProjectDescription" : getProjectDescription,
    "getProjectDate" : getProjectDate,
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (makers);

/***/ }),

/***/ "./src/DomManipulation/formgenerator.js":
/*!**********************************************!*\
  !*** ./src/DomManipulation/formgenerator.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AppLogic_localStorageQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AppLogic/localStorageQuery */ "./src/AppLogic/localStorageQuery.js");
/* harmony import */ var _elementMakers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elementMakers */ "./src/DomManipulation/elementMakers.js");



function todoFieldGenerator(project="todos") {
    const todo_form = document.createElement("fieldset");
    todo_form.classList.add("todo-field");

    const title_label = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getLabel("title", "Title");
    const title_input = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getInput("title", "text");

    const description_label = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getLabel("description", "Description");
    const description_input = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getTextArea("description", "description", "3");

    const due_date_label = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getLabel("due-date", "Due Date");
    const due_date_input = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getInput("due-date", "date");

    const project_affliation_label = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getLabel("project affliation", "Project Affliation");
    const activeTodoProjects = (0,_AppLogic_localStorageQuery__WEBPACK_IMPORTED_MODULE_0__.getProject)().filter(project => project.title.toLowerCase() !== "notes");
    const project_affliation = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getSelection(activeTodoProjects);
    project_affliation.setAttribute("value", project);

    [title_label, title_input, description_label, description_input, due_date_label, due_date_input, project_affliation_label, project_affliation].forEach(element => {
        todo_form.append(element);
    })

    return todo_form
}

function projectFieldGenerator() {
            
    const project_form = document.createElement("fieldset");
    project_form.classList.add("project-field");

    const title_label = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getLabel("title", "Title");
    const title_input = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getInput("title", "text");


    [title_label, title_input].forEach(element => {
        project_form.append(element);
    })

    return project_form
}

function noteFieldGenerator(project="notes") {
    const note_form = document.createElement("fieldset");
    note_form.classList.add("notes-field");

    const title_label = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getLabel("title", "Title");
    const title_input = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getInput("title", "text");

    const description_label = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getLabel("description", "Description");
    const description_input = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getTextArea("description", "description", "3");

    const project_affliation = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getInput("affliation", "text");
    project_affliation.setAttribute("value", project);
    project_affliation.style.display = "none";

    [title_label, title_input, description_label, description_input, project_affliation].forEach(element => {
        note_form.append(element);
    })

    return note_form
}

function submitBtn(activeField) {
    const input = _elementMakers__WEBPACK_IMPORTED_MODULE_1__["default"].getInput("submit-btn", "submit");
    input.setAttribute("value", activeField);

    return input
}

const formFieldGenerator = {
    "todo" : todoFieldGenerator,
    "project" : projectFieldGenerator,
    "note" : noteFieldGenerator,
    "submit" : submitBtn
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formFieldGenerator);

/***/ }),

/***/ "./src/DomManipulation/todosvgs.js":
/*!*****************************************!*\
  !*** ./src/DomManipulation/todosvgs.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteSvg: () => (/* binding */ deleteSvg),
/* harmony export */   editSvg: () => (/* binding */ editSvg)
/* harmony export */ });
// const noteSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>note-outline</title><path d="M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3M5,5V19H19V12H12V5H5Z" /></svg>'

// const projectSvg = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>clipboard-edit-outline</title><path d="M21.04 12.13C21.18 12.13 21.31 12.19 21.42 12.3L22.7 13.58C22.92 13.79 22.92 14.14 22.7 14.35L21.7 15.35L19.65 13.3L20.65 12.3C20.76 12.19 20.9 12.13 21.04 12.13M19.07 13.88L21.12 15.93L15.06 22H13V19.94L19.07 13.88M11 19L9 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9.18C9.6 1.84 10.7 1 12 1C13.3 1 14.4 1.84 14.82 3H19C20.1 3 21 3.9 21 5V9L19 11V5H17V7H7V5H5V19H11M12 3C11.45 3 11 3.45 11 4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4C13 3.45 12.55 3 12 3Z" /></svg>

// const normal todo <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>checkbox-marked-circle-plus-outline</title><path d="M14.3 21.7C13.6 21.9 12.8 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2C13.3 2 14.6 2.3 15.8 2.7L14.2 4.3C13.5 4.1 12.8 4 12 4C7.6 4 4 7.6 4 12S7.6 20 12 20C12.4 20 12.9 20 13.3 19.9C13.5 20.6 13.9 21.2 14.3 21.7M7.9 10.1L6.5 11.5L11 16L21 6L19.6 4.6L11 13.2L7.9 10.1M18 14V17H15V19H18V22H20V19H23V17H20V14H18Z" /></svg>

const editSvg = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>'

const deleteSvg = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>'

/***/ }),

/***/ "./src/DomManipulation/uimodifier.js":
/*!*******************************************!*\
  !*** ./src/DomManipulation/uimodifier.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toggleCategories: () => (/* binding */ toggleCategories),
/* harmony export */   updateCount: () => (/* binding */ updateCount),
/* harmony export */   updateProjectSection: () => (/* binding */ updateProjectSection),
/* harmony export */   updateProjectsList: () => (/* binding */ updateProjectsList)
/* harmony export */ });
/* harmony import */ var _AppLogic_localStorageQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AppLogic/localStorageQuery */ "./src/AppLogic/localStorageQuery.js");
/* harmony import */ var _domgenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domgenerator */ "./src/DomManipulation/domgenerator.js");
/* harmony import */ var _AppLogic_updatefiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AppLogic/updatefiles */ "./src/AppLogic/updatefiles.js");




const projects_panel = document.querySelector(".projects");

function updateCount() {
    let projects = (0,_AppLogic_localStorageQuery__WEBPACK_IMPORTED_MODULE_0__.getProject)();
    let todos = projects.filter(project => project.title.toLowerCase() === "todos")[0];
    let notes = projects.filter(project => project.title.toLowerCase() === "notes")[0];
    
    document.querySelector(".todos span:last-of-type").textContent = todos.data.length;
    document.querySelector(".notes span:last-of-type").textContent = notes.data.length;
}

updateCount();

function toggleCategories(categories = document.querySelectorAll(".category")) {
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

function updateProjectsList() {

    let projects = (0,_AppLogic_localStorageQuery__WEBPACK_IMPORTED_MODULE_0__.getProject)().filter(project => project.title.toLowerCase() !== "todos" && project.title.toLowerCase() !== "notes" );
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

function updateProjectSection(section_heading) {

    let project_list = (0,_AppLogic_localStorageQuery__WEBPACK_IMPORTED_MODULE_0__.getProject)().filter(project => project.title.toLowerCase() === section_heading.toLowerCase())[0].data;

    switch (section_heading.toLowerCase()) {
        case "todos":
            _domgenerator__WEBPACK_IMPORTED_MODULE_1__["default"].todos(project_list);
            break;
        
        case "notes":
            _domgenerator__WEBPACK_IMPORTED_MODULE_1__["default"].notes(project_list);
            break;
    
        default:
            _domgenerator__WEBPACK_IMPORTED_MODULE_1__["default"].todos(project_list, section_heading);
            break;
    }

    getDeleteBtns();
}

function getDeleteBtns() {
    let deleteBtns = document.querySelectorAll("#delete-btn");
    
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", _AppLogic_updatefiles__WEBPACK_IMPORTED_MODULE_2__.deleteItem)
    })
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./src/DomManipulation/eventhandlers.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _formgenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formgenerator */ "./src/DomManipulation/formgenerator.js");
/* harmony import */ var _AppLogic_datamodels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppLogic/datamodels */ "./src/AppLogic/datamodels.js");
/* harmony import */ var _AppLogic_updatefiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AppLogic/updatefiles */ "./src/AppLogic/updatefiles.js");
/* harmony import */ var _AppLogic_localStorageQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AppLogic/localStorageQuery */ "./src/AppLogic/localStorageQuery.js");
/* harmony import */ var _uimodifier__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uimodifier */ "./src/DomManipulation/uimodifier.js");






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

(0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.toggleCategories)(categories);
(0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.toggleCategories)(projects);

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
        form.append(_formgenerator__WEBPACK_IMPORTED_MODULE_0__["default"].todo());
        form.append(_formgenerator__WEBPACK_IMPORTED_MODULE_0__["default"].submit("Make Todo"));
        open_todo_form.classList.add("active-form");

        return
    } 
    
    // display the form field corresponding with the clicked formtype
    e.target.classList.add("active-form");
    switch (e.target) {
        case open_todo_form:
            form.append(_formgenerator__WEBPACK_IMPORTED_MODULE_0__["default"].todo());
            form.append(_formgenerator__WEBPACK_IMPORTED_MODULE_0__["default"].submit("Make Todo"));
            break
        
        case open_note_form:
            form.append(_formgenerator__WEBPACK_IMPORTED_MODULE_0__["default"].note());
            form.append(_formgenerator__WEBPACK_IMPORTED_MODULE_0__["default"].submit("Create Note"));
            break
        
        default:
            form.append(_formgenerator__WEBPACK_IMPORTED_MODULE_0__["default"].project());
            form.append(_formgenerator__WEBPACK_IMPORTED_MODULE_0__["default"].submit("Create Project"));
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
                todo = new _AppLogic_datamodels__WEBPACK_IMPORTED_MODULE_1__.Todo(todo_title, todo_description, due_date);

            (0,_AppLogic_updatefiles__WEBPACK_IMPORTED_MODULE_2__.updateFiles)(todo, todo_project_affliation);
            (0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.updateProjectSection)(todo_project_affliation.toLowerCase());

            break;

        case "notes-field":
            let note_title = document.querySelector("#title").value,
                note_description = document.querySelector("#description").value,
                note_project_affliation = document.querySelector("#affliation").value,
                note = new _AppLogic_datamodels__WEBPACK_IMPORTED_MODULE_1__.Notes(note_title, note_description);

                (0,_AppLogic_updatefiles__WEBPACK_IMPORTED_MODULE_2__.updateFiles)(note, note_project_affliation);
                (0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.updateProjectSection)("notes");
                
            break;

        default:
            let projects = (0,_AppLogic_localStorageQuery__WEBPACK_IMPORTED_MODULE_3__.getProject)();

            let project_title = document.querySelector("#title").value;
            
            let existing_project = projects.filter(project => project.title.toLowerCase() === project_title.toLowerCase());
            
            if(existing_project.length === 0) {
                let project = new _AppLogic_datamodels__WEBPACK_IMPORTED_MODULE_1__.Project(project_title, []);

                projects.push(project);   
            }

            (0,_AppLogic_localStorageQuery__WEBPACK_IMPORTED_MODULE_3__.saveProject)(projects);

            break;
    }

    closeForm();
    (0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.toggleCategories)()
})

function closeForm() {
    blanket.style.display = "none";
    form.innerHTML = "";
    pop_form.classList.remove("state");
    (0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.updateCount)();
    (0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.updateProjectsList)();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#todos").classList.add("active");
    (0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.updateProjectsList)();
    (0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.updateProjectSection)("todos");
    (0,_uimodifier__WEBPACK_IMPORTED_MODULE_4__.toggleCategories)();
});


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q3VDOztBQUVoQztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBCQUEwQixFQUFFLDBCQUEwQjtBQUNwRjtBQUNBOztBQUVBLHdCQUF3QixzQ0FBc0M7QUFDOUQ7QUFDQSwwQ0FBMEMsZ0RBQU87QUFDakQ7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QnNHO0FBQ3hDOztBQUV2RDtBQUNQO0FBQ0EsNEJBQTRCLDhEQUFVOztBQUV0QyxvQkFBb0IsOEJBQThCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSwrREFBVzs7QUFFZjs7QUFFTztBQUNQO0FBQ0Esc0JBQXNCLDhEQUFVO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksK0RBQVc7QUFDZixJQUFJLGlGQUFvQjtBQUN4QixJQUFJLHdFQUFXO0FBQ2YsSUFBSSwrRUFBa0I7QUFDdEI7Ozs7Ozs7Ozs7Ozs7OztBQzVDcUM7O0FBRXJDOztBQUVBOztBQUVBLHlCQUF5QixzREFBTTtBQUMvQixnQkFBZ0Isc0RBQU07QUFDdEI7QUFDQTtBQUNBLHVCQUF1QixzREFBTTtBQUM3QixtQ0FBbUMsc0RBQU07QUFDekMsMEJBQTBCLHNEQUFNO0FBQ2hDLHlCQUF5QixzREFBTTtBQUMvQiwrQkFBK0Isc0RBQU07QUFDckMsd0JBQXdCLHNEQUFNOztBQUU5QjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx5QkFBeUIsc0RBQU07QUFDL0IsZ0JBQWdCLHNEQUFNOztBQUV0QjtBQUNBLHVCQUF1QixzREFBTTtBQUM3QixtQ0FBbUMsc0RBQU07QUFDekMsMEJBQTBCLHNEQUFNO0FBQ2hDLHlCQUF5QixzREFBTTtBQUMvQiwrQkFBK0Isc0RBQU07O0FBRXJDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFlBQVk7Ozs7Ozs7Ozs7Ozs7OztBQ3BEWTs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdEQUFTO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SDRDO0FBQ3RCOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLHNEQUFNO0FBQzlCLHdCQUF3QixzREFBTTs7QUFFOUIsOEJBQThCLHNEQUFNO0FBQ3BDLDhCQUE4QixzREFBTTs7QUFFcEMsMkJBQTJCLHNEQUFNO0FBQ2pDLDJCQUEyQixzREFBTTs7QUFFakMscUNBQXFDLHNEQUFNO0FBQzNDLCtCQUErQix1RUFBVTtBQUN6QywrQkFBK0Isc0RBQU07QUFDckM7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0Isc0RBQU07QUFDOUIsd0JBQXdCLHNEQUFNOzs7QUFHOUI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLHNEQUFNO0FBQzlCLHdCQUF3QixzREFBTTs7QUFFOUIsOEJBQThCLHNEQUFNO0FBQ3BDLDhCQUE4QixzREFBTTs7QUFFcEMsK0JBQStCLHNEQUFNO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixzREFBTTtBQUN4Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7OztBQy9FakM7O0FBRUE7O0FBRUE7O0FBRU87O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUm9EO0FBQ2pCO0FBQ1c7O0FBRXJEOztBQUVPO0FBQ1AsbUJBQW1CLHVFQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVPOztBQUVQLG1CQUFtQix1RUFBVTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFTzs7QUFFUCx1QkFBdUIsdUVBQVU7O0FBRWpDO0FBQ0E7QUFDQSxZQUFZLHFEQUFZO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLFlBQVkscURBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxxREFBWTtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsNkRBQVU7QUFDdEQsS0FBSztBQUNMOzs7Ozs7VUM5RkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTmlEO0FBQ1k7QUFDUDtBQUNrQjtBQUMrQjs7QUFFdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsNkRBQWdCO0FBQ2hCLDZEQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNEQUFrQjtBQUN0QyxvQkFBb0Isc0RBQWtCO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNEQUFrQjtBQUMxQyx3QkFBd0Isc0RBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzREFBa0I7QUFDMUMsd0JBQXdCLHNEQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0RBQWtCO0FBQzFDLHdCQUF3QixzREFBa0I7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHNEQUFJOztBQUUvQixZQUFZLGtFQUFXO0FBQ3ZCLFlBQVksaUVBQW9COztBQUVoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1REFBSzs7QUFFaEMsZ0JBQWdCLGtFQUFXO0FBQzNCLGdCQUFnQixpRUFBb0I7QUFDcEM7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQix1RUFBVTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5REFBTzs7QUFFekM7QUFDQTs7QUFFQSxZQUFZLHdFQUFXOztBQUV2QjtBQUNBOztBQUVBO0FBQ0EsSUFBSSw2REFBZ0I7QUFDcEIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0RBQVc7QUFDZixJQUFJLCtEQUFrQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSwrREFBa0I7QUFDdEIsSUFBSSxpRUFBb0I7QUFDeEIsSUFBSSw2REFBZ0I7QUFDcEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvQXBwTG9naWMvZGF0YW1vZGVscy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL0FwcExvZ2ljL2xvY2FsU3RvcmFnZVF1ZXJ5LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvQXBwTG9naWMvdXBkYXRlZmlsZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9Eb21NYW5pcHVsYXRpb24vZG9tZ2VuZXJhdG9yLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvRG9tTWFuaXB1bGF0aW9uL2VsZW1lbnRNYWtlcnMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9Eb21NYW5pcHVsYXRpb24vZm9ybWdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RvbU1hbmlwdWxhdGlvbi90b2Rvc3Zncy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RvbU1hbmlwdWxhdGlvbi91aW1vZGlmaWVyLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RvbU1hbmlwdWxhdGlvbi9ldmVudGhhbmRsZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUb2RvIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZV9kYXRlLCBwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kdWVfZGF0ZSA9IGR1ZV9kYXRlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgfVxuXG59XG5cblRvZG8ucHJvdG90eXBlLmdldFByb3BlcnRpZXMgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0ge1widGl0bGVcIiA6IHRoaXMudGl0bGUsIFwiZGVzY3JpcHRpb25cIiA6IHRoaXMuZGVzY3JpcHRpb24sIFwiZHVlIGRhdGVcIiA6IHRoaXMuZHVlX2RhdGUsIFwicHJpb3JpdHlcIiA6IHRoaXMucHJpb3JpdHl9XG4gICAgcmV0dXJuIHByb3BlcnRpZXNcbn1cblxuZXhwb3J0IGNsYXNzIE5vdGVzIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxufVxuXG5Ob3Rlcy5wcm90b3R5cGUuZ2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7XCJ0aXRsZVwiIDogdGhpcy50aXRsZSwgXCJkZXNjcmlwdGlvblwiIDogdGhpcy5kZXNjcmlwdGlvbn1cbiAgICByZXR1cm4gcHJvcGVydGllc1xufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRhdGEpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbn1cblxuUHJvamVjdC5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uKCkgeyAgIFxuICAgIHJldHVybiB0aGlzLmRhdGFcbn1cblxuUHJvamVjdC5wcm90b3R5cGUudXBkYXRlRGF0YSA9IGZ1bmN0aW9uKGl0ZW0pIHsgICBcbiAgICB0aGlzLmRhdGEucHVzaChpdGVtKTtcbn1cblxuUHJvamVjdC5wcm90b3R5cGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHsgICBcbiAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleG9mKGl0ZW0pLCAxKTtcbn0iLCJpbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vZGF0YW1vZGVsc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdCgpIHtcbiAgICBsZXQgcHJvamVjdHNfZnJvbV9zdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKTtcblxuICAgIC8vIGNvbnZlcnQgdGhlIGFycmF5IGl0ZW1zIGJhY2sgdG8gYSBwcm9qZWN0IG9iamVjdFxuICAgIGxldCByZXN0b3JlZF9wcm9qZWN0cyA9IFtdO1xuICAgIFxuICAgIGlmIChwcm9qZWN0c19mcm9tX3N0b3JhZ2UgPT09IG51bGwpIHtcbiAgICAgICAgcmVzdG9yZWRfcHJvamVjdHMgPSBbe1widGl0bGVcIjpcIlRvZG9zXCIsXCJkYXRhXCI6W119LHtcInRpdGxlXCI6XCJOb3Rlc1wiLFwiZGF0YVwiOltdfV07XG4gICAgICAgIHJldHVybiByZXN0b3JlZF9wcm9qZWN0c1xuICAgIH07XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHJvamVjdHNfZnJvbV9zdG9yYWdlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gcHJvamVjdHNfZnJvbV9zdG9yYWdlW2luZGV4XTtcbiAgICAgICAgbGV0IHJlc3RvcmVkX3Byb2plY3Rfb2JqZWN0ID0gbmV3IFByb2plY3QoZWxlbWVudC50aXRsZSwgZWxlbWVudC5kYXRhKTtcbiAgICAgICAgcmVzdG9yZWRfcHJvamVjdHMucHVzaChyZXN0b3JlZF9wcm9qZWN0X29iamVjdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3RvcmVkX3Byb2plY3RzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlUHJvamVjdChwcm9qZWN0cykge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbn0iLCJpbXBvcnQgeyB1cGRhdGVDb3VudCwgdXBkYXRlUHJvamVjdFNlY3Rpb24sIHVwZGF0ZVByb2plY3RzTGlzdCB9IGZyb20gXCIuLi9Eb21NYW5pcHVsYXRpb24vdWltb2RpZmllclwiO1xuaW1wb3J0IHsgZ2V0UHJvamVjdCwgc2F2ZVByb2plY3QgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VRdWVyeVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRmlsZXMoZGF0YSwgcHJvamVjdF9kZXN0aW5hdGlvbikge1xuICAgIFxuICAgIGxldCByZXN0b3JlZF9wcm9qZWN0cyA9IGdldFByb2plY3QoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdG9yZWRfcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSByZXN0b3JlZF9wcm9qZWN0c1tpXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChwcm9qZWN0X2Rlc3RpbmF0aW9uID09PSBwcm9qZWN0LnRpdGxlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHByb2plY3QuZGF0YS5wdXNoKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0gICAgXG5cbiAgICBzYXZlUHJvamVjdChyZXN0b3JlZF9wcm9qZWN0cyk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUl0ZW0oZSkge1xuICAgIFxuICAgIGxldCBhbGxQcm9qZWN0cyA9IGdldFByb2plY3QoKSxcbiAgICAgICAgcHJvamVjdF90aXRsZSA9IGUuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCwgLy8gZ2V0IHByb2plY3QgY29udGFpbmluZyBpdGVtXG4gICAgICAgIGl0ZW1fdGl0bGUgPSBlLmN1cnJlbnRUYXJnZXQuY2xvc2VzdChcIi50b2RvLWl0ZW0taGVhZGluZ1wiKS5maXJzdENoaWxkLnRleHRDb250ZW50LFxuICAgICAgICBwcm9qZWN0X2luX3N0b3JhZ2UgPSBhbGxQcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0X3RpdGxlKVswXSxcbiAgICAgICAgaXRlbV9pbl9zdG9yYWdlID0gcHJvamVjdF9pbl9zdG9yYWdlLmRhdGEuZmlsdGVyKGl0ZW0gPT4gaXRlbS50aXRsZSA9PT0gaXRlbV90aXRsZSlbMF0sXG4gICAgICAgIGl0ZW1faW5kZXggPSBwcm9qZWN0X2luX3N0b3JhZ2UuZGF0YS5pbmRleE9mKGl0ZW1faW5fc3RvcmFnZSk7XG5cbiAgICBwcm9qZWN0X2luX3N0b3JhZ2UuZGF0YS5zcGxpY2UoaXRlbV9pbmRleCwgMSk7XG4gICAgXG4gICAgbGV0IGlzUHJvamVjdEVtcHR5ID0gcHJvamVjdF9pbl9zdG9yYWdlLmRhdGEubGVuZ3RoID09PSAwLFxuICAgICAgICBpc0N1c3RvbVByb2plY3QgPSBwcm9qZWN0X3RpdGxlLnRvTG93ZXJDYXNlKCkgIT09IFwidG9kb3NcIiAmJiBwcm9qZWN0X3RpdGxlLnRvTG93ZXJDYXNlKCkgIT09IFwibm90ZXNcIixcbiAgICAgICAgc2VjdGlvbl9oZWFkaW5nID0gcHJvamVjdF90aXRsZTtcblxuICAgIGlmIChpc1Byb2plY3RFbXB0eSAmJiBpc0N1c3RvbVByb2plY3QpIHtcbiAgICAgICAgYWxsUHJvamVjdHMuc3BsaWNlKGFsbFByb2plY3RzLmluZGV4T2YocHJvamVjdF9pbl9zdG9yYWdlKSwgMSk7XG4gICAgICAgIHNlY3Rpb25faGVhZGluZyA9IFwidG9kb3NcIjtcbiAgICB9XG4gICAgc2F2ZVByb2plY3QoYWxsUHJvamVjdHMpO1xuICAgIHVwZGF0ZVByb2plY3RTZWN0aW9uKHNlY3Rpb25faGVhZGluZyk7XG4gICAgdXBkYXRlQ291bnQoKTtcbiAgICB1cGRhdGVQcm9qZWN0c0xpc3QoKTtcbn0iLCJpbXBvcnQgbWFrZXJzIGZyb20gXCIuL2VsZW1lbnRNYWtlcnNcIjtcblxuY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdFwiKTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVUb2Rvcyh0b2RvTGlzdCwgc2VjdGlvbl9oZWFkID0gXCJUb2Rvc1wiKSB7XG5cbiAgICBsZXQgc2VjdGlvbkhlYWRpbmcgPSBtYWtlcnMuZ2V0U2VjdGlvbkhlYWRpbmcoc2VjdGlvbl9oZWFkKSxcbiAgICAgICAgdG9kb3MgPSBtYWtlcnMuZ2V0UHJvamVjdENvbnRhaW5lcigpO1xuICAgIFxuICAgIHRvZG9MaXN0LmZvckVhY2godG9kbyA9PiB7XG4gICAgICAgIGxldCB0b2RvSXRlbSA9IG1ha2Vycy5nZXRQcm9qZWN0Q2FyZCgpLFxuICAgICAgICAgICAgdG9kb0hlYWRpbmdDb250YWluZXIgPSBtYWtlcnMuZ2V0UHJvamVjdEhlYWRpbmcoKSxcbiAgICAgICAgICAgIHRvZG9IZWFkaW5nID0gbWFrZXJzLmdldFByb2plY3RUaXRsZSh0b2RvW1widGl0bGVcIl0pLFxuICAgICAgICAgICAgYWN0aW9uQnRucyA9IG1ha2Vycy5nZXRCdXR0b25zKCksXG4gICAgICAgICAgICB0b2RvX2Rlc2NyaXB0aW9uID0gbWFrZXJzLmdldFByb2plY3REZXNjcmlwdGlvbih0b2RvW1wiZGVzY3JpcHRpb25cIl0pLFxuICAgICAgICAgICAgdG9kb19kYXRlID0gbWFrZXJzLmdldFByb2plY3REYXRlKHRvZG9bXCJkdWVfZGF0ZVwiXSk7XG5cbiAgICAgICAgdG9kb0hlYWRpbmdDb250YWluZXIuYXBwZW5kKHRvZG9IZWFkaW5nLCBhY3Rpb25CdG5zKTtcbiAgICAgICAgdG9kb0l0ZW0uYXBwZW5kKHRvZG9IZWFkaW5nQ29udGFpbmVyLCB0b2RvX2Rlc2NyaXB0aW9uLCB0b2RvX2RhdGUpO1xuICAgICAgICB0b2Rvcy5hcHBlbmQodG9kb0l0ZW0pO1xuICAgIH0pO1xuXG4gICAgc2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHNlY3Rpb24uYXBwZW5kKHNlY3Rpb25IZWFkaW5nLCB0b2Rvcyk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTm90ZXMobm90ZUxpc3QpIHtcblxuICAgIGxldCBzZWN0aW9uSGVhZGluZyA9IG1ha2Vycy5nZXRTZWN0aW9uSGVhZGluZyhcIk5vdGVzXCIpO1xuICAgIGxldCBub3RlcyA9IG1ha2Vycy5nZXRQcm9qZWN0Q29udGFpbmVyKCk7XG5cbiAgICBub3RlTGlzdC5mb3JFYWNoKG5vdGUgPT4ge1xuICAgICAgICBsZXQgbm90ZUl0ZW0gPSBtYWtlcnMuZ2V0UHJvamVjdENhcmQoKSxcbiAgICAgICAgICAgIG5vdGVIZWFkaW5nQ29udGFpbmVyID0gbWFrZXJzLmdldFByb2plY3RIZWFkaW5nKCksXG4gICAgICAgICAgICBub3RlSGVhZGluZyA9IG1ha2Vycy5nZXRQcm9qZWN0VGl0bGUobm90ZVtcInRpdGxlXCJdKSxcbiAgICAgICAgICAgIGFjdGlvbkJ0bnMgPSBtYWtlcnMuZ2V0QnV0dG9ucygpLFxuICAgICAgICAgICAgbm90ZV9kZXNjcmlwdGlvbiA9IG1ha2Vycy5nZXRQcm9qZWN0RGVzY3JpcHRpb24obm90ZVtcImRlc2NyaXB0aW9uXCJdKTtcblxuICAgICAgICBub3RlSGVhZGluZ0NvbnRhaW5lci5hcHBlbmQobm90ZUhlYWRpbmcsIGFjdGlvbkJ0bnMpO1xuICAgICAgICBub3RlSXRlbS5hcHBlbmQobm90ZUhlYWRpbmdDb250YWluZXIsIG5vdGVfZGVzY3JpcHRpb24pO1xuICAgICAgICBub3Rlcy5hcHBlbmQobm90ZUl0ZW0pO1xuICAgIH0pO1xuXG4gICAgc2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHNlY3Rpb24uYXBwZW5kKHNlY3Rpb25IZWFkaW5nLCBub3Rlcyk7XG59XG5cbmNvbnN0IGRvbUdlbmVyYXRvciA9IHtcbiAgICBcInRvZG9zXCIgOiBnZW5lcmF0ZVRvZG9zLFxuICAgIFwibm90ZXNcIiA6IGdlbmVyYXRlTm90ZXMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvbUdlbmVyYXRvcjsiLCJpbXBvcnQgeyBkZWxldGVTdmcgfSBmcm9tIFwiLi90b2Rvc3Znc1wiO1xuXG5mdW5jdGlvbiBnZXRMYWJlbChpZD1cIlwiLCB0ZXh0X2NvbnRlbnQ9XCJcIikge1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBpZCk7XG4gICAgXG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSB0ZXh0X2NvbnRlbnQ7XG5cbiAgICByZXR1cm4gbGFiZWxcbn1cblxuZnVuY3Rpb24gZ2V0SW5wdXQoaWQsIHR5cGUsIG5hbWU9XCJcIiwgdmFsdWU9XCJcIikge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIHR5cGUpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIHRydWUpXG5cbiAgICByZXR1cm4gaW5wdXRcbn1cblxuZnVuY3Rpb24gZ2V0VGV4dEFyZWEoaWQsIG5hbWUsIHJvd3MpIHtcbiAgICBjb25zdCB0ZXh0X2FyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgdGV4dF9hcmVhLnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKTtcbiAgICB0ZXh0X2FyZWEuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBuYW1lKTtcbiAgICB0ZXh0X2FyZWEuc2V0QXR0cmlidXRlKFwicm93c1wiLCByb3dzKTtcbiAgICB0ZXh0X2FyZWEuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgdHJ1ZSlcblxuICAgIHJldHVybiB0ZXh0X2FyZWFcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uKGNob2ljZXMpIHtcbiAgICBsZXQgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICBzZWxlY3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhZmZsaWF0aW9uXCIpO1xuICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCB0cnVlKTtcblxuICAgIGNob2ljZXMuZm9yRWFjaChjaG9pY2UgPT4ge1xuICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGNob2ljZS50aXRsZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gY2hvaWNlLnRpdGxlO1xuICAgICAgICBzZWxlY3QuYXBwZW5kKG9wdGlvbik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZWN0XG59XG5cblxuZnVuY3Rpb24gZ2V0U2VjdGlvbkhlYWRpbmcoc2VjdGlvbl9oZWFkaW5nKSB7XG4gICAgbGV0IHNlY3Rpb25faGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBzZWN0aW9uX2hlYWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvLWhlYWRpbmdcIik7XG4gICAgc2VjdGlvbl9oZWFkLnRleHRDb250ZW50ID0gc2VjdGlvbl9oZWFkaW5nO1xuICAgIHJldHVybiBzZWN0aW9uX2hlYWQ7XG59XG5cbmZ1bmN0aW9uIGdldFByb2plY3RDb250YWluZXIoKSB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kby1pdGVtc1wiKTtcbiAgICByZXR1cm4gZGl2XG59XG5cbmZ1bmN0aW9uIGdldFByb2plY3RDYXJkKCkge1xuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG8taXRlbVwiKTtcbiAgICByZXR1cm4gZGl2XG59XG5cbmZ1bmN0aW9uIGdldFByb2plY3RIZWFkaW5nKCkge1xuICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgc3Bhbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG8taXRlbS1oZWFkaW5nXCIpO1xuICAgIHJldHVybiBzcGFuXG59XG5cbmZ1bmN0aW9uIGdldFByb2plY3RUaXRsZSh2YWx1ZSkge1xuICAgIGxldCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xuICAgIGhlYWRpbmcudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICByZXR1cm4gaGVhZGluZ1xufVxuXG5mdW5jdGlvbiBnZXRTVkcoc3ZnX3ZhbHVlLCBpZCkge1xuICAgIGxldCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCk7XG4gICAgc3ZnLmlubmVySFRNTCA9IHN2Z192YWx1ZTtcbiAgICByZXR1cm4gc3ZnXG59XG5cbmZ1bmN0aW9uIGdldEJ1dHRvbnMoKSB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYnV0dG9uc1wiKTtcbiAgICBsZXQgZGVsZXRlQnRuID0gZ2V0U1ZHKGRlbGV0ZVN2ZywgXCJkZWxldGUtYnRuXCIpO1xuICAgIGRpdi5hcHBlbmQoIGRlbGV0ZUJ0bik7XG4gICAgcmV0dXJuIGRpdlxufVxuXG5mdW5jdGlvbiBnZXRQcm9qZWN0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHAuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvLWl0ZW0tZGVzY3JpcHRpb25cIik7XG4gICAgcC50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuICAgIHJldHVybiBwXG59XG5cbmZ1bmN0aW9uIGdldFByb2plY3REYXRlKGRhdGUpIHtcbiAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHAuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvLWl0ZW0tZGF0ZVwiKTtcbiAgICBwLnRleHRDb250ZW50ID0gZGF0ZTtcbiAgICByZXR1cm4gcFxufVxuXG5jb25zdCBtYWtlcnMgPSB7XG4gICAgXCJnZXRMYWJlbFwiIDogZ2V0TGFiZWwsIFxuICAgIFwiZ2V0SW5wdXRcIiA6IGdldElucHV0LFxuICAgIFwiZ2V0VGV4dEFyZWFcIiA6IGdldFRleHRBcmVhLFxuICAgIFwiZ2V0U2VsZWN0aW9uXCIgOiBnZXRTZWxlY3Rpb24sXG4gICAgXCJnZXRTZWN0aW9uSGVhZGluZ1wiIDogZ2V0U2VjdGlvbkhlYWRpbmcsXG4gICAgXCJnZXRQcm9qZWN0Q29udGFpbmVyXCIgOiBnZXRQcm9qZWN0Q29udGFpbmVyLFxuICAgIFwiZ2V0UHJvamVjdENhcmRcIiA6IGdldFByb2plY3RDYXJkLFxuICAgIFwiZ2V0UHJvamVjdEhlYWRpbmdcIiA6IGdldFByb2plY3RIZWFkaW5nLFxuICAgIFwiZ2V0UHJvamVjdFRpdGxlXCIgOiBnZXRQcm9qZWN0VGl0bGUsXG4gICAgXCJnZXRCdXR0b25zXCIgOiBnZXRCdXR0b25zLFxuICAgIFwiZ2V0UHJvamVjdERlc2NyaXB0aW9uXCIgOiBnZXRQcm9qZWN0RGVzY3JpcHRpb24sXG4gICAgXCJnZXRQcm9qZWN0RGF0ZVwiIDogZ2V0UHJvamVjdERhdGUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VycyIsImltcG9ydCB7IGdldFByb2plY3QgfSBmcm9tIFwiLi4vQXBwTG9naWMvbG9jYWxTdG9yYWdlUXVlcnlcIjtcbmltcG9ydCBtYWtlcnMgZnJvbSBcIi4vZWxlbWVudE1ha2Vyc1wiO1xuXG5mdW5jdGlvbiB0b2RvRmllbGRHZW5lcmF0b3IocHJvamVjdD1cInRvZG9zXCIpIHtcbiAgICBjb25zdCB0b2RvX2Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG4gICAgdG9kb19mb3JtLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWZpZWxkXCIpO1xuXG4gICAgY29uc3QgdGl0bGVfbGFiZWwgPSBtYWtlcnMuZ2V0TGFiZWwoXCJ0aXRsZVwiLCBcIlRpdGxlXCIpO1xuICAgIGNvbnN0IHRpdGxlX2lucHV0ID0gbWFrZXJzLmdldElucHV0KFwidGl0bGVcIiwgXCJ0ZXh0XCIpO1xuXG4gICAgY29uc3QgZGVzY3JpcHRpb25fbGFiZWwgPSBtYWtlcnMuZ2V0TGFiZWwoXCJkZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uX2lucHV0ID0gbWFrZXJzLmdldFRleHRBcmVhKFwiZGVzY3JpcHRpb25cIiwgXCJkZXNjcmlwdGlvblwiLCBcIjNcIik7XG5cbiAgICBjb25zdCBkdWVfZGF0ZV9sYWJlbCA9IG1ha2Vycy5nZXRMYWJlbChcImR1ZS1kYXRlXCIsIFwiRHVlIERhdGVcIik7XG4gICAgY29uc3QgZHVlX2RhdGVfaW5wdXQgPSBtYWtlcnMuZ2V0SW5wdXQoXCJkdWUtZGF0ZVwiLCBcImRhdGVcIik7XG5cbiAgICBjb25zdCBwcm9qZWN0X2FmZmxpYXRpb25fbGFiZWwgPSBtYWtlcnMuZ2V0TGFiZWwoXCJwcm9qZWN0IGFmZmxpYXRpb25cIiwgXCJQcm9qZWN0IEFmZmxpYXRpb25cIik7XG4gICAgY29uc3QgYWN0aXZlVG9kb1Byb2plY3RzID0gZ2V0UHJvamVjdCgpLmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3QudGl0bGUudG9Mb3dlckNhc2UoKSAhPT0gXCJub3Rlc1wiKTtcbiAgICBjb25zdCBwcm9qZWN0X2FmZmxpYXRpb24gPSBtYWtlcnMuZ2V0U2VsZWN0aW9uKGFjdGl2ZVRvZG9Qcm9qZWN0cyk7XG4gICAgcHJvamVjdF9hZmZsaWF0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHByb2plY3QpO1xuXG4gICAgW3RpdGxlX2xhYmVsLCB0aXRsZV9pbnB1dCwgZGVzY3JpcHRpb25fbGFiZWwsIGRlc2NyaXB0aW9uX2lucHV0LCBkdWVfZGF0ZV9sYWJlbCwgZHVlX2RhdGVfaW5wdXQsIHByb2plY3RfYWZmbGlhdGlvbl9sYWJlbCwgcHJvamVjdF9hZmZsaWF0aW9uXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICB0b2RvX2Zvcm0uYXBwZW5kKGVsZW1lbnQpO1xuICAgIH0pXG5cbiAgICByZXR1cm4gdG9kb19mb3JtXG59XG5cbmZ1bmN0aW9uIHByb2plY3RGaWVsZEdlbmVyYXRvcigpIHtcbiAgICAgICAgICAgIFxuICAgIGNvbnN0IHByb2plY3RfZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcbiAgICBwcm9qZWN0X2Zvcm0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtZmllbGRcIik7XG5cbiAgICBjb25zdCB0aXRsZV9sYWJlbCA9IG1ha2Vycy5nZXRMYWJlbChcInRpdGxlXCIsIFwiVGl0bGVcIik7XG4gICAgY29uc3QgdGl0bGVfaW5wdXQgPSBtYWtlcnMuZ2V0SW5wdXQoXCJ0aXRsZVwiLCBcInRleHRcIik7XG5cblxuICAgIFt0aXRsZV9sYWJlbCwgdGl0bGVfaW5wdXRdLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIHByb2plY3RfZm9ybS5hcHBlbmQoZWxlbWVudCk7XG4gICAgfSlcblxuICAgIHJldHVybiBwcm9qZWN0X2Zvcm1cbn1cblxuZnVuY3Rpb24gbm90ZUZpZWxkR2VuZXJhdG9yKHByb2plY3Q9XCJub3Rlc1wiKSB7XG4gICAgY29uc3Qgbm90ZV9mb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xuICAgIG5vdGVfZm9ybS5jbGFzc0xpc3QuYWRkKFwibm90ZXMtZmllbGRcIik7XG5cbiAgICBjb25zdCB0aXRsZV9sYWJlbCA9IG1ha2Vycy5nZXRMYWJlbChcInRpdGxlXCIsIFwiVGl0bGVcIik7XG4gICAgY29uc3QgdGl0bGVfaW5wdXQgPSBtYWtlcnMuZ2V0SW5wdXQoXCJ0aXRsZVwiLCBcInRleHRcIik7XG5cbiAgICBjb25zdCBkZXNjcmlwdGlvbl9sYWJlbCA9IG1ha2Vycy5nZXRMYWJlbChcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIik7XG4gICAgY29uc3QgZGVzY3JpcHRpb25faW5wdXQgPSBtYWtlcnMuZ2V0VGV4dEFyZWEoXCJkZXNjcmlwdGlvblwiLCBcImRlc2NyaXB0aW9uXCIsIFwiM1wiKTtcblxuICAgIGNvbnN0IHByb2plY3RfYWZmbGlhdGlvbiA9IG1ha2Vycy5nZXRJbnB1dChcImFmZmxpYXRpb25cIiwgXCJ0ZXh0XCIpO1xuICAgIHByb2plY3RfYWZmbGlhdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBwcm9qZWN0KTtcbiAgICBwcm9qZWN0X2FmZmxpYXRpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgW3RpdGxlX2xhYmVsLCB0aXRsZV9pbnB1dCwgZGVzY3JpcHRpb25fbGFiZWwsIGRlc2NyaXB0aW9uX2lucHV0LCBwcm9qZWN0X2FmZmxpYXRpb25dLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIG5vdGVfZm9ybS5hcHBlbmQoZWxlbWVudCk7XG4gICAgfSlcblxuICAgIHJldHVybiBub3RlX2Zvcm1cbn1cblxuZnVuY3Rpb24gc3VibWl0QnRuKGFjdGl2ZUZpZWxkKSB7XG4gICAgY29uc3QgaW5wdXQgPSBtYWtlcnMuZ2V0SW5wdXQoXCJzdWJtaXQtYnRuXCIsIFwic3VibWl0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGFjdGl2ZUZpZWxkKTtcblxuICAgIHJldHVybiBpbnB1dFxufVxuXG5jb25zdCBmb3JtRmllbGRHZW5lcmF0b3IgPSB7XG4gICAgXCJ0b2RvXCIgOiB0b2RvRmllbGRHZW5lcmF0b3IsXG4gICAgXCJwcm9qZWN0XCIgOiBwcm9qZWN0RmllbGRHZW5lcmF0b3IsXG4gICAgXCJub3RlXCIgOiBub3RlRmllbGRHZW5lcmF0b3IsXG4gICAgXCJzdWJtaXRcIiA6IHN1Ym1pdEJ0blxufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtRmllbGRHZW5lcmF0b3I7IiwiLy8gY29uc3Qgbm90ZVN2ZyA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHRpdGxlPm5vdGUtb3V0bGluZTwvdGl0bGU+PHBhdGggZD1cIk0xNCwxMEgxOS41TDE0LDQuNVYxME01LDNIMTVMMjEsOVYxOUEyLDIgMCAwLDEgMTksMjFINUMzLjg5LDIxIDMsMjAuMSAzLDE5VjVDMywzLjg5IDMuODksMyA1LDNNNSw1VjE5SDE5VjEySDEyVjVINVpcIiAvPjwvc3ZnPidcblxuLy8gY29uc3QgcHJvamVjdFN2ZyA9ICcgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjx0aXRsZT5jbGlwYm9hcmQtZWRpdC1vdXRsaW5lPC90aXRsZT48cGF0aCBkPVwiTTIxLjA0IDEyLjEzQzIxLjE4IDEyLjEzIDIxLjMxIDEyLjE5IDIxLjQyIDEyLjNMMjIuNyAxMy41OEMyMi45MiAxMy43OSAyMi45MiAxNC4xNCAyMi43IDE0LjM1TDIxLjcgMTUuMzVMMTkuNjUgMTMuM0wyMC42NSAxMi4zQzIwLjc2IDEyLjE5IDIwLjkgMTIuMTMgMjEuMDQgMTIuMTNNMTkuMDcgMTMuODhMMjEuMTIgMTUuOTNMMTUuMDYgMjJIMTNWMTkuOTRMMTkuMDcgMTMuODhNMTEgMTlMOSAyMUg1QzMuOSAyMSAzIDIwLjEgMyAxOVY1QzMgMy45IDMuOSAzIDUgM0g5LjE4QzkuNiAxLjg0IDEwLjcgMSAxMiAxQzEzLjMgMSAxNC40IDEuODQgMTQuODIgM0gxOUMyMC4xIDMgMjEgMy45IDIxIDVWOUwxOSAxMVY1SDE3VjdIN1Y1SDVWMTlIMTFNMTIgM0MxMS40NSAzIDExIDMuNDUgMTEgNEMxMSA0LjU1IDExLjQ1IDUgMTIgNUMxMi41NSA1IDEzIDQuNTUgMTMgNEMxMyAzLjQ1IDEyLjU1IDMgMTIgM1pcIiAvPjwvc3ZnPlxuXG4vLyBjb25zdCBub3JtYWwgdG9kbyA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHRpdGxlPmNoZWNrYm94LW1hcmtlZC1jaXJjbGUtcGx1cy1vdXRsaW5lPC90aXRsZT48cGF0aCBkPVwiTTE0LjMgMjEuN0MxMy42IDIxLjkgMTIuOCAyMiAxMiAyMkM2LjUgMjIgMiAxNy41IDIgMTJTNi41IDIgMTIgMkMxMy4zIDIgMTQuNiAyLjMgMTUuOCAyLjdMMTQuMiA0LjNDMTMuNSA0LjEgMTIuOCA0IDEyIDRDNy42IDQgNCA3LjYgNCAxMlM3LjYgMjAgMTIgMjBDMTIuNCAyMCAxMi45IDIwIDEzLjMgMTkuOUMxMy41IDIwLjYgMTMuOSAyMS4yIDE0LjMgMjEuN003LjkgMTAuMUw2LjUgMTEuNUwxMSAxNkwyMSA2TDE5LjYgNC42TDExIDEzLjJMNy45IDEwLjFNMTggMTRWMTdIMTVWMTlIMThWMjJIMjBWMTlIMjNWMTdIMjBWMTRIMThaXCIgLz48L3N2Zz5cblxuZXhwb3J0IGNvbnN0IGVkaXRTdmcgPSAnIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48dGl0bGU+cGVuY2lsPC90aXRsZT48cGF0aCBkPVwiTTIwLjcxLDcuMDRDMjEuMSw2LjY1IDIxLjEsNiAyMC43MSw1LjYzTDE4LjM3LDMuMjlDMTgsMi45IDE3LjM1LDIuOSAxNi45NiwzLjI5TDE1LjEyLDUuMTJMMTguODcsOC44N00zLDE3LjI1VjIxSDYuNzVMMTcuODEsOS45M0wxNC4wNiw2LjE4TDMsMTcuMjVaXCIgLz48L3N2Zz4nXG5cbmV4cG9ydCBjb25zdCBkZWxldGVTdmcgPSAnIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48dGl0bGU+ZGVsZXRlLW91dGxpbmU8L3RpdGxlPjxwYXRoIGQ9XCJNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5TTgsOUgxNlYxOUg4VjlNMTUuNSw0TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5VjRIMTUuNVpcIiAvPjwvc3ZnPiciLCJpbXBvcnQgeyBnZXRQcm9qZWN0IH0gZnJvbSBcIi4uL0FwcExvZ2ljL2xvY2FsU3RvcmFnZVF1ZXJ5XCI7XG5pbXBvcnQgZG9tR2VuZXJhdG9yIGZyb20gXCIuL2RvbWdlbmVyYXRvclwiO1xuaW1wb3J0IHsgZGVsZXRlSXRlbSB9IGZyb20gXCIuLi9BcHBMb2dpYy91cGRhdGVmaWxlc1wiO1xuXG5jb25zdCBwcm9qZWN0c19wYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHNcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb3VudCgpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG4gICAgbGV0IHRvZG9zID0gcHJvamVjdHMuZmlsdGVyKHByb2plY3QgPT4gcHJvamVjdC50aXRsZS50b0xvd2VyQ2FzZSgpID09PSBcInRvZG9zXCIpWzBdO1xuICAgIGxldCBub3RlcyA9IHByb2plY3RzLmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3QudGl0bGUudG9Mb3dlckNhc2UoKSA9PT0gXCJub3Rlc1wiKVswXTtcbiAgICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9zIHNwYW46bGFzdC1vZi10eXBlXCIpLnRleHRDb250ZW50ID0gdG9kb3MuZGF0YS5sZW5ndGg7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ub3RlcyBzcGFuOmxhc3Qtb2YtdHlwZVwiKS50ZXh0Q29udGVudCA9IG5vdGVzLmRhdGEubGVuZ3RoO1xufVxuXG51cGRhdGVDb3VudCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2F0ZWdvcmllcyhjYXRlZ29yaWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXRlZ29yeVwiKSkge1xuICAgIGNhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICAgIGNhdGVnb3J5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgYy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjYXRlZ29yeS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB1cGRhdGVQcm9qZWN0U2VjdGlvbihjYXRlZ29yeS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVByb2plY3RzTGlzdCgpIHtcblxuICAgIGxldCBwcm9qZWN0cyA9IGdldFByb2plY3QoKS5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlLnRvTG93ZXJDYXNlKCkgIT09IFwidG9kb3NcIiAmJiBwcm9qZWN0LnRpdGxlLnRvTG93ZXJDYXNlKCkgIT09IFwibm90ZXNcIiApO1xuICAgIHByb2plY3RzX3BhbmVsLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHNwYW4udGV4dENvbnRlbnQgPSBcIlByb2plY3RzXCI7XG4gICAgcHJvamVjdHNfcGFuZWwuYXBwZW5kKHNwYW4pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHNbaV07XG4gICAgICAgIFxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImNhdGVnb3J5XCIpO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgcHJvamVjdC50aXRsZSk7XG5cbiAgICAgICAgbGV0IHNwYW5fbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBzcGFuX25hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xuXG4gICAgICAgIGxldCBzcGFuX2NvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHNwYW5fY291bnQudGV4dENvbnRlbnQgPSBwcm9qZWN0LmRhdGEubGVuZ3RoO1xuICAgICAgICBcbiAgICAgICAgZGl2LmFwcGVuZChzcGFuX25hbWUpO1xuICAgICAgICBkaXYuYXBwZW5kKHNwYW5fY291bnQpO1xuXG4gICAgICAgIHByb2plY3RzX3BhbmVsLmFwcGVuZChkaXYpXG4gICAgfVxuXG4gICAgdG9nZ2xlQ2F0ZWdvcmllcygpO1xufVxuXG51cGRhdGVQcm9qZWN0c0xpc3QoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVByb2plY3RTZWN0aW9uKHNlY3Rpb25faGVhZGluZykge1xuXG4gICAgbGV0IHByb2plY3RfbGlzdCA9IGdldFByb2plY3QoKS5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlLnRvTG93ZXJDYXNlKCkgPT09IHNlY3Rpb25faGVhZGluZy50b0xvd2VyQ2FzZSgpKVswXS5kYXRhO1xuXG4gICAgc3dpdGNoIChzZWN0aW9uX2hlYWRpbmcudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBjYXNlIFwidG9kb3NcIjpcbiAgICAgICAgICAgIGRvbUdlbmVyYXRvci50b2Rvcyhwcm9qZWN0X2xpc3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBjYXNlIFwibm90ZXNcIjpcbiAgICAgICAgICAgIGRvbUdlbmVyYXRvci5ub3Rlcyhwcm9qZWN0X2xpc3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBkb21HZW5lcmF0b3IudG9kb3MocHJvamVjdF9saXN0LCBzZWN0aW9uX2hlYWRpbmcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZ2V0RGVsZXRlQnRucygpO1xufVxuXG5mdW5jdGlvbiBnZXREZWxldGVCdG5zKCkge1xuICAgIGxldCBkZWxldGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNkZWxldGUtYnRuXCIpO1xuICAgIFxuICAgIGRlbGV0ZUJ0bnMuZm9yRWFjaChkZWxldGVCdG4gPT4ge1xuICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZUl0ZW0pXG4gICAgfSlcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBmb3JtRmllbGRHZW5lcmF0b3IgZnJvbSBcIi4vZm9ybWdlbmVyYXRvclwiO1xuaW1wb3J0IHsgTm90ZXMsIFByb2plY3QsIFRvZG99IGZyb20gXCIuLi9BcHBMb2dpYy9kYXRhbW9kZWxzXCI7XG5pbXBvcnQgeyB1cGRhdGVGaWxlcyB9IGZyb20gXCIuLi9BcHBMb2dpYy91cGRhdGVmaWxlc1wiO1xuaW1wb3J0IHsgZ2V0UHJvamVjdCwgc2F2ZVByb2plY3QgfSBmcm9tIFwiLi4vQXBwTG9naWMvbG9jYWxTdG9yYWdlUXVlcnlcIjtcbmltcG9ydCB7IHVwZGF0ZUNvdW50LCB1cGRhdGVQcm9qZWN0c0xpc3QsIHVwZGF0ZVByb2plY3RTZWN0aW9uLCB0b2dnbGVDYXRlZ29yaWVzIH0gZnJvbSBcIi4vdWltb2RpZmllclwiO1xuXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIiksXG4gICAgICBvcGVuX2Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyIHN2Z1wiKSxcbiAgICAgIHBvcF9mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3AtdXBcIiksXG4gICAgICBibGFua2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibGFua2V0XCIpLFxuICAgICAgb3Blbl90b2RvX2Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9wZW4tdG9kb1wiKSxcbiAgICAgIG9wZW5fcHJvamVjdF9mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vcGVuLXByb2plY3RcIiksXG4gICAgICBvcGVuX25vdGVfZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3Blbi1ub3RlXCIpLFxuICAgICAgY2xvc2VfZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wLXVwIHN2Z1wiKSxcbiAgICAgIHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpO1xuXG5sZXQgY2F0ZWdvcmllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2F0ZWdvcnlcIik7XG5cbm9wZW5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICB0b2dnbGVGb3JtRmllbGQodHJ1ZSk7XG4gICAgXG4gICAgYmxhbmtldC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIHBvcF9mb3JtLmNsYXNzTGlzdC5hZGQoXCJzdGF0ZVwiKTtcblxufSk7XG5cbnRvZ2dsZUNhdGVnb3JpZXMoY2F0ZWdvcmllcyk7XG50b2dnbGVDYXRlZ29yaWVzKHByb2plY3RzKTtcblxub3Blbl90b2RvX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldikgPT4gdG9nZ2xlRm9ybUZpZWxkKGZhbHNlLCBldikpO1xub3Blbl9ub3RlX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldikgPT4gdG9nZ2xlRm9ybUZpZWxkKGZhbHNlLCBldikpO1xub3Blbl9wcm9qZWN0X2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldikgPT4gdG9nZ2xlRm9ybUZpZWxkKGZhbHNlLCBldikpO1xuXG5jbG9zZV9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZUZvcm0pXG5cbmZ1bmN0aW9uIHRvZ2dsZUZvcm1GaWVsZChtYW51YWwsIGU9XCJcIikge1xuXG4gICAgZm9ybS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgLy8gcmVtb3ZlIHRhYiBpbmRpY2F0b3JcbiAgICBvcGVuX3RvZG9fZm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLWZvcm1cIik7XG4gICAgb3Blbl9ub3RlX2Zvcm0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1mb3JtXCIpO1xuICAgIG9wZW5fcHJvamVjdF9mb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtZm9ybVwiKTtcbiAgICBcbiAgICAvLyBzZXQgdG9kbyBmaWVsZCBhcyBkZWZhdWx0IHdoZW4gdGhlIGZvcm0gaXMgb3BlbmVkXG4gICAgaWYgKG1hbnVhbCkge1xuICAgICAgICBmb3JtLmFwcGVuZChmb3JtRmllbGRHZW5lcmF0b3IudG9kbygpKTtcbiAgICAgICAgZm9ybS5hcHBlbmQoZm9ybUZpZWxkR2VuZXJhdG9yLnN1Ym1pdChcIk1ha2UgVG9kb1wiKSk7XG4gICAgICAgIG9wZW5fdG9kb19mb3JtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtZm9ybVwiKTtcblxuICAgICAgICByZXR1cm5cbiAgICB9IFxuICAgIFxuICAgIC8vIGRpc3BsYXkgdGhlIGZvcm0gZmllbGQgY29ycmVzcG9uZGluZyB3aXRoIHRoZSBjbGlja2VkIGZvcm10eXBlXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1mb3JtXCIpO1xuICAgIHN3aXRjaCAoZS50YXJnZXQpIHtcbiAgICAgICAgY2FzZSBvcGVuX3RvZG9fZm9ybTpcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKGZvcm1GaWVsZEdlbmVyYXRvci50b2RvKCkpO1xuICAgICAgICAgICAgZm9ybS5hcHBlbmQoZm9ybUZpZWxkR2VuZXJhdG9yLnN1Ym1pdChcIk1ha2UgVG9kb1wiKSk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICBcbiAgICAgICAgY2FzZSBvcGVuX25vdGVfZm9ybTpcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKGZvcm1GaWVsZEdlbmVyYXRvci5ub3RlKCkpO1xuICAgICAgICAgICAgZm9ybS5hcHBlbmQoZm9ybUZpZWxkR2VuZXJhdG9yLnN1Ym1pdChcIkNyZWF0ZSBOb3RlXCIpKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZm9ybS5hcHBlbmQoZm9ybUZpZWxkR2VuZXJhdG9yLnByb2plY3QoKSk7XG4gICAgICAgICAgICBmb3JtLmFwcGVuZChmb3JtRmllbGRHZW5lcmF0b3Iuc3VibWl0KFwiQ3JlYXRlIFByb2plY3RcIikpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICB9XG59XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGxldCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybT5maWVsZHNldFwiKTtcblxuICAgIGxldCBmaWVsZCA9IGFjdGl2ZS5jbGFzc05hbWU7XG5cbiAgICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgICAgIGNhc2UgXCJ0b2RvLWZpZWxkXCI6XG4gICAgICAgICAgICBsZXQgdG9kb190aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIikudmFsdWUsXG4gICAgICAgICAgICAgICAgdG9kb19kZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWUsXG4gICAgICAgICAgICAgICAgZHVlX2RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2R1ZS1kYXRlXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAgIHRvZG9fcHJvamVjdF9hZmZsaWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZmZsaWF0aW9uXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAgIHRvZG8gPSBuZXcgVG9kbyh0b2RvX3RpdGxlLCB0b2RvX2Rlc2NyaXB0aW9uLCBkdWVfZGF0ZSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZUZpbGVzKHRvZG8sIHRvZG9fcHJvamVjdF9hZmZsaWF0aW9uKTtcbiAgICAgICAgICAgIHVwZGF0ZVByb2plY3RTZWN0aW9uKHRvZG9fcHJvamVjdF9hZmZsaWF0aW9uLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwibm90ZXMtZmllbGRcIjpcbiAgICAgICAgICAgIGxldCBub3RlX3RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBub3RlX2Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBub3RlX3Byb2plY3RfYWZmbGlhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWZmbGlhdGlvblwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBub3RlID0gbmV3IE5vdGVzKG5vdGVfdGl0bGUsIG5vdGVfZGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlRmlsZXMobm90ZSwgbm90ZV9wcm9qZWN0X2FmZmxpYXRpb24pO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVByb2plY3RTZWN0aW9uKFwibm90ZXNcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbGV0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuXG4gICAgICAgICAgICBsZXQgcHJvamVjdF90aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIikudmFsdWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBleGlzdGluZ19wcm9qZWN0ID0gcHJvamVjdHMuZmlsdGVyKHByb2plY3QgPT4gcHJvamVjdC50aXRsZS50b0xvd2VyQ2FzZSgpID09PSBwcm9qZWN0X3RpdGxlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihleGlzdGluZ19wcm9qZWN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCBwcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdF90aXRsZSwgW10pO1xuXG4gICAgICAgICAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTsgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2F2ZVByb2plY3QocHJvamVjdHMpO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjbG9zZUZvcm0oKTtcbiAgICB0b2dnbGVDYXRlZ29yaWVzKClcbn0pXG5cbmZ1bmN0aW9uIGNsb3NlRm9ybSgpIHtcbiAgICBibGFua2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBmb3JtLmlubmVySFRNTCA9IFwiXCI7XG4gICAgcG9wX2Zvcm0uY2xhc3NMaXN0LnJlbW92ZShcInN0YXRlXCIpO1xuICAgIHVwZGF0ZUNvdW50KCk7XG4gICAgdXBkYXRlUHJvamVjdHNMaXN0KCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2Rvc1wiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIHVwZGF0ZVByb2plY3RzTGlzdCgpO1xuICAgIHVwZGF0ZVByb2plY3RTZWN0aW9uKFwidG9kb3NcIik7XG4gICAgdG9nZ2xlQ2F0ZWdvcmllcygpO1xufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==