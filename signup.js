/////////for check user login or not///////////////////
window.addEventListener('load',function(){
  var userLogIn = localStorage.getItem("userLogIn")
  if(userLogIn){
    window.location.replace("./dashbord.html")
    return
  }else{
    document.body.style.display = "block"
  }
})

function signup() {
  var firstName = document.getElementById("firstName");
  var lastName = document.getElementById("lastName");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var getUsers = JSON.parse(localStorage.getItem("arr"));
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    alert("Please fill all the Fields");
    return;
  }
  var obj = {
    firstName : firstName.value,
    lastName : lastName.value,
    email : email.value,
    password : password.value,
  };
  
  if (getUsers == null) {
    var arr = [];
    arr.push(obj);
    localStorage.setItem("arr", JSON.stringify(arr));
    window.location.assign("./index.html")
    firstName.value = ""
    lastName.value = ""
    email.value = ""
    password.value = ""
  } else {
    var getEmail = getUsers.findIndex(function (index) {
      if (index.email == email.value) {
        return true;
      }
    });
    var emailMsg = document.getElementById("emailHelp");
    if (getEmail !== -1) {
      emailMsg.style.display = "inline-block";
      return;
    }else {
      getUsers.push(obj);
      localStorage.setItem("arr", JSON.stringify(getUsers));
      window.location.assign("./index.html")
      firstName.value = ""
      lastName.value = ""
      email.value = ""
      password.value = ""
    }
  }
}
