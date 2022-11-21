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
        })

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        })

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        })
    }

    closeAllLeftPanels(){
        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();
    }
}