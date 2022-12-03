export default class CameraController {
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

    stop(){
        
        this._stream.getTracks().forEach(track => {
            track.stop();
        })
    }

    takePicture(mimetype = 'image/png'){
        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this._videoEl.videoHeigth)
        canvas.setAttribute('width', this._videoEl.videoWidth)

        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0 , 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimetype)
    }
}