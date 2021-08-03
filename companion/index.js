import * as messaging from "messaging";
import { settingsStorage } from "settings";



// A user changes Settings
settingsStorage.onchange = evt => { 
  if (evt.key === "oauth") {
    // Settings page sent us an oAuth token
    let data = JSON.parse(evt.newValue);
    fetchCalories(data.access_token) ;
  }
};

// Restore previously saved settings and send to the device
function restoreSettings() {
    
  
  
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    
    if (key && key === "oauth") {
      // We already have an oauth token
      let data = JSON.parse(settingsStorage.getItem(key))
      
      fetchCalories(data.access_token);
    }
  }
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  
  restoreSettings();
};


//================================================================
//
//================================================================

function fetchCalories(accessToken)  {
  
  let date = new Date();
  let todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //YYYY-MM-DD

  // Sleep API docs - https://dev.fitbit.com/reference/web-api/sleep/
  //  /1.2/user/-/sleep/date/{date}.json
  fetch(`https://api.fitbit.com/1/user/-/foods/log/date/${todayDate}.json`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  }) 
  .then(function(res) {
    return res.json();
  }) 
  .then(function(data) {
    let myData = {
      totalMinutesAsleep: data.summary.calories
      
      //data.summary.calories
    }
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(myData);
      console.log("=============="+ JSON.stringify(myData.totalMinutesAsleep));
    }
  })
  .catch(err => console.log('[FETCH]: ' + err));
}
