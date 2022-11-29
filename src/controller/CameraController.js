class CameraController {
    constructor(videoEl) {
        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({/* permissao p/ acessar camera */
            video: true
        }).then((stream) => {
            
            this._stream = stream
            console.log(this._videoEl)

            this._videoEl.srcObject = stream
            this._videoEl.play();          
        }).catch(err => {
            console.error(err)
        })
    }
}