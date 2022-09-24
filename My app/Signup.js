const signup = () => {
  let username = document.getElementById('username').value
  let email = document.getElementById('email').value
  let password = document.getElementById("password").value;
  // var messagesend = document.getElementById("input_1").value;

  console.log(email,password)
  if(username===""){
    alert("Enter your User Name")
   }
   
  else if(email===""){
    alert("Enter your Email")
   }
  
  else if(password===""){
    alert("Enter your Password")
  }
 else{


  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      userCredential.user.sendEmailVerification()
      var user = userCredential.user;
    
      // console.log(result)
      firebase.database().ref("user/"+ user.uid).push({
        username: username,
        email: email,
        password:password,
        // message: messagesend,
      })
      .then((success)=>{
      document.getElementById('username').value=""
      document.getElementById('email').value=""
      document.getElementById("password").value="";
      window.location.href="./chat.html"
      alert("Signup Successfully")
      console.log(username)
    })
    .catch((error) => {
      console.log(error)
       // ..
     }); 
    
    })
    .catch((error) => {
     console.log(error)
      // ..
    });

    
};
}
