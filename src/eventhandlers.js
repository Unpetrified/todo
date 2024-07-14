const open_form = document.querySelector("header svg"),
      pop_form = document.querySelector(".pop-up"),
      blanket = document.querySelector(".blanket"),
      categories = document.querySelectorAll(".category"),
      open_todo_form = document.querySelector(".open-todo"),
      open_project_form = document.querySelector(".open-project"),
      open_note_form = document.querySelector(".open-note"),
      close_form = document.querySelector(".pop-up svg");


open_form.addEventListener("click", () => {
    blanket.style.display = "block";
    pop_form.classList.add("state");
});

categories.forEach(category => {
    category.addEventListener("click", (e) => {
        e.target.classList.toggle("active");
    })
});

open_todo_form.addEventListener("click", toggleFormField);
open_note_form.addEventListener("click", toggleFormField);
open_project_form.addEventListener("click", toggleFormField);

close_form.addEventListener("click", () => {
    blanket.style.display = "none";
    pop_form.classList.remove("state");
})

function toggleFormField(e) {
    const todo_field = document.querySelector(".todo-field"),
          notes_field = document.querySelector(".notes-field"),
          project_field = document.querySelector(".project-field");

    // hide all fields
    todo_field.classList.add("hidden-field");
    notes_field.classList.add("hidden-field");
    project_field.classList.add("hidden-field");

    // remove tab indicator
    open_todo_form.classList.remove("active-form");
    open_note_form.classList.remove("active-form");
    open_project_form.classList.remove("active-form");
    
    // display the form field corresponding with the clicked formtype
    e.target.classList.add("active-form");
    switch (e.target) {
        case open_todo_form:
            todo_field.classList.remove("hidden-field");
            break
        
        case open_note_form:
            notes_field.classList.remove("hidden-field");
            break
        
        default:
            project_field.classList.remove("hidden-field");
            break
    }
}