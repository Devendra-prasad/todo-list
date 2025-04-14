/*
const inputBox = document.getElementById('input-box'); // input field selected
const listContainer = document.getElementById('list-container');  // list container selected

function addTask(){
     if(inputBox.value === ''){
         alert("Write task you want to add!");
     }
     else{
         let div1 = document.createElement('div');
         div1.classList.add('items');
        // create checkbox
         let checkbox = document.createElement('input');
         checkbox.type = "checkbox";
         checkbox.id = "checkbox";
        // create liist item
         let li = document.createElement('li');
         li.textContent = inputBox.value;
         // create icon
         let cross = document.createElement('i');
         cross.classList.add("fa-solid", "fa-xmark");

         // div1 ke ander teeno items ko append kar diya
         div1.appendChild(checkbox);
         div1.appendChild(li);
         div1.appendChild(cross);

         // ab us div1 ko container ke ander append kar diya
         listContainer.appendChild(div1);
            // remove task funciton
        cross.addEventListener('click', () =>{
            //  div1.remove(); // ye bhi use kar sakte hai
            listContainer.removeChild(div1);
        }); 
     } 
     inputBox.value = '';  
    
}
*/
let tasks = [];

// load tasks from local storage on page loag
window.onload = function (){
    const storedTasks = localStorage.getItem("tasks");
    if(storedTasks){
        tasks = JSON.parse(storedTasks); // local storage data converted into array
        tasks.forEach((taskText, index) => {
            renderTask(taskText, index); // method for displaying the tasks on screen
        });
    }
};

// function for creating tasks
function createTask(){
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim(); // remove left and right extra space

    if(taskText){
        tasks.push(taskText); // array me task add hua

        updateLocalStorage(); // local storage me upddate save hua

        renderTask(taskText, tasks.length - 1);  // screen per dikhega

        input.value = "";  // input box clear hua
    }
    else{
        alert("Plese enter a task!");
    }
}

// function to show tasks in the screen
function renderTask(taskText, index){
    const listContainer = document.getElementById("list-container");
    // task div banana
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("items");

    // checkbox creation
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

     // list item creation
     const li = document.createElement("li");
     li.textContent = taskText;

    //checkbox ke checked hone per task select karwana 
    checkbox.addEventListener("change", ()=>{
        if(checkbox.checked){
            li.style.textDecoration = "line-through";
        }else{
            li.style.textDecoration = "none";
        }
    });

     // cross icon creation
     const icon = document.createElement("i");
     icon.classList.add("fa-solid", "fa-trash");

     // delete karna hai funciton icon per click karne per
     icon.addEventListener("click", ()=>{
         listContainer.removeChild(taskDiv); // screen se delete ho jayega
         tasks.splice(index,1); // array se hataya gaya

         // update local storage
         updateLocalStorage();

         // screen fhir se redraw karo 
         refreshTask();
     });

     // checkbox, li, icon ko taskDiv me dalo
     taskDiv.appendChild(checkbox);
     taskDiv.appendChild(li);
     taskDiv.appendChild(icon);
     
     // taskDiv ko container me dalo
     listContainer.appendChild(taskDiv);

}

// local storage me update karna yani vapas se string ke format me data store karnan
function updateLocalStorage (){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// refreshTask function ka use isliye kar rahe hai kyonki array se task hatane ke bad array ka index 
// disturn ho jayega isliye vapas se empty karke fir se add kar rahe hai 
function refreshTask(){
    const listContainer = document.getElementById("list-container");

    listContainer.innerHTML = ""; // pura content hataya gaya
    tasks.forEach((taskText, index)=>{
        renderTask(taskText, index); // naye index ke sath redrew karo
    });

}
