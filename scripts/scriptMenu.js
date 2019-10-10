const menuDiv = document.querySelector('.menuDiv')
const buttonOpenMenu = document.querySelector('.header--ButtonMenu')
let menuDisplayed = false;

buttonOpenMenu.addEventListener('click', function(){
    if (menuDisplayed) {
        
        menuDiv.classList.remove('displayMenu')
        menuDisplayed = false

    } else {
        

        menuDiv.classList.add('displayMenu')
        menuDisplayed = true
    }
})

