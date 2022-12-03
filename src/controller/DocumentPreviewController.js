const pdfjs = require('pdfjs-dist');
const path = require('path')/* Facilita navegação entre pastas independente do sistema operacional alguns sao com / outros com \ */
pdfjs.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js');


export default class DocumentPreviewController{
    constructor(file){
        this._file = file;
    }

    getPreviewData(){
        return new Promise((s, f) => {/* Success, reject */
            
            let reader = new FileReader();
            console.log(this._file.type)
            switch (this._file.type){
                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                    reader.onload = e => {
                        s({
                            src: reader.result,
                            info: this._file.name
                        });
                    }
                    reader.onerror = e => {
                        f(e)
                    }
                    reader.readAsDataURL(this._file);
                break;

                case 'application/pdf': 
                    reader.onload = e => { 
                       let pdfJs = pdfjs.getDocument(reader.result);
                        pdfJs.promise.then(pdf => {
                            pdf.getPage(1).then(page => {
                                let scale = 1.5
                                let viewport = page.getViewport({ scale: scale});
                                let canvas = document.createElement('canvas');
                                let context = canvas.getContext('2d');

                                canvas.height = viewport.height;
                                canvas.width = viewport.width;

                                let renderContext = {
                                    canvasContext: context,
                                    viewport: viewport
                                };

                                let paginaRenderizada = page.render(renderContext);
                                paginaRenderizada.promise.then(()=>{
                                        s({
                                            src: canvas.toDataURL('image/jpeg'),
                                            info: `${pdf.numPages}página${(pdf.numPages > 1) ? 's' : ''}`
                                        });
                                   
                                }).catch(err => {
                                    f(err)
                                })
                            }).catch(err => {
                                f(err);
                            });
                                 
                        }).catch(err => {
                            f(err);
                        })
                    }

                    reader.readAsArrayBuffer(this._file)

                break;

                default:
                    f();
            }
        });
    }
}