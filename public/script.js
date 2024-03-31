const uservideo=document.getElementById('user-vedio');
const state={media:null};

const socket=io();

window.addEventListener('load',async e=>{
    const media=await navigator.mediaDevices.getUserMedia({audio:true,video:true});
    state.media=media
    uservideo.srcObject=media;
})


const startButton=document.getElementById('start-btn')

startButton.addEventListener('click',()=>{
    const mediaRecorder=new MediaRecorder(state.media,{
        audioBitsPerSecond:128000,
        videoBitsPerSecond:2500000,
        framerate:25
    });

    mediaRecorder.ondataavailable =(ev)=>{
        console.log("Binary Stream Available",ev.data);
        socket.emit('binarystream',ev.data);
    } 

    mediaRecorder.start(25);
})