const menu = document.querySelector('.menuDiv')
const buttonOpenMenu = document.querySelector('.header--ButtonMenu')
let menuDisplayed = false;

buttonOpenMenu.addEventListener('click', function(){
    if (menuDisplayed) {
        
        menu.classList.remove('displayMenu')
        menuDisplayed = false

    } else {
        

        menu.classList.add('displayMenu')
        menuDisplayed = true
    }
})

