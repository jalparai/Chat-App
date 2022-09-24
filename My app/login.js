function login_S(){
    var email=document.getElementById("loginemail")
    var password=document.getElementById("loginpass")
  
   if(email.value===""){
    alert("please enter your email")
   }
  
   else if(password.value===""){
      alert("enter your password")
   }
    else{  
    firebase.auth().signInWithEmailAndPassword(email.value,password.value)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;

      //  document.getElementById("loginpass").value=""
       
      document.getElementById("loginemail").value=""
      document.getElementById("loginpass").value=""

      window.location.assign("./chat.html")
      alert("Welcome to Jeeni Chat App")
  
        
      })
      .catch((error) => {
     alert(error)
    
      })
     
  }
  }