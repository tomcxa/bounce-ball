/* eslint-disable class-methods-use-this */
export default class Modal {
    constructor(container, message, buttonHandler) {
        this.container = container;
        this.message = message;
        this.handler = buttonHandler.bind(this);
    }

    template() {
        const html = `
            <div class="modal">
                <p>${this.message}</p>
                <button class="btn">Try again!</button>
            </div>
        `;
        return html;
    }

    bindToDOM() {
        this.container.insertAdjacentHTML('afterbegin', this.template());
    }

    render() {
        this.bindToDOM();
        const modal = this.container.querySelector('.modal');
        modal.addEventListener('click', ({ target }) => {
            if (target.classList.contains('btn')) {
                this.handler();
            }
        });
    }

    remove() {
        const modal = this.container.querySelector('.modal');
        modal.remove();
    }
}
