class WhatsAppController {
    constructor() {
        console.log("criou")

        this.loadElements()
    }

    loadElements() {
        this.el = {}
        document.querySelectorAll('[id]').forEach(element => {  /* Todos que possuem ID */
            this.el[Format.getCamelCase(element.id)] = element; /* Importante padronização na nomeclatura dos ID */
        })
    }
}