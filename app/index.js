import document from "document";
import * as messaging from "messaging";



// Message is received from companion
messaging.peerSocket.onmessage = evt => {
    console.log('from app is this executed');
  
   document.getElementById("foodcalories").text = evt.data.totalMinutesAsleep.calories ;

};
