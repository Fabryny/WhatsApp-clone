class WhatsAppController {
    constructor() {
        this.loadElements();
        this.elementsPrototype();
        this.initEvents();
    }
    
    elementsPrototype(){
        Element.prototype.hide = function() {
            this.style.display = 'none';
        }
        Element.prototype.show = function() {
            this.style.display = 'block';
            return this;/* Para chamar um metodo em conjunto do outro ( app.el.app.toogle().addClass() ) */
        }
        Element.prototype.toggle = function() {
            this.style.display = this.style.display === 'none' ? 'block' : 'none';
            return this;
        }
        Element.prototype.on = function(events, func) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, func);
            });
            return this;
        }
        Element.prototype.css = function(styles) {
            for ( let name in styles) {
                this.style[name] = styles[name];
            }
            return this;
        }
        Element.prototype.addClass = function(className) {
            this.classList.add(className)
            return this;
        }
        Element.prototype.removeClass = function(className) {
            this.classList.remove(className)
            return this;
        }
        Element.prototype.toggleClass = function(className) {
            this.classList.toggle(className)
            return this;
        }
        Element.prototype.hasClass = function(className) {
           return this.classList.contains(className)
        }

        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this);
        }

        HTMLFormElement.prototype.toJSON = function () {
            let json = {}

            this.getForm().forEach((value, key) => {
                json[name] = value
            });
        }


    }

    loadElements() {
        this.el = {}
        document.querySelectorAll('[id]').forEach(element => {  /* Todos que possuem ID */
            this.el[Format.getCamelCase(element.id)] = element; /* Importante padronização na nomeclatura dos ID */
        })
    }

    initEvents(){
        this.el.myPhoto.on('click', e => {
            this.closeAllLeftPanels();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300)/* Timeout utilizado para ter tempo da animação css funcionar */
        });

        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanels();
            this.el.panelAddContact.show();     
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300)/* Timeout utilizado para ter tempo da animação css funcionar */
        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        });

        this.el.photoContainerEditProfile.on('click', e => {
            this.el.inputProfilePhoto.click()
        });

        this.el.btnSavePanelEditProfile.on('click', e => {
          console.log(this.el.inputNamePanelEditProfile.innerHTML)
        });
        
        this.el.inputNamePanelEditProfile.on('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click()
            }
        });

        this.el.formPanelAddContact.on('submit', e=> {
            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact)/* Pega e trata todos os campos com base no name */
        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', e => {
                this.el.main.css({
                    display: 'flex',
                })
            });
        });

        this.el.btnAttach.on('click', e => {
            e.stopPropagation();/* nao propaga para o pai (ativa apenas um eventListner, não dois.) */
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this))/* bind diz que o escopo this é da classe controller e nao do document */
        });
           
        this.el.btnAttachPhoto.on('click', e => {
            console.log('photo')
        });

        this.el.btnAttachCamera.on('click', e => {
           console.log('camera')
        });

        this.el.btnAttachDocument.on('click', e => {
            console.log('documents')
        });

        this.el.btnAttachContact.on('click', e => {
            console.log('contact')
        });
    }

    closeMenuAttach(e){
        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open')
    }

    closeAllLeftPanels(){
        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();
    }
}