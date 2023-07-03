var postsParent = document.querySelector(".posts")

////////////Function For Delete and Create Post from localStorage using Unique Id///////////
function uniqueId(){
  var getPosts = JSON.parse(localStorage.getItem("posts")) || []
  var id;
  if(getPosts.length > 0){
     id = getPosts[0].id + 1 
  }else{
      id = 1
  }
  return id
}
//////////////////////////////////////////////////////////////////////////////////////////


//////////////////For Dark Mode////////////////////////
const switchBtn = document.querySelector(".switch")
switchBtn.addEventListener('click',function(){
  const root = document.querySelector(':root');
  let theme = this.firstElementChild.classList.contains("darkBtn")
  this.firstElementChild.classList.toggle("darkBtn")
  if(theme){
    this.firstElementChild.innerHTML = "<i class='fa-solid fa-sun'></i>"
    root.style.setProperty('--dark', '#f6f0dd');
    root.style.setProperty('--dark1', '#fff');
    root.style.setProperty('--dark2', '#666');
  }else{
    this.firstElementChild.innerHTML = "<i class='fa-solid fa-moon'></i>"
    this.firstElementChild.firstElementChild.style.color = "#fff"
    root.style.setProperty('--dark', '#1d2a35');
    root.style.setProperty('--dark1', '#38444d');
    root.style.setProperty('--dark2', '#fff');
  }
  localStorage.setItem('theme',JSON.stringify(theme))
})
////////////////////////////////////////////////////////////



////////////////////////For Own Post Delete///////////////////////////
function checkOwnPost(){
  return check = ` <button class="btn border-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
     <i class="fa-solid fa-ellipsis-vertical opt"></i>
   </button>
   <ul style="background-color: rgb(249 219 130);" class="dropdown-menu">
     <li><a data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever ="Edit" class="dropdown-item" onclick = "edit(this,${index.id})">Edit</a></li>
     <li><a class="dropdown-item" onclick = "remove(this,${index.id})" >Delete</a></li>
   </ul>`
}
//////////////////////////////////////////////////////////////




/////////////////////For check User log in or not//////////////////////
window.addEventListener("load",function(){
  const userLogIn = JSON.parse(localStorage.getItem("userLogIn"))
  if(userLogIn){
    document.body.style.display = "block"
  }else{
    window.location.replace("./index.html")
    return
  }
  //////////////////////////////////////////////////////////////////////


  ///////////////////////////////userTheme///////////////////////////////
  const userTheme = JSON.parse(localStorage.getItem('theme')) 
  const root = document.querySelector(':root');
  if(userTheme == null || userTheme){
    switchBtn.firstElementChild.innerHTML = "<i class='fa-solid fa-sun'></i>"
    root.style.setProperty('--dark', '#f6f0dd');
    root.style.setProperty('--dark1', '#fff');
    root.style.setProperty('--dark2', '#666');
  }else{
    switchBtn.firstElementChild.classList.toggle("darkBtn")
    switchBtn.firstElementChild.innerHTML = "<i class='fa-solid fa-moon'></i>"
    switchBtn.firstElementChild.firstElementChild.style.color = "#fff"
    root.style.setProperty('--dark', '#1d2a35');
    root.style.setProperty('--dark1', '#38444d');
    root.style.setProperty('--dark2', '#fff');
  }
  ////////////////////////////////////////////////////
  var getPosts = JSON.parse(localStorage.getItem("posts")) || []
        for ( index of getPosts) {
          
            var divElement = document.createElement("div")
            divElement.innerHTML = `<div class="postConatiner postInputContainer mt-3">
            <div class="d-flex justify-content-between ">
              <div class="authorsDetails d-flex align-items-center">
                <div class="post-header-container d-flex align-items-center">
                  <div class="image">
                    <img
                      src="./admin.png"
                      alt="" class="img-fluid rounded mx-auto d-block">
                  </div>
                  <div class="userName-id ms-2">
                    <p class="mb-1 userTag" >
                      ${index.firstName}@</p>
                    <div class="d-flex align-items-center justify-content-center">
                      <h5 class="mb-1 text-capitalize username">${index.firstName +" "+index.lastName}</h5>
                      <p class="mb-0 ms-2" style="color: #ffc107; font-size: 12px;">${index.postTime}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
              
                ${index.user == userLogIn.email ? checkOwnPost() : ""}

                </div>
              </div>
            </div>
            <div class="postDetails">
                <h5>${index.title}</h5>
              <p  class="mt-2">${index.description}</p>
            </div>
            <div class="postImage-video">
              <img
                src="https://images.unsplash.com/photo-1687226197732-f91552499640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                alt="" >
            </div>
            <div class="like-comment-share d-flex justify-content-start align-items-center mt-3">
              <i class="fa-solid fa-heart ms-3 fs-5"></i>
              <i class="fa-solid fa-comment ms-3 fs-5"></i>
              <i class="fa-solid fa-share ms-3 fs-5"></i>
            </div>
            <div class="comment-container d-flex align-items-center mt-3 border-top border-secondary-subtle pt-2">
              <div class="image">
                <img
                  src="./admin.png"
                  alt="" class="img-fluid rounded mx-auto d-block">
              </div>
              <div class="search ps-3 " style="width: 100%;">
                <div class="input-group" style="width: 100%;">
                  <input type="text" class="form-control" placeholder="Write your comment"
                    aria-label="Example text with button addon" aria-describedby="button-addon1" id="comment">
                  <button class="btn " type="button" id="button-addon1" style="background-color: #222;"><i
                      class="fa-solid fa-paper-plane" style="color: #636363;"></i></button>
                </div>
              </div>
            </div>
          </div>`
          postsParent.append(divElement)
           }
    
    
})
////////////////////function for logout//////////////////////
var getLogInUser =JSON.parse(localStorage.getItem("userLogIn"))
document.getElementById("name").innerHTML = `${getLogInUser.firstName +" "+getLogInUser.lastName}`
document.getElementById("tag").innerHTML = `${getLogInUser.firstName}@`
function logOut(){
    localStorage.removeItem("userLogIn")
    window.location.replace("./index.html")
}
////////////////////////Function for create post////////////////
function createPost(){
    var title = document.getElementById("title")
    var description = document.getElementById("description")
    var currentDate = new Date()

   var divElement = document.createElement("div")
   divElement.innerHTML = `<div class="postConatiner postInputContainer mt-3">
    <div class="d-flex justify-content-between ">
      <div class="authorsDetails d-flex align-items-center">
        <div class="post-header-container d-flex align-items-center">
          <div class="image">
            <img
              src="./admin.png"
              alt="" class="img-fluid rounded mx-auto d-block">
          </div>
          <div class="userName-id ms-2">
            <p class="mb-1 userTag">
              ${getLogInUser.firstName}@</p>
            <div class="d-flex align-items-center justify-content-center">
              <h5 class="mb-1 text-capitalize username">${getLogInUser.firstName +" "+getLogInUser.lastName}</h5>
              <p class="mb-0 ms-2" style="color: #ffc107; font-size: 12px;">${currentDate.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <button class="btn border-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-ellipsis-vertical opt"></i>
          </button>
          <ul style="background-color: rgb(249 219 130);" class="dropdown-menu">
            <li><a data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever ="Edit" class="dropdown-item" onclick = "edit(this,${uniqueId()})")">Edit</a></li>
            <li><a class="dropdown-item" onclick ="remove(this,${uniqueId()})">Delete</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="postDetails">
        <h5>${title.value}</h5>
      <p class="mt-2">${description.value}</p>
    </div>
    <div class="postImage-video">
      <img
        src="https://images.unsplash.com/photo-1687226197732-f91552499640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
        alt="" >
    </div>
    <div class="like-comment-share d-flex justify-content-start align-items-center mt-3">
      <i class="fa-solid fa-heart ms-3 fs-5"></i>
      <i class="fa-solid fa-comment ms-3 fs-5"></i>
      <i class="fa-solid fa-share ms-3 fs-5"></i>
    </div>
    <div class="comment-container d-flex align-items-center mt-3 border-top border-secondary-subtle pt-2">
      <div class="image">
        <img
          src="./admin.png"
          alt="" class="img-fluid rounded mx-auto d-block">
      </div>
      <div class="search ps-3 " style="width: 100%;">
        <div class="input-group" style="width: 100%;">
          <input type="text" class="form-control" placeholder="Write your comment"
            aria-label="Example text with button addon" aria-describedby="button-addon1" id="comment">
          <button class="btn " type="button" id="button-addon1" style="background-color: #222;"><i
              class="fa-solid fa-paper-plane" style="color: #636363;"></i></button>
        </div>
      </div>
    </div>
  </div> `
  postsParent.prepend(divElement)

  var obj ={
    postTime : currentDate.toLocaleTimeString(),
    id : uniqueId(),
    firstName : getLogInUser.firstName,
    lastName : getLogInUser.lastName,
    title : title.value,
    description : description.value,
    user: getLogInUser.email 
  }
  
  var getitem = JSON.parse(localStorage.getItem("posts")) || []

    getitem.unshift(obj)
    localStorage.setItem("posts",JSON.stringify(getitem))
  
    title.value = ""
    description.value = ""
}

/////////////////Function For delete Post//////////////////////////
function remove(ele,id){
  var getPosts =JSON.parse(localStorage.getItem("posts")) || []

  var findId = getPosts.findIndex(function(value){
    if(id == value.id){
      return true
    }
  })

    ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
    getPosts.splice(findId,1)
    localStorage.setItem("posts",JSON.stringify(getPosts))
 
}

var uptTitle = document.querySelector("#uptTitle")
var uptDescription = document.querySelector("#uptDescription")
var edt ;
var edtId;

function edit(ele,id){
    edt = ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children
    uptTitle.value = edt[0].innerHTML
    uptDescription.value = edt[1].innerHTML
    edtId = id
}
var edtpost = document.querySelector("#updateBtn").addEventListener("click",function(){
  edt[0].innerHTML = uptTitle.value
  edt[1].innerHTML = uptDescription.value
  edtId

  var getPosts =JSON.parse(localStorage.getItem("posts"))
  
  var edtPost = getPosts.findIndex(function(index){
    if(index.id == edtId){
      return true
    }
  })


  getPosts[edtPost].title = uptTitle.value
  getPosts[edtPost].description = uptDescription.value
  localStorage.setItem("posts",JSON.stringify(getPosts))
  
})