
class NavView {

    _navBox = document.querySelector(".nav__box");
    _navButtons = document.querySelectorAll(".nav__button");

    constructor(navId) {
        this._navId = navId;
        this._selectById(String(this._navId));
    }

    addHandlerNavHover() {
        this._navBox.addEventListener('mouseover', this._handleNavHover.bind(this));
        this._navBox.addEventListener('mouseout', this._handleNavHover.bind(this));
    }

    _selectById(id) {
        this._navButtons.forEach(button => {
            if (id !== button.id)
                button.style.opacity = "0.5";
            else
                button.style.opacity = "1.0";
        })
    }

    _handleNavHover(e) {
        const navItem = e.target.closest(".nav__button");
        if (!navItem?.classList.contains('nav__button'))
            return;

        if (e.type === 'mouseover')
            this._selectById(navItem.id);
        else
            this._selectById(String(this._navId));
    }
}

export default NavView;