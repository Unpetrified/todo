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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/DomManipulation/uimodifier.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Yy9kYXRhbW9kZWxzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvQXBwTG9naWMvbG9jYWxTdG9yYWdlUXVlcnkuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9BcHBMb2dpYy91cGRhdGVmaWxlcy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RvbU1hbmlwdWxhdGlvbi9kb21nZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9Eb21NYW5pcHVsYXRpb24vZWxlbWVudE1ha2Vycy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RvbU1hbmlwdWxhdGlvbi90b2Rvc3Zncy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RvbU1hbmlwdWxhdGlvbi91aW1vZGlmaWVyLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRvZG8ge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlX2RhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZV9kYXRlID0gZHVlX2RhdGU7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG5cbn1cblxuVG9kby5wcm90b3R5cGUuZ2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7XCJ0aXRsZVwiIDogdGhpcy50aXRsZSwgXCJkZXNjcmlwdGlvblwiIDogdGhpcy5kZXNjcmlwdGlvbiwgXCJkdWUgZGF0ZVwiIDogdGhpcy5kdWVfZGF0ZSwgXCJwcmlvcml0eVwiIDogdGhpcy5wcmlvcml0eX1cbiAgICByZXR1cm4gcHJvcGVydGllc1xufVxuXG5leHBvcnQgY2xhc3MgTm90ZXMge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB9XG59XG5cbk5vdGVzLnByb3RvdHlwZS5nZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHtcInRpdGxlXCIgOiB0aGlzLnRpdGxlLCBcImRlc2NyaXB0aW9uXCIgOiB0aGlzLmRlc2NyaXB0aW9ufVxuICAgIHJldHVybiBwcm9wZXJ0aWVzXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGF0YSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxufVxuXG5Qcm9qZWN0LnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oKSB7ICAgXG4gICAgcmV0dXJuIHRoaXMuZGF0YVxufVxuXG5Qcm9qZWN0LnByb3RvdHlwZS51cGRhdGVEYXRhID0gZnVuY3Rpb24oaXRlbSkgeyAgIFxuICAgIHRoaXMuZGF0YS5wdXNoKGl0ZW0pO1xufVxuXG5Qcm9qZWN0LnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24oaXRlbSkgeyAgIFxuICAgIHRoaXMuZGF0YS5zcGxpY2UodGhpcy5kYXRhLmluZGV4b2YoaXRlbSksIDEpO1xufSIsImltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi9kYXRhbW9kZWxzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0KCkge1xuICAgIGxldCBwcm9qZWN0c19mcm9tX3N0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpO1xuXG4gICAgLy8gY29udmVydCB0aGUgYXJyYXkgaXRlbXMgYmFjayB0byBhIHByb2plY3Qgb2JqZWN0XG4gICAgbGV0IHJlc3RvcmVkX3Byb2plY3RzID0gW107XG4gICAgXG4gICAgaWYgKHByb2plY3RzX2Zyb21fc3RvcmFnZSA9PT0gbnVsbCkge1xuICAgICAgICByZXN0b3JlZF9wcm9qZWN0cyA9IFt7XCJ0aXRsZVwiOlwiVG9kb3NcIixcImRhdGFcIjpbXX0se1widGl0bGVcIjpcIk5vdGVzXCIsXCJkYXRhXCI6W119XTtcbiAgICAgICAgcmV0dXJuIHJlc3RvcmVkX3Byb2plY3RzXG4gICAgfTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwcm9qZWN0c19mcm9tX3N0b3JhZ2UubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBwcm9qZWN0c19mcm9tX3N0b3JhZ2VbaW5kZXhdO1xuICAgICAgICBsZXQgcmVzdG9yZWRfcHJvamVjdF9vYmplY3QgPSBuZXcgUHJvamVjdChlbGVtZW50LnRpdGxlLCBlbGVtZW50LmRhdGEpO1xuICAgICAgICByZXN0b3JlZF9wcm9qZWN0cy5wdXNoKHJlc3RvcmVkX3Byb2plY3Rfb2JqZWN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdG9yZWRfcHJvamVjdHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9qZWN0KHByb2plY3RzKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xufSIsImltcG9ydCB7IHVwZGF0ZUNvdW50LCB1cGRhdGVQcm9qZWN0U2VjdGlvbiwgdXBkYXRlUHJvamVjdHNMaXN0IH0gZnJvbSBcIi4uL0RvbU1hbmlwdWxhdGlvbi91aW1vZGlmaWVyXCI7XG5pbXBvcnQgeyBnZXRQcm9qZWN0LCBzYXZlUHJvamVjdCB9IGZyb20gXCIuL2xvY2FsU3RvcmFnZVF1ZXJ5XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGaWxlcyhkYXRhLCBwcm9qZWN0X2Rlc3RpbmF0aW9uKSB7XG4gICAgXG4gICAgbGV0IHJlc3RvcmVkX3Byb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN0b3JlZF9wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHJlc3RvcmVkX3Byb2plY3RzW2ldO1xuICAgICAgICBcbiAgICAgICAgaWYgKHByb2plY3RfZGVzdGluYXRpb24gPT09IHByb2plY3QudGl0bGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgcHJvamVjdC5kYXRhLnB1c2goZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSAgICBcblxuICAgIHNhdmVQcm9qZWN0KHJlc3RvcmVkX3Byb2plY3RzKTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlSXRlbShlKSB7XG4gICAgXG4gICAgbGV0IGFsbFByb2plY3RzID0gZ2V0UHJvamVjdCgpLFxuICAgICAgICBwcm9qZWN0X3RpdGxlID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50LCAvLyBnZXQgcHJvamVjdCBjb250YWluaW5nIGl0ZW1cbiAgICAgICAgaXRlbV90aXRsZSA9IGUuY3VycmVudFRhcmdldC5jbG9zZXN0KFwiLnRvZG8taXRlbS1oZWFkaW5nXCIpLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQsXG4gICAgICAgIHByb2plY3RfaW5fc3RvcmFnZSA9IGFsbFByb2plY3RzLmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3RfdGl0bGUpWzBdLFxuICAgICAgICBpdGVtX2luX3N0b3JhZ2UgPSBwcm9qZWN0X2luX3N0b3JhZ2UuZGF0YS5maWx0ZXIoaXRlbSA9PiBpdGVtLnRpdGxlID09PSBpdGVtX3RpdGxlKVswXSxcbiAgICAgICAgaXRlbV9pbmRleCA9IHByb2plY3RfaW5fc3RvcmFnZS5kYXRhLmluZGV4T2YoaXRlbV9pbl9zdG9yYWdlKTtcblxuICAgIHByb2plY3RfaW5fc3RvcmFnZS5kYXRhLnNwbGljZShpdGVtX2luZGV4LCAxKTtcbiAgICBcbiAgICBsZXQgaXNQcm9qZWN0RW1wdHkgPSBwcm9qZWN0X2luX3N0b3JhZ2UuZGF0YS5sZW5ndGggPT09IDAsXG4gICAgICAgIGlzQ3VzdG9tUHJvamVjdCA9IHByb2plY3RfdGl0bGUudG9Mb3dlckNhc2UoKSAhPT0gXCJ0b2Rvc1wiICYmIHByb2plY3RfdGl0bGUudG9Mb3dlckNhc2UoKSAhPT0gXCJub3Rlc1wiLFxuICAgICAgICBzZWN0aW9uX2hlYWRpbmcgPSBwcm9qZWN0X3RpdGxlO1xuXG4gICAgaWYgKGlzUHJvamVjdEVtcHR5ICYmIGlzQ3VzdG9tUHJvamVjdCkge1xuICAgICAgICBhbGxQcm9qZWN0cy5zcGxpY2UoYWxsUHJvamVjdHMuaW5kZXhPZihwcm9qZWN0X2luX3N0b3JhZ2UpLCAxKTtcbiAgICAgICAgc2VjdGlvbl9oZWFkaW5nID0gXCJ0b2Rvc1wiO1xuICAgIH1cbiAgICBzYXZlUHJvamVjdChhbGxQcm9qZWN0cyk7XG4gICAgdXBkYXRlUHJvamVjdFNlY3Rpb24oc2VjdGlvbl9oZWFkaW5nKTtcbiAgICB1cGRhdGVDb3VudCgpO1xuICAgIHVwZGF0ZVByb2plY3RzTGlzdCgpO1xufSIsImltcG9ydCBtYWtlcnMgZnJvbSBcIi4vZWxlbWVudE1ha2Vyc1wiO1xuXG5jb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0XCIpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVRvZG9zKHRvZG9MaXN0LCBzZWN0aW9uX2hlYWQgPSBcIlRvZG9zXCIpIHtcblxuICAgIGxldCBzZWN0aW9uSGVhZGluZyA9IG1ha2Vycy5nZXRTZWN0aW9uSGVhZGluZyhzZWN0aW9uX2hlYWQpLFxuICAgICAgICB0b2RvcyA9IG1ha2Vycy5nZXRQcm9qZWN0Q29udGFpbmVyKCk7XG4gICAgXG4gICAgdG9kb0xpc3QuZm9yRWFjaCh0b2RvID0+IHtcbiAgICAgICAgbGV0IHRvZG9JdGVtID0gbWFrZXJzLmdldFByb2plY3RDYXJkKCksXG4gICAgICAgICAgICB0b2RvSGVhZGluZ0NvbnRhaW5lciA9IG1ha2Vycy5nZXRQcm9qZWN0SGVhZGluZygpLFxuICAgICAgICAgICAgdG9kb0hlYWRpbmcgPSBtYWtlcnMuZ2V0UHJvamVjdFRpdGxlKHRvZG9bXCJ0aXRsZVwiXSksXG4gICAgICAgICAgICBhY3Rpb25CdG5zID0gbWFrZXJzLmdldEJ1dHRvbnMoKSxcbiAgICAgICAgICAgIHRvZG9fZGVzY3JpcHRpb24gPSBtYWtlcnMuZ2V0UHJvamVjdERlc2NyaXB0aW9uKHRvZG9bXCJkZXNjcmlwdGlvblwiXSksXG4gICAgICAgICAgICB0b2RvX2RhdGUgPSBtYWtlcnMuZ2V0UHJvamVjdERhdGUodG9kb1tcImR1ZV9kYXRlXCJdKTtcblxuICAgICAgICB0b2RvSGVhZGluZ0NvbnRhaW5lci5hcHBlbmQodG9kb0hlYWRpbmcsIGFjdGlvbkJ0bnMpO1xuICAgICAgICB0b2RvSXRlbS5hcHBlbmQodG9kb0hlYWRpbmdDb250YWluZXIsIHRvZG9fZGVzY3JpcHRpb24sIHRvZG9fZGF0ZSk7XG4gICAgICAgIHRvZG9zLmFwcGVuZCh0b2RvSXRlbSk7XG4gICAgfSk7XG5cbiAgICBzZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2VjdGlvbi5hcHBlbmQoc2VjdGlvbkhlYWRpbmcsIHRvZG9zKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVOb3Rlcyhub3RlTGlzdCkge1xuXG4gICAgbGV0IHNlY3Rpb25IZWFkaW5nID0gbWFrZXJzLmdldFNlY3Rpb25IZWFkaW5nKFwiTm90ZXNcIik7XG4gICAgbGV0IG5vdGVzID0gbWFrZXJzLmdldFByb2plY3RDb250YWluZXIoKTtcblxuICAgIG5vdGVMaXN0LmZvckVhY2gobm90ZSA9PiB7XG4gICAgICAgIGxldCBub3RlSXRlbSA9IG1ha2Vycy5nZXRQcm9qZWN0Q2FyZCgpLFxuICAgICAgICAgICAgbm90ZUhlYWRpbmdDb250YWluZXIgPSBtYWtlcnMuZ2V0UHJvamVjdEhlYWRpbmcoKSxcbiAgICAgICAgICAgIG5vdGVIZWFkaW5nID0gbWFrZXJzLmdldFByb2plY3RUaXRsZShub3RlW1widGl0bGVcIl0pLFxuICAgICAgICAgICAgYWN0aW9uQnRucyA9IG1ha2Vycy5nZXRCdXR0b25zKCksXG4gICAgICAgICAgICBub3RlX2Rlc2NyaXB0aW9uID0gbWFrZXJzLmdldFByb2plY3REZXNjcmlwdGlvbihub3RlW1wiZGVzY3JpcHRpb25cIl0pO1xuXG4gICAgICAgIG5vdGVIZWFkaW5nQ29udGFpbmVyLmFwcGVuZChub3RlSGVhZGluZywgYWN0aW9uQnRucyk7XG4gICAgICAgIG5vdGVJdGVtLmFwcGVuZChub3RlSGVhZGluZ0NvbnRhaW5lciwgbm90ZV9kZXNjcmlwdGlvbik7XG4gICAgICAgIG5vdGVzLmFwcGVuZChub3RlSXRlbSk7XG4gICAgfSk7XG5cbiAgICBzZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2VjdGlvbi5hcHBlbmQoc2VjdGlvbkhlYWRpbmcsIG5vdGVzKTtcbn1cblxuY29uc3QgZG9tR2VuZXJhdG9yID0ge1xuICAgIFwidG9kb3NcIiA6IGdlbmVyYXRlVG9kb3MsXG4gICAgXCJub3Rlc1wiIDogZ2VuZXJhdGVOb3Rlcyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgZG9tR2VuZXJhdG9yOyIsImltcG9ydCB7IGRlbGV0ZVN2ZyB9IGZyb20gXCIuL3RvZG9zdmdzXCI7XG5cbmZ1bmN0aW9uIGdldExhYmVsKGlkPVwiXCIsIHRleHRfY29udGVudD1cIlwiKSB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGlkKTtcbiAgICBcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9IHRleHRfY29udGVudDtcblxuICAgIHJldHVybiBsYWJlbFxufVxuXG5mdW5jdGlvbiBnZXRJbnB1dChpZCwgdHlwZSwgbmFtZT1cIlwiLCB2YWx1ZT1cIlwiKSB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgdHlwZSk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgdHJ1ZSlcblxuICAgIHJldHVybiBpbnB1dFxufVxuXG5mdW5jdGlvbiBnZXRUZXh0QXJlYShpZCwgbmFtZSwgcm93cykge1xuICAgIGNvbnN0IHRleHRfYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICB0ZXh0X2FyZWEuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xuICAgIHRleHRfYXJlYS5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIG5hbWUpO1xuICAgIHRleHRfYXJlYS5zZXRBdHRyaWJ1dGUoXCJyb3dzXCIsIHJvd3MpO1xuICAgIHRleHRfYXJlYS5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCB0cnVlKVxuXG4gICAgcmV0dXJuIHRleHRfYXJlYVxufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb24oY2hvaWNlcykge1xuICAgIGxldCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFmZmxpYXRpb25cIik7XG4gICAgc2VsZWN0LnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIHRydWUpO1xuXG4gICAgY2hvaWNlcy5mb3JFYWNoKGNob2ljZSA9PiB7XG4gICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgY2hvaWNlLnRpdGxlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBjaG9pY2UudGl0bGU7XG4gICAgICAgIHNlbGVjdC5hcHBlbmQob3B0aW9uKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxlY3Rcbn1cblxuXG5mdW5jdGlvbiBnZXRTZWN0aW9uSGVhZGluZyhzZWN0aW9uX2hlYWRpbmcpIHtcbiAgICBsZXQgc2VjdGlvbl9oZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNlY3Rpb25faGVhZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG8taGVhZGluZ1wiKTtcbiAgICBzZWN0aW9uX2hlYWQudGV4dENvbnRlbnQgPSBzZWN0aW9uX2hlYWRpbmc7XG4gICAgcmV0dXJuIHNlY3Rpb25faGVhZDtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvamVjdENvbnRhaW5lcigpIHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvLWl0ZW1zXCIpO1xuICAgIHJldHVybiBkaXZcbn1cblxuZnVuY3Rpb24gZ2V0UHJvamVjdENhcmQoKSB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kby1pdGVtXCIpO1xuICAgIHJldHVybiBkaXZcbn1cblxuZnVuY3Rpb24gZ2V0UHJvamVjdEhlYWRpbmcoKSB7XG4gICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBzcGFuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kby1pdGVtLWhlYWRpbmdcIik7XG4gICAgcmV0dXJuIHNwYW5cbn1cblxuZnVuY3Rpb24gZ2V0UHJvamVjdFRpdGxlKHZhbHVlKSB7XG4gICAgbGV0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XG4gICAgaGVhZGluZy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgIHJldHVybiBoZWFkaW5nXG59XG5cbmZ1bmN0aW9uIGdldFNWRyhzdmdfdmFsdWUsIGlkKSB7XG4gICAgbGV0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKTtcbiAgICBzdmcuaW5uZXJIVE1MID0gc3ZnX3ZhbHVlO1xuICAgIHJldHVybiBzdmdcbn1cblxuZnVuY3Rpb24gZ2V0QnV0dG9ucygpIHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJidXR0b25zXCIpO1xuICAgIGxldCBkZWxldGVCdG4gPSBnZXRTVkcoZGVsZXRlU3ZnLCBcImRlbGV0ZS1idG5cIik7XG4gICAgZGl2LmFwcGVuZCggZGVsZXRlQnRuKTtcbiAgICByZXR1cm4gZGl2XG59XG5cbmZ1bmN0aW9uIGdldFByb2plY3REZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xuICAgIGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG8taXRlbS1kZXNjcmlwdGlvblwiKTtcbiAgICBwLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG4gICAgcmV0dXJuIHBcbn1cblxuZnVuY3Rpb24gZ2V0UHJvamVjdERhdGUoZGF0ZSkge1xuICAgIGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG8taXRlbS1kYXRlXCIpO1xuICAgIHAudGV4dENvbnRlbnQgPSBkYXRlO1xuICAgIHJldHVybiBwXG59XG5cbmNvbnN0IG1ha2VycyA9IHtcbiAgICBcImdldExhYmVsXCIgOiBnZXRMYWJlbCwgXG4gICAgXCJnZXRJbnB1dFwiIDogZ2V0SW5wdXQsXG4gICAgXCJnZXRUZXh0QXJlYVwiIDogZ2V0VGV4dEFyZWEsXG4gICAgXCJnZXRTZWxlY3Rpb25cIiA6IGdldFNlbGVjdGlvbixcbiAgICBcImdldFNlY3Rpb25IZWFkaW5nXCIgOiBnZXRTZWN0aW9uSGVhZGluZyxcbiAgICBcImdldFByb2plY3RDb250YWluZXJcIiA6IGdldFByb2plY3RDb250YWluZXIsXG4gICAgXCJnZXRQcm9qZWN0Q2FyZFwiIDogZ2V0UHJvamVjdENhcmQsXG4gICAgXCJnZXRQcm9qZWN0SGVhZGluZ1wiIDogZ2V0UHJvamVjdEhlYWRpbmcsXG4gICAgXCJnZXRQcm9qZWN0VGl0bGVcIiA6IGdldFByb2plY3RUaXRsZSxcbiAgICBcImdldEJ1dHRvbnNcIiA6IGdldEJ1dHRvbnMsXG4gICAgXCJnZXRQcm9qZWN0RGVzY3JpcHRpb25cIiA6IGdldFByb2plY3REZXNjcmlwdGlvbixcbiAgICBcImdldFByb2plY3REYXRlXCIgOiBnZXRQcm9qZWN0RGF0ZSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZXJzIiwiLy8gY29uc3Qgbm90ZVN2ZyA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHRpdGxlPm5vdGUtb3V0bGluZTwvdGl0bGU+PHBhdGggZD1cIk0xNCwxMEgxOS41TDE0LDQuNVYxME01LDNIMTVMMjEsOVYxOUEyLDIgMCAwLDEgMTksMjFINUMzLjg5LDIxIDMsMjAuMSAzLDE5VjVDMywzLjg5IDMuODksMyA1LDNNNSw1VjE5SDE5VjEySDEyVjVINVpcIiAvPjwvc3ZnPidcblxuLy8gY29uc3QgcHJvamVjdFN2ZyA9ICcgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjx0aXRsZT5jbGlwYm9hcmQtZWRpdC1vdXRsaW5lPC90aXRsZT48cGF0aCBkPVwiTTIxLjA0IDEyLjEzQzIxLjE4IDEyLjEzIDIxLjMxIDEyLjE5IDIxLjQyIDEyLjNMMjIuNyAxMy41OEMyMi45MiAxMy43OSAyMi45MiAxNC4xNCAyMi43IDE0LjM1TDIxLjcgMTUuMzVMMTkuNjUgMTMuM0wyMC42NSAxMi4zQzIwLjc2IDEyLjE5IDIwLjkgMTIuMTMgMjEuMDQgMTIuMTNNMTkuMDcgMTMuODhMMjEuMTIgMTUuOTNMMTUuMDYgMjJIMTNWMTkuOTRMMTkuMDcgMTMuODhNMTEgMTlMOSAyMUg1QzMuOSAyMSAzIDIwLjEgMyAxOVY1QzMgMy45IDMuOSAzIDUgM0g5LjE4QzkuNiAxLjg0IDEwLjcgMSAxMiAxQzEzLjMgMSAxNC40IDEuODQgMTQuODIgM0gxOUMyMC4xIDMgMjEgMy45IDIxIDVWOUwxOSAxMVY1SDE3VjdIN1Y1SDVWMTlIMTFNMTIgM0MxMS40NSAzIDExIDMuNDUgMTEgNEMxMSA0LjU1IDExLjQ1IDUgMTIgNUMxMi41NSA1IDEzIDQuNTUgMTMgNEMxMyAzLjQ1IDEyLjU1IDMgMTIgM1pcIiAvPjwvc3ZnPlxuXG4vLyBjb25zdCBub3JtYWwgdG9kbyA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHRpdGxlPmNoZWNrYm94LW1hcmtlZC1jaXJjbGUtcGx1cy1vdXRsaW5lPC90aXRsZT48cGF0aCBkPVwiTTE0LjMgMjEuN0MxMy42IDIxLjkgMTIuOCAyMiAxMiAyMkM2LjUgMjIgMiAxNy41IDIgMTJTNi41IDIgMTIgMkMxMy4zIDIgMTQuNiAyLjMgMTUuOCAyLjdMMTQuMiA0LjNDMTMuNSA0LjEgMTIuOCA0IDEyIDRDNy42IDQgNCA3LjYgNCAxMlM3LjYgMjAgMTIgMjBDMTIuNCAyMCAxMi45IDIwIDEzLjMgMTkuOUMxMy41IDIwLjYgMTMuOSAyMS4yIDE0LjMgMjEuN003LjkgMTAuMUw2LjUgMTEuNUwxMSAxNkwyMSA2TDE5LjYgNC42TDExIDEzLjJMNy45IDEwLjFNMTggMTRWMTdIMTVWMTlIMThWMjJIMjBWMTlIMjNWMTdIMjBWMTRIMThaXCIgLz48L3N2Zz5cblxuZXhwb3J0IGNvbnN0IGVkaXRTdmcgPSAnIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48dGl0bGU+cGVuY2lsPC90aXRsZT48cGF0aCBkPVwiTTIwLjcxLDcuMDRDMjEuMSw2LjY1IDIxLjEsNiAyMC43MSw1LjYzTDE4LjM3LDMuMjlDMTgsMi45IDE3LjM1LDIuOSAxNi45NiwzLjI5TDE1LjEyLDUuMTJMMTguODcsOC44N00zLDE3LjI1VjIxSDYuNzVMMTcuODEsOS45M0wxNC4wNiw2LjE4TDMsMTcuMjVaXCIgLz48L3N2Zz4nXG5cbmV4cG9ydCBjb25zdCBkZWxldGVTdmcgPSAnIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48dGl0bGU+ZGVsZXRlLW91dGxpbmU8L3RpdGxlPjxwYXRoIGQ9XCJNNiwxOUEyLDIgMCAwLDAgOCwyMUgxNkEyLDIgMCAwLDAgMTgsMTlWN0g2VjE5TTgsOUgxNlYxOUg4VjlNMTUuNSw0TDE0LjUsM0g5LjVMOC41LDRINVY2SDE5VjRIMTUuNVpcIiAvPjwvc3ZnPiciLCJpbXBvcnQgeyBnZXRQcm9qZWN0IH0gZnJvbSBcIi4uL0FwcExvZ2ljL2xvY2FsU3RvcmFnZVF1ZXJ5XCI7XG5pbXBvcnQgZG9tR2VuZXJhdG9yIGZyb20gXCIuL2RvbWdlbmVyYXRvclwiO1xuaW1wb3J0IHsgZGVsZXRlSXRlbSB9IGZyb20gXCIuLi9BcHBMb2dpYy91cGRhdGVmaWxlc1wiO1xuXG5jb25zdCBwcm9qZWN0c19wYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHNcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb3VudCgpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG4gICAgbGV0IHRvZG9zID0gcHJvamVjdHMuZmlsdGVyKHByb2plY3QgPT4gcHJvamVjdC50aXRsZS50b0xvd2VyQ2FzZSgpID09PSBcInRvZG9zXCIpWzBdO1xuICAgIGxldCBub3RlcyA9IHByb2plY3RzLmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3QudGl0bGUudG9Mb3dlckNhc2UoKSA9PT0gXCJub3Rlc1wiKVswXTtcbiAgICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9zIHNwYW46bGFzdC1vZi10eXBlXCIpLnRleHRDb250ZW50ID0gdG9kb3MuZGF0YS5sZW5ndGg7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ub3RlcyBzcGFuOmxhc3Qtb2YtdHlwZVwiKS50ZXh0Q29udGVudCA9IG5vdGVzLmRhdGEubGVuZ3RoO1xufVxuXG51cGRhdGVDb3VudCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2F0ZWdvcmllcyhjYXRlZ29yaWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXRlZ29yeVwiKSkge1xuICAgIGNhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICAgIGNhdGVnb3J5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgYy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjYXRlZ29yeS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB1cGRhdGVQcm9qZWN0U2VjdGlvbihjYXRlZ29yeS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVByb2plY3RzTGlzdCgpIHtcblxuICAgIGxldCBwcm9qZWN0cyA9IGdldFByb2plY3QoKS5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlLnRvTG93ZXJDYXNlKCkgIT09IFwidG9kb3NcIiAmJiBwcm9qZWN0LnRpdGxlLnRvTG93ZXJDYXNlKCkgIT09IFwibm90ZXNcIiApO1xuICAgIHByb2plY3RzX3BhbmVsLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHNwYW4udGV4dENvbnRlbnQgPSBcIlByb2plY3RzXCI7XG4gICAgcHJvamVjdHNfcGFuZWwuYXBwZW5kKHNwYW4pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHNbaV07XG4gICAgICAgIFxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImNhdGVnb3J5XCIpO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgcHJvamVjdC50aXRsZSk7XG5cbiAgICAgICAgbGV0IHNwYW5fbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBzcGFuX25hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xuXG4gICAgICAgIGxldCBzcGFuX2NvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHNwYW5fY291bnQudGV4dENvbnRlbnQgPSBwcm9qZWN0LmRhdGEubGVuZ3RoO1xuICAgICAgICBcbiAgICAgICAgZGl2LmFwcGVuZChzcGFuX25hbWUpO1xuICAgICAgICBkaXYuYXBwZW5kKHNwYW5fY291bnQpO1xuXG4gICAgICAgIHByb2plY3RzX3BhbmVsLmFwcGVuZChkaXYpXG4gICAgfVxuXG4gICAgdG9nZ2xlQ2F0ZWdvcmllcygpO1xufVxuXG51cGRhdGVQcm9qZWN0c0xpc3QoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVByb2plY3RTZWN0aW9uKHNlY3Rpb25faGVhZGluZykge1xuXG4gICAgbGV0IHByb2plY3RfbGlzdCA9IGdldFByb2plY3QoKS5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlLnRvTG93ZXJDYXNlKCkgPT09IHNlY3Rpb25faGVhZGluZy50b0xvd2VyQ2FzZSgpKVswXS5kYXRhO1xuXG4gICAgc3dpdGNoIChzZWN0aW9uX2hlYWRpbmcudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBjYXNlIFwidG9kb3NcIjpcbiAgICAgICAgICAgIGRvbUdlbmVyYXRvci50b2Rvcyhwcm9qZWN0X2xpc3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBjYXNlIFwibm90ZXNcIjpcbiAgICAgICAgICAgIGRvbUdlbmVyYXRvci5ub3Rlcyhwcm9qZWN0X2xpc3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBkb21HZW5lcmF0b3IudG9kb3MocHJvamVjdF9saXN0LCBzZWN0aW9uX2hlYWRpbmcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZ2V0RGVsZXRlQnRucygpO1xufVxuXG5mdW5jdGlvbiBnZXREZWxldGVCdG5zKCkge1xuICAgIGxldCBkZWxldGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNkZWxldGUtYnRuXCIpO1xuICAgIFxuICAgIGRlbGV0ZUJ0bnMuZm9yRWFjaChkZWxldGVCdG4gPT4ge1xuICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZUl0ZW0pXG4gICAgfSlcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL0RvbU1hbmlwdWxhdGlvbi91aW1vZGlmaWVyLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9