export default class MicrophoneController {
    constructor() {

        navigator.mediaDevices.getUserMedia({/* permissao p/ acessar camera */
        audio: true
    }).then((stream) => {

        this._stream = stream;

        let audio = new Audio();

        audio.srcObject = stream
        audio.play();          
    }).catch(err => {
        console.error(err)
    });

    
    }

    stop(){
        this._stream.getTracks().forEach(track => {
            console.log('stop');
            track.stop();
        })
    }
}