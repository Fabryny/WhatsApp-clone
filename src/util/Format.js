class Format {
    static getCamelCase(txt){
        let div = document.createElement('div');
        div.innerHTML = `<div data-${txt}="id"></div`;
        return Object.keys(div.firstChild.dataset)[0]
        /* Cria atributos para cada div com ID no HTML */
    }
}