let openOverlay = {
    width : 84,
    height : 22,
    domTab : [],
    domTabBox : [],
    buttonsDomTab : [],
    stopInterval : false,
    matrixMatrice : [   
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    ],

    buttonsMatrice : [
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                        1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,
                        1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,
                        1,1,2,1,1,"S","a","u","v","e","r",1,1,"N","e","o",1,1,2,1,1,
                        1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,
                        1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                    ],

    creation : function(){
        let container = document.querySelector(".container_openOverlay")
        let buttonsContainer = document.querySelector(".container_openOverlay_buttons")
        for(let i = 0 ; i < openOverlay.width ; i++){
            let div = document.createElement('div')
            div.setAttribute('class','first')
            container.appendChild(div)
            let tab = []
            openOverlay.domTab.push(tab)
            for (let j = 0; j < openOverlay.height; j++) {
                let span = document.createElement('span')
                span.setAttribute('class','first')
                div.appendChild(span)
                openOverlay.domTab[i].push(span)
                openOverlay.domTabBox.push(span)
            }
        }

        for(let i = 0 ; i < 147 ; i++){
            let span = document.createElement('span')
            span.setAttribute('class','second')
            buttonsContainer.appendChild(span)
            openOverlay.buttonsDomTab.push(span)
        }
        console.log(openOverlay.buttonsDomTab)
    },

    matrixTitleAnimation : function(){
        let matrixSpanTab = []
        for (let i = 0; i < openOverlay.matrixMatrice.length; i++) {
            for (let j = 0; j < openOverlay.matrixMatrice[i].length; j++) {
                if(openOverlay.matrixMatrice[i][j] == 1){
                    matrixSpanTab.push(openOverlay.domTab[i][j])
                }
            }
            
        }

        setTimeout(function(){
            let x = 0
            let matrixDisplay = window.setInterval(function(){
                if(x < matrixSpanTab.length){
                    matrixSpanTab[x].style.opacity = 1
                x++
                }
                else{
                    clearInterval(matrixDisplay)
                    setTimeout(function(){
                        openOverlay.rainAnimation(1)
                    },1000)
                }
            },1)
        },500)

    },

    buttonsAnimation : function(){
        let hiddenCellsTab = []
        let binaryCellsTab = []
        let letterCellsTab = []
        let letterTab = []
        for (let i = 0; i < openOverlay.buttonsMatrice.length; i++) {
            if(openOverlay.buttonsMatrice[i] == 0){
            }
            else if(openOverlay.buttonsMatrice[i] == 1){
                hiddenCellsTab.push(openOverlay.buttonsDomTab[i])
            }
            else if(openOverlay.buttonsMatrice[i] == 2){
                binaryCellsTab.push(openOverlay.buttonsDomTab[i])
            }
            else{
                letterCellsTab.push(openOverlay.buttonsDomTab[i])
                letterTab.push(openOverlay.buttonsMatrice[i])
            }
        }
        console.log(hiddenCellsTab,binaryCellsTab,letterCellsTab,letterTab)

        let x = 0
        let hiddenCellsTabDisplay = window.setInterval(function(){
            if(x < hiddenCellsTab.length){           
                hiddenCellsTab[x].style.opacity = 1
                x++
            }
            else{
                clearInterval(hiddenCellsTabDisplay)
            }
        },10)

        let y = 0
        let binaryCellsTabDisplay = window.setInterval(function(){
            if(y < binaryCellsTab.length){           
                binaryCellsTab[y].style.opacity = 1
                binaryCellsTab[y].innerHTML = 0
                y++
            }
            else{
                clearInterval(binaryCellsTabDisplay)
            }
        },10)
        let randomBinaryChangeInterval = window.setInterval(function(){
            if(openOverlay.stopInterval == true){
                clearInterval(randomBinaryChangeInterval)
            }
            else{
                binaryCellsTab.forEach(function(e){
                    e.innerHTML = Math.floor(Math.random()*2)
                })
            }
        },10)

        setTimeout(function(){
            let z = 0
        let letterCellsTabDisplay = window.setInterval(function(){
            if(z < letterCellsTab.length){           
                letterCellsTab[z].style.opacity = 1
                letterCellsTab[z].innerHTML = letterTab[z]
                z++
            }
            else{
                clearInterval(letterCellsTabDisplay)
            }
        },50)
        },2000)

        document.querySelector(".container_openOverlay_buttons").addEventListener('click', function(){
            openOverlay.rainAnimation(0)
            TweenMax.to(document.querySelector(".container_openOverlay_buttons"),0,{opacity:0})
        })

    },

    refreshDomTabBox : function(){
        openOverlay.stopInterval = true
        for(let i = 0 ; i < openOverlay.width ; i++){
            let tab = []
            openOverlay.domTabBoxNew.push(tab)
            for (let j = 0; j < openOverlay.height; j++) {
                if(i != 1){
                    openOverlay.domTabBoxNew.push(openOverlay.domTab[i][j])
                }
            }
        }
       
    },

    randomBinaryChange : function(targetTab){
        let randomBinaryChangeInterval = window.setInterval(function(){
            if(openOverlay.stopInterval == true){
                clearInterval(randomBinaryChangeInterval)
            }
            if(targetTab.innerHTML == "1"){
                targetTab.innerHTML = "0"
            }
            else{
                targetTab.innerHTML = "1"
            }
        },10)

    },

    openAnimation : function(){
        TweenMax.staggerTo(openOverlay.domTabBox, 1, {
            opacity: 0,
            ease: Power1.easeInOut,
            stagger: {
              grid: [150,50],
              from: "center",
              amount: 3
            }
          })
    },

    rainAnimation : function(opacity){

        let randColumn
        let randColumnHistoric = []
        let randColumnTest
        let randRow 
        let finalOpacity = opacity
        let randomRain = window.setInterval(function(){

            do{
                randColumn = Math.floor(Math.random()*(openOverlay.width+1))
                randColumnTest = 0
                for (let i = 0; i < randColumnHistoric.length; i++) {
                    if(randColumn == randColumnHistoric[i]){
                        randColumnTest++
                    }
                }
            }while(randColumnTest > 0)
            randColumnHistoric.push(randColumn)

            randRow = Math.floor(Math.random()*(openOverlay.height+1))

            TweenMax.staggerTo(openOverlay.domTab[randColumn], 0.5, {
                opacity: finalOpacity,
                // textShadow: "0 0 10px #00FF00",
                ease: Power1.easeInOut,
                stagger: {
                  from: randRow,
                  amount: 3
                }
            })

            if(randColumnHistoric.length > openOverlay.width){
                clearInterval(randomRain)
                setTimeout(function(){
                    // openOverlay.stopInterval = true
                    openOverlay.buttonsAnimation()
                },2000)
            }

        },10)
    },

    hoverAnimation : function(){
        console.log(openOverlay.domTabBox)

        openOverlay.domTabBox.forEach(function(e){
            e.addEventListener('mouseover', function(){
                TweenMax.to(e, 0, {opacity: 1})
                setTimeout(function(){
                    TweenMax.to(e, 1.5, {opacity: 0})
                },10)
            })
        })
    },

    randNumberChange : function(target){
        let numberTab = [0,1,2,3,4,5,6,7,8,9]
        let randomBinaryChangeInterval = window.setInterval(function(){
            if(openOverlay.stopInterval == false){
                target.forEach(function(e){
                    e.innerHTML = numberTab[Math.floor(Math.random()*numberTab.length)]
                })
            }
            else{
                clearInterval(randomBinaryChangeInterval)
            }
        },50)
    },

    buttonsCreation : function(){
        let middleColumn = Math.floor(this.width/2)-1
        openOverlay.domTab[middleColumn].forEach(function(e){
            e.style.opacity = 0
        })
        console.log(openOverlay.height)
    },
    
}
openOverlay.creation()
// openOverlay.buttonsAnimation()
openOverlay.matrixTitleAnimation()
// openOverlay.rainAnimation()
// openOverlay.hoverAnimation()
// openOverlay.randomBinaryChange()
openOverlay.randNumberChange(openOverlay.domTabBox)
// openOverlay.openAnimation()
// openOverlay.buttonsCreation()
