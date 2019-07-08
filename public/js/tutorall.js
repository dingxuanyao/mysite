function sendSDP(RTCSessionDescription, type, room_id) {
  var xhttp = new XMLHttpRequest();
  params = {
    type: type,
    room_id: room_id,
    RTCSessionDescription: RTCSessionDescription
  };
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      body = JSON.parse(this.responseText);
    }
  };
  xhttp.open("POST", `/tutorall/api/sendsdp`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(params));
}

function sendIceCandidate(candidate, type, room_id) {
  var xhttp = new XMLHttpRequest();
  params = {
    type: type,
    room_id: room_id,
    candidate: candidate
  };
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      body = JSON.parse(this.responseText);
    }
  };
  xhttp.open("POST", `/tutorall/api/addicecandidate`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(params));
}

async function getSDP(type, room_id) {
  return new Promise(resolve => {
    var xhttp = new XMLHttpRequest();
    params = {
      type: type,
      room_id: room_id
    };
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        body = JSON.parse(this.responseText);
        resolve(body);
      }
    };
    xhttp.open("POST", `/tutorall/api/getsdp`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(params));
  });
}

async function getIceCandidates(type, room_id) {
  return new Promise(resolve => {
    var xhttp = new XMLHttpRequest();
    params = {
      type: type,
      room_id: room_id
    };
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        body = JSON.parse(this.responseText);
        resolve(body);
      }
    };
    xhttp.open("POST", `/tutorall/api/geticecandidates`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(params));
  });
}
async function addmediastream(videoelement, peerconnection) {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  });
  videoelement.srcObject = stream;
  localStream = stream;
  localStream.getTracks().forEach(track => {
    peerconnection.addTrack(track, localStream);
  });
}

function remove_room(room_id) {
  console.log("unloading");
  var xhttp = new XMLHttpRequest();
  params = {
    room_id: room_id
  };
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      body = JSON.parse(this.responseText);
    }
  };
  xhttp.open("POST", `/tutorall/api/removeroom`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(params));
}

var configuration = {
  iceServers: [
    {
      url: "turn:3.216.30.32:3478",
      username: "user",
      credential: "root"
    }
  ]
};
