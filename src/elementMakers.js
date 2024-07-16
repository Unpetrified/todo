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

const makers = {
    "getLabel" : getLabel, 
    "getInput" : getInput,
    "getTextArea" : getTextArea
}

export default makers