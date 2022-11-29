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
            this.el.inputPhoto.click();
        });

        this.el.inputPhoto.on('change', e =>{
            console.log(this.el.inputPhoto.files);
            [...this.el.inputPhoto.files].forEach(file => {
                console.log(file)
            })
        });

        this.el.btnAttachCamera.on('click', e => {
            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height': 'calc(100% - 100px)'
            });
        });

        this.el.btnClosePanelCamera.on('click', e => {
            this.el.panelCamera.removeClass('open');
            this.el.panelMessagesContainer.show();
        });

        this.el.btnTakePicture.on('click', e => {
        console.log('tirando foto')
        });

        this.el.btnAttachDocument.on('click', e => {
            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open')
            this.el.panelDocumentPreview.css({
                'height': 'calc(100% - 100px)'
            });
        });

        this.el.btnClosePanelDocumentPreview.on('click', e => {
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
        });

        this.el.btnSendDocument.on('click', e => {
            console.log('send document')
        });

        this.el.btnAttachContact.on('click', e => {
            this.el.modalContacts.show();
        });

        this.el.btnCloseModalContacts.on('click', e => {
            this.el.modalContacts.hide();
        });
        this.el.btnSendMicrophone.on('click', e=> {
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTimer();

        });

        this.el.btnCancelMicrophone.on('click', e=> {
            this.closeRecordMicrophone();
        });

        this.el.btnFinishMicrophone.on('click', e=> {
            this.closeRecordMicrophone();
        });
        
        this.el.inputText.on('keypress', e=> {
        if (e.key === 'Enter' && !e.crtKey) {
                e.preventDefault();
                this.btnSend.click();
            }
        })

        this.el.inputText.on('keyup', e=> {
            if(this.el.inputText.innerHTML.length){
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            } else {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }
        });

        this.el.btnSend.on('click', e=> {
            console.log(this.el.inputText.innerHTML)
        });

        this.el.btnEmojis.on('click', e=> {
            this.el.panelEmojis.toggleClass('open')
        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji =>{
            emoji.on('click', e=> {
                console.log(emoji)

                let img = this.el.imgEmojiDefault.cloneNode();
                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name => {
                    img.classList.add(name)
                });

                let cursor = window.getSelection();

                if(!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                let range = document.createRange();

                range = cursor.getRangeAt(0);/* pega do inicio da seleção */
                range.deleteContents();

                let frag = document.createDocumentFragment();
                frag.appendChild(img);
                range.insertNode(frag);

                range.setStartAfter(img);

                this.el.inputText.dispatchEvent(new Event('keyup'))
            });
        })

    }

    startRecordMicrophoneTimer(){
        let start = Date.now();

        this._recordMicropgoneInterval = setInterval(() => {
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime((Date.now() - start))
        }, 100);
    }

    closeRecordMicrophone(){
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicropgoneInterval)
    }

    closeAllMainPanel(){
        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');
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