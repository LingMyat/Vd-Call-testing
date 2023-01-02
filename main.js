let APP_ID = 'e2bacbaed91b435886184748f9b22434';

let token = null;

let localStream;
let remoteStream;
let peerConnection;
const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
        }
    ]
}

let init = async()=>{
    localStream = await navigator.mediaDevices.getUserMedia({video:true,audio:false});// to get browser camera and mic
    document.getElementById('user-1').srcObject=localStream;
    createOffer();
}

let createOffer = async()=>{
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject=remoteStream;

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track,localStream);
    });

    peerConnection.ontrack = (event)=>{
        event.stream[0].getTracks().forEach((track)=>{
            remoteStream.addTrack()
        })
    }

    peerConnection.onicecandidate = async (event)=>{
        if(event.candidate){
            console.log('New Ice Candidate:',event.candidate);
        }
    }

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log('Offer:',offer);
}

init();