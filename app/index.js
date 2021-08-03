import document from "document";
import * as messaging from "messaging";

let myImage = document.getElementById("myImage");

// Message is received from companion
messaging.peerSocket.onmessage = evt => {
    console.log('from app is this executed');
  // Am I Tired?
  if (evt.data.totalMinutesAsleep >= 300) {
    // Had at least 5 hours sleep
    myImage.href = "images/awake.jpg";
  } else {
    // Had less than 5 hours sleep
    myImage.href = "images/sleepy.jpg";
  }
};
