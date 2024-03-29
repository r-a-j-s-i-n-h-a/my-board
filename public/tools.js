let optinsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let sticky = document.querySelector(".sticky");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let upload = document.querySelector(".upload")
let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;
//true ->show , false -> hide tools

optinsCont.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;
  if (optionsFlag) {
    openTools();
  } else {
    closeTools();
  }
});

function openTools() {
  let iconElem = optinsCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "flex";
}
function closeTools() {
  let iconElem = optinsCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilToolCont.style.display = "block";
  } else {
    pencilToolCont.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    eraserToolCont.style.display = "flex";
  } else {
    eraserToolCont.style.display = "none";
  }
});

upload.addEventListener("click",(e)=>{
let input = document.createElement("input");
input.setAttribute("type","file");
input.click();

input.addEventListener("change", (e) => {
  const fileInput = e.target;
  
  if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const url = URL.createObjectURL(file);

      let stickyTemplateHTML = `
          <div class="header-cont">
              <div class="minimize"></div>
              <div class="remove"></div>
          </div>
           <div class="note-cont">
              <img src="${url}" style="width: 30rem; height: 20rem;"></img>
          </div>
      `;

      createSticky(stickyTemplateHTML);
  } else {
      console.error("No file selected");
  }
});

})


  

sticky.addEventListener("click", (e) => {
  let stickyTemplateHTML= `
<div class="header-cont">
<div class="minimize"></div>
<div class="remove"></div>
</div>
<div class="note-cont">
<textarea spellcheck="false"></textarea>
</div>

`;
createSticky(stickyTemplateHTML);
});
function createSticky(stickyTemplateHTML){
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = stickyTemplateHTML;
  

document.body.appendChild(stickyCont);
let minimize=stickyCont.querySelector(".minimize");
let remove=stickyCont.querySelector(".remove");
noteActions(minimize,remove,stickyCont)
stickyCont.onmousedown = function(event) {

  dragAndDrop(stickyCont, event);
  };



stickyCont.ondragstart = function() {
  return false;
  };
}


function noteActions(minimize,remove,stickyCont){
  remove.addEventListener("click",(e)=>{
    stickyCont.remove();
  })

  minimize.addEventListener("click",(e)=>{
    let nodeCont=stickyCont.querySelector(".note-cont")
    let display=getComputedStyle(nodeCont).getPropertyValue("display");
    if(display==="none") nodeCont.style.display="block";
    else nodeCont.style.display="none";
  })

}


function dragAndDrop(element,event){
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;
  

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
    element.style.right = pageX - shiftX + 'px';
    
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  
  };
}
