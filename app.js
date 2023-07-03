window.addEventListener('load',function(){
    var userLogIn = localStorage.getItem("userLogIn")
    if(userLogIn){
      window.location.replace("./dashbord.html")
      return
    }else{
        document.body.style.display = "block"
    }
})


var show = document.getElementById("psShow")
var password = document.getElementById("password")
var email = document.getElementById("email")
/////////////////////function for password show and hide//////////////////////////
password.addEventListener('input',function(){
    
    if(this.value.length == 0){
        show.style.display = "none"
    }else{
        show.style.display = "inline-block"
    }
    
})
show.addEventListener('click',function(){
    if(show.innerText == "Show" ){
        show.innerText = "Hide"
        password.type = "text"
    }else{
        show.innerText = "Show"
        password.type = "password"
    }
})
//////////////////////////////function for login////////////////////////////////////////////////////
function login(){
    var getUser =JSON.parse(localStorage.getItem("arr"))
    if(!email.value || !password.value){
        // alert("fill all the fields")
        Swal.fire({
            title: 'Fill All The Fields',
            icon: 'warning',
            confirmButtonColor: '#ffc107',
            iconColor: '#ffc107'
          })
        return
    }
    if(getUser == null){
        alert("account does not exist")
    }else{
        var checkUser = getUser.find(function(value){
            if(value.email == email.value && value.password == password.value){
                return true
            }
        })
    
        if(checkUser !== undefined){
            
            var userLogIn = checkUser
            localStorage.setItem("userLogIn",JSON.stringify(userLogIn))
            let signUpMessage = document.querySelector(".signUpMessage")
            signUpMessage.style.animationName = "message"
            setTimeout(function(){
                window.location.replace("./dashbord.html")
            },1500)
               
        }else{
            Swal.fire({
                text: 'Email & Password Doesn\'t Match',
                icon: 'warning',
                iconColor: '#f15555',
                confirmButtonColor: '#ffc107',
              })
        }
    }
}




