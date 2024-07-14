function getLabel(id, text_content) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = text_content;

    return label
}

function getInput(id, type) {
    const input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", type);

    return input
}

const makers = {
    "getLabel" : getLabel, 
    "getInput" : getInput
}

export default makers