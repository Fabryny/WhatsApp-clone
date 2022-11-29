export default class Format {
    static getCamelCase(txt){
        let div = document.createElement('div');
        div.innerHTML = `<div data-${txt}="id"></div`;
        return Object.keys(div.firstChild.dataset)[0]
        /* Cria atributos para cada div com ID no HTML */
    }
    
    static toTime(duration) {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            return  `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;/* 0 a esquerda caso seja menor que 10 */
        } else {
            return  `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}