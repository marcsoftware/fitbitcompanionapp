import document from "document";
import * as messaging from "messaging";
import { user } from "user-profile";
import { today } from "user-activity";
import { me as appbit } from "appbit";

// Message is received from companion


//------------------------------------------------
//
//------------------------------------------------
messaging.peerSocket.onmessage = evt => {
    //
 
   renderPrompt();   
   let date = new Date();
  let hours = date.getHours(); //YYYY-MM-DD
  let minutes = date.getMinutes();
  var totalMinutes=hours*60+minutes;
  
  var BMR= (user.bmr || 1800); 
  var BMR_per_minute=BMR/(24*60);
  
  
  var food= evt.data.totalMinutesAsleep.calories;
  food=food;
  var excercise = today.adjusted.calories;
  
  excercise=excercise-(BMR_per_minute*totalMinutes);
  excercise=excercise-(0.4*excercise);// subtract 40% since fitbit is inaccurate
  excercise=excercise.toFixed(2);
  var balance = parseInt(excercise)-parseInt(food)+BMR;
   document.getElementById("foodcalories").text = food*-1;
  document.getElementById("burnedcalories").text = excercise; 
  
  if(balance<0){
  
    document.getElementById("balancecalories").style.fill='red';
    document.getElementById("balancecalorieslabel").style.fill='red';
     }
  document.getElementById("BMR").text = BMR; 
  document.getElementById("balancecalories").text = balance; 
 if(food){
  clearPrompt(); //clear prompt if recieved message
 }
};

//------------------------------------------------
//
//------------------------------------------------
function clearPrompt(){
  console.log('clear=============================clear');
  document.getElementById("prompt1").text = ''; 
  document.getElementById("prompt2").text = ''; 
}


//------------------------------------------------
// Prompt user to login.
//------------------------------------------------
function renderPrompt(){
  console.log('render=============================render');
  document.getElementById("prompt1").text = 'You need to login'; 
  document.getElementById("prompt2").text = 'see documentation'; 
}