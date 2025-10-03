//function for generating an x button for every list items
function generateCloseButton(myListItems) {
    myListItems = document.getElementsByTagName("li")
    for(let i = 0; i < myListItems.length; i++) {
        let span = document.createElement("span")
        let spanText = document.createTextNode("\u0078")
        span.className = "close"
        span.appendChild(spanText)

        // attach handler immediately so it will work
        span.onclick = function() {
            const li = this.closest("li")
            if(li) li.remove();
            saveTask()
        }

        myListItems[i].appendChild(span) 
    }
}


//add the checked class when clicked any of the item list
function addCheckedMark() {
    const list = document.querySelector('UL')
    list.addEventListener("click", (ev) => {
        if(ev.target.tagName === "LI") {
            ev.target.classList.toggle('checked')
            saveTask()
        }
    })
    
}

function newListElement(newList, inputValue, listText) {
    newList = document.createElement('li')
    inputValue = document.getElementById("task").value
    listText = document.createTextNode(inputValue)
    newList.appendChild(listText)
    if (inputValue === '') {
        alert("The input cannot be empty")
    } else {
        document.getElementById("myTask").appendChild(newList)
    }

    document.getElementById("task").value = ''

    generateCloseButton()
    addCheckedMark()

    saveTask()

}

function saveTask() {
    const task = [];
    document.querySelectorAll('#myTask li').forEach(li => {
        task.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains("checked")
        })
    })
    localStorage.setItem("tasks", JSON.stringify(task))
}

function loadTask() {
    const task = JSON.parse(localStorage.getItem("tasks")) || [];
    task.forEach(task => {
        const li = document.createElement("li")
        li.textContent = task.text

        if (task.checked) {
            li.classList.add("checked")
        }

        
        document.getElementById("myTask").appendChild(li)
        generateCloseButton()
    })
}

loadTask()






