import document from "document";
import * as messaging from "messaging";

import { today } from "user-activity";

// Message is received from companion
messaging.peerSocket.onmessage = evt => {
    //
    console.log('from app is this executed');
  
  var BMR=1800; // TODO use api to get BMR instead of assuming
  var food= evt.data.totalMinutesAsleep.calories;
  food=food-BMR;
  var excercise = today.adjusted.calories;
  excercise=excercise-BMR;
  excercise=excercise-(0.4*excercise);// subtract 40% since fitbit is inaccurate
  excercise=excercise.toFixed(2);
  var balance = parseInt(excercise)-parseInt(food)
   document.getElementById("foodcalories").text = food;
  document.getElementById("burnedcalories").text = excercise; 
  
  if(balance<0){
  
    document.getElementById("balancecalories").style.fill='red';
     }
  document.getElementById("balancecalories").text = balance; 

};
