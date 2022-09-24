var myName = prompt("Enter your username ");
var container=document.getElementById('container')
var userId = '' 
var getUserData = ''
firebase.auth().onAuthStateChanged((user) => {
 var user=firebase.auth().currentUser;
     userId = user.uid
     firebase.database().ref("user/" + userId).on("child_added",(res)=>{
       getUserData=res.val()
console.log(getUserData)
   })

  });

  var postImg=""
function imageupload(e){  
  // var imgupload=document.getElementById("img")

    var path =e.files[0];
//  console.log(path)
    var uploadTask= firebase.storage().ref()
    .child("message"+path.name)
    .put(path)
    uploadTask.on('state_changed', 
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;  
        var loader =document.getElementById('loader').style.display='block'
        if(progress ===100){
          document.getElementById('loader').style.display='none'
          document.getElementById('uploadarrow').style.display='block'
          document.getElementById('icon_img').style.display='none'

        }
        console.log('upload is '+progress+"% done")
    },
    (error) => {
  
      },
      () => { uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
postImg=downloadURL
        console.log('File available at', postImg);
      });
    })

    }
    console.log(postImg)
function sendMessage() {
      var today=new Date()
      var date= `${today.getDate()< 10 ? '0' :''}${today.getDate()}`;
    var month =`${(today.getMonth()+1)<10 ? '0': ''}${today.getMonth()+1}`
    var year =today.getFullYear()
    var fullDate=`${date}/${month}/${year}`

    var realTime= today.getHours()
    realTime<10? '0':'' 
    var min=today.getMinutes()
   var sec= today.getSeconds()

   var ampm=realTime >=12? "pm": "am"
   realTime = realTime % 12;
   realTime = realTime ? realTime : 12; 
   var fulTime = realTime+":"+min+":"+sec+":"+ampm
  var messagesend = document.getElementById("input_1").value;
  firebase.database().ref('message').push({
      promptName:myName,
      text: messagesend,
      date:fullDate,
      time:fulTime,
   

    })
    .then(result=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
}
function imgfatech(){
  var today=new Date()
  var date= `${today.getDate()< 10 ? '0' :''}${today.getDate()}`;
var month =`${(today.getMonth()+1)<10 ? '0': ''}${today.getMonth()+1}`
var year =today.getFullYear()
var fullDate2=`${date}/${month}/${year}`
firebase.database().ref('img').push({
  promptName:myName,
  image:postImg,
  date:fullDate2,
 
})
.then(result=>{
  console.log(result)
})
.catch(err=>{
  console.log(err)
})

document.getElementById('uploadarrow').style.display='none'
          document.getElementById('icon_img').style.display='block'
}
function img(){
  alert('Image uploading wait for few seconds...')
  setTimeout( imgfatech , 5000);
}


  firebase.database().ref("message").on("child_added", (data) => {
    var getMesg = data.val();
        if (getMesg.promptName != myName) {
          var receiveMesg = document.createElement("div");
          receiveMesg.setAttribute("class", "rece_mesg");
          var divImg=document.createElement('div')
          var profil=document.createElement("img")
          profil.setAttribute('class','prof_pic')
          profil.setAttribute('src','../images/pro.png')
          var user_get = document.createElement("span");
          user_get.innerHTML = getMesg.promptName;
          user_get.setAttribute("class",'username')
          var dateShow=document.createElement('span')
          dateShow.setAttribute("class","date")
          dateShow.innerHTML=getMesg.date
      
          

          var text_get = document.createElement("p");
          text_get.setAttribute('class','text_mesg')
          var br = document.createElement("br");
          text_get.innerHTML = getMesg.text;
         
          receiveMesg.appendChild(profil)
          receiveMesg.appendChild(user_get);
          receiveMesg.appendChild(dateShow)
         
          receiveMesg.appendChild(text_get);
          container.appendChild(receiveMesg);
          container.appendChild(br);
        } else {
          var sendMesg = document.createElement("div");
          sendMesg.setAttribute("class", "sen_mesg");
          var profil2=document.createElement("img")
          profil2.setAttribute('class','prof_pic')
          profil2.setAttribute('src','../images/pro.png')
          var user2_get = document.createElement("span");
          user2_get.setAttribute("class",'username')
          user2_get.innerHTML = getMesg.promptName;
          var dateShow2=document.createElement('span')
          dateShow2.setAttribute("class","date")
          dateShow2.innerHTML=getMesg.date
       
          
          var text2_get = document.createElement("p");
          text2_get.setAttribute('class','text_mesg')
          text2_get.innerHTML = getMesg.text;
          var br2 = document.createElement("br");
          sendMesg.appendChild(profil2)
   
          sendMesg.appendChild(user2_get);
          sendMesg.appendChild(dateShow2);
   
          sendMesg.appendChild(text2_get);
         
          container.appendChild(sendMesg);
          container.appendChild(br2);
   
        }
        document.getElementById("input_1").value = "";

      
      });
   

      firebase.database().ref("img").on("child_added", (snap) => {
        var imgUplo=snap.val()
        console.log(">>>>>>>>>>",imgUplo)
        if (imgUplo.promptName != myName) {
          var profil=document.createElement("img")
          profil.setAttribute('class','prof_pic')
          profil.setAttribute('src','../images/pro.png')
          var user_get = document.createElement("span");
          user_get.innerHTML = imgUplo.promptName;
          user_get.setAttribute("class",'username')
        var receiverImg=document.createElement('div')
        receiverImg.setAttribute('class','recImg')
        var imgShow=document.createElement('img')
        imgShow.setAttribute('src',imgUplo.image)
        imgShow.setAttribute('class','showImgfrnt')
        var dateShow=document.createElement('span')
        dateShow.setAttribute("class","date")
        dateShow.innerHTML=imgUplo.date
// var video=document.createElement('video')
// var source =document.createElement('source')
// source.setAttribute('src',imgUplo.image)
// video.setAttribute('class','showImgfrnt')
        receiverImg.appendChild(profil)
        receiverImg.appendChild(user_get);
        receiverImg.appendChild(dateShow)
        receiverImg.appendChild(imgShow)
        // receiverImg.appendChild(video)
        // video.appendChild(source)
        container.appendChild(receiverImg)
        }
        else{
          var sendMesg = document.createElement("div");
          sendMesg.setAttribute("class", "sen_mesg");
          var profil2=document.createElement("img")
          profil2.setAttribute('class','prof_pic')
          profil2.setAttribute('src','../images/pro.png')
          var user2_get = document.createElement("span");
          user2_get.setAttribute("class",'username')
          user2_get.innerHTML = imgUplo.promptName;
          var senderImg2=document.createElement('div')
          senderImg2.setAttribute('class','sendImg')
          var imgShow2=document.createElement('img')
          imgShow2.setAttribute('src',imgUplo.image)
          imgShow2.setAttribute('class','showImgfrnt')
          var dateShow2=document.createElement('span')
          dateShow2.setAttribute("class","date")
          dateShow2.innerHTML=imgUplo.date
//           var video=document.createElement('video')
// var source =document.createElement('source')
// source.setAttribute('src','https://mazwai.com/videvo_files/video/free/2014-12/small_watermarked/james-look_up_preview.webm')
// video.setAttribute('class','showImgfrnt')
          senderImg2.appendChild(profil2)
          senderImg2.appendChild(user2_get);
          senderImg2.appendChild(dateShow2);
          senderImg2.appendChild(imgShow2)
          // senderImg2.appendChild(video)
          // video.appendChild(source)
        container.appendChild(senderImg2)
        }
        })
        
const logout=()=>{
  firebase.auth().signOut()
  window.location.href='./login.html'


}
const removeall=()=>{
  firebase.database().ref('message').remove()
  firebase.database().ref('img').remove()
  window.location.reload()

}
