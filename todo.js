const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    chkBodyOverflow = document.querySelector("body");

const TODOS_LS = 'toDos';
const BOOTSTRAP_DNGBTN = 'btn-danger';
let toDos = [];

function overflowHandler(li){
    alert("too much list!");
    toDoList.removeChild(li);
}

function deleteToDo(event){
    //console.dir(event.target.parentNode); 하위항목이 뭔지 모를때 dir을 써서 콘솔창을 통해 알 수 있다.
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click",deleteToDo);
    delBtn.classList.add(BOOTSTRAP_DNGBTN);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    if(toDoList.offsetHeight > 226){
        overflowHandler(li);
    }else{
    const toDoObj = {
        text : text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
    }
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); //String으로 스토리지에 저장된 데이터값을 Object로 바꿔줌
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }else{

    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
