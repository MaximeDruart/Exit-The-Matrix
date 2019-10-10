let openOverlay = {
    width : 84,
    height : 22,
    domTab : [],
    domTabBox : [],
    buttonsDomTabA : [],
    buttonsDomTabB : [],
    stopInterval : false,
    stopBinaryInterval : false,
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
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
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
    buttonsMatriceA : [
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                        1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,
                        1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,
                        1,1,2,1,1,"S","a","u","v","e","r",1,1,"N","e","o",1,1,2,1,1,
                        1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,
                        1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                    ],
    buttonsMatriceB : [
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                        1,1,"A","c","c","é","d","e","r",1,"a","u",1,"s","i","t","e",1,1,
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                        
                    ],

    // Creation of all the DOM

    domCreation : function(){

        // The matrix background DOM

        let containerIntro = document.querySelector(".containerIntro_openOverlay")
        let buttonsContainerIntroA = document.querySelector(".containerIntro_openOverlay_buttonsA")
        let buttonsContainerIntroB = document.querySelector(".containerIntro_openOverlay_buttonsB")
        for(let i = 0 ; i < openOverlay.width ; i++){
            let div = document.createElement('div')
            div.setAttribute('class','first')
            containerIntro.appendChild(div)
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

        // The first button DOM

        for(let i = 0 ; i < 147 ; i++){
            let span = document.createElement('span')
            span.setAttribute('class','second')
            buttonsContainerIntroA.appendChild(span)
            openOverlay.buttonsDomTabA.push(span)
        }

        // The second button DOM
        
        for(let i = 0 ; i < 57 ; i++){
            let span = document.createElement('span')
            span.setAttribute('class','third')
            buttonsContainerIntroB.appendChild(span)
            openOverlay.buttonsDomTabB.push(span)
        }
    },

    matrixTitleAnimation : function(){

        // Pushing all of the DOM spans that contruct the word "MATRIX" in an other tab

        let matrixSpanTab = []
        for (let i = 0; i < openOverlay.matrixMatrice.length; i++) {
            for (let j = 0; j < openOverlay.matrixMatrice[i].length; j++) {
                if(openOverlay.matrixMatrice[i][j] == 1){
                    matrixSpanTab.push(openOverlay.domTab[i][j])
                }
            }
            
        }

        // Displaying the word "MATRIX" span by span with an interval

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

        // Tabs of each kind of characters that construct the buttons

        let hiddenCellsTab = []
        let binaryCellsTab = []
        let letterCellsTab = []

        // Tab of the contents of the spans that are letters

        let letterTab = []

        // Filling the tabs with the help of the matrix A : "buttonsMatriceA"

        for (let i = 0; i < openOverlay.buttonsMatriceA.length; i++) {
            if(openOverlay.buttonsMatriceA[i] == 1){
                hiddenCellsTab.push(openOverlay.buttonsDomTabA[i])
            }
            else if(openOverlay.buttonsMatriceA[i] == 2){
                binaryCellsTab.push(openOverlay.buttonsDomTabA[i])
            }
            else{
                letterCellsTab.push(openOverlay.buttonsDomTabA[i])
                letterTab.push(openOverlay.buttonsMatriceA[i])
            }
        }

        // Filling the tabs with the help of the matrix B : "buttonsMatriceB"

        for (let i = 0; i < openOverlay.buttonsMatriceB.length; i++) {
            if(openOverlay.buttonsMatriceB[i] == 1){
                hiddenCellsTab.push(openOverlay.buttonsDomTabB[i])
            }
            else{
                letterCellsTab.push(openOverlay.buttonsDomTabB[i])
                letterTab.push(openOverlay.buttonsMatriceB[i])
            }
        }

        // Displaying the two buttons span by span (and for each king of characters)

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

        // Setting of the random binary characters change for the first button

        let randomBinaryChangeInterval = window.setInterval(function(){
            if(openOverlay.stopBinaryInterval == true){
                clearInterval(randomBinaryChangeInterval)
            }
            else{
                binaryCellsTab.forEach(function(e){
                    e.innerHTML = Math.floor(Math.random()*2)
                })
            }
        },10)

        // Displaying the text in the two buttons with a little delay

        setTimeout(function(){
            let z = 0
            let letterCellsTabDisplay = window.setInterval(function(){
                if(z < letterCellsTab.length){           
                    letterCellsTab[z].style.opacity = 1
                    letterCellsTab[z].innerHTML = letterTab[z]
                    z++
                }
                else{
                    
                    // Allowing click and the two buttons after their displaying

                    document.querySelector(".containerIntro_openOverlay_buttonsA").style.pointerEvents = "auto"
                    document.querySelector(".containerIntro_openOverlay_buttonsB").style.pointerEvents = "auto"
                    clearInterval(letterCellsTabDisplay)
                }
            },50)
        },3200)

        // Setting the click event of the first button (which lead to the end of the introduction and the beginning of the game)

        document.querySelector(".containerIntro_openOverlay_buttonsA").addEventListener('click', function(){

            // Make the background matrix disappear

            openOverlay.rainAnimation(0)

            // Make disappear span by span the two buttons (for each kind of character)
            
            let a = 0
            let hiddenCellsTabRemove = window.setInterval(function(){
                if(a < hiddenCellsTab.length){
                    hiddenCellsTab[a].style.opacity = 0
                    a++
                }
                else{
                    clearInterval(hiddenCellsTabRemove)
                }
            },10)

            let b = 0
            let binaryCellsTabRemove = window.setInterval(function(){
                if(b < binaryCellsTab.length){           
                    binaryCellsTab[b].style.opacity = 0
                    b++
                }
                else{
                    openOverlay.stopBinaryInterval = true
                    clearInterval(binaryCellsTabRemove)
                }
            },10)

            let c = 0
            let letterCellsTabRemove = window.setInterval(function(){
                if(c < letterCellsTab.length){           
                    letterCellsTab[c].style.opacity = 0
                    c++
                }
                else{
                    clearInterval(letterCellsTabRemove)
                }
            },10)
        })
    },

    // This rain animation is not the same that in the movie "The Matrix" but it is an effect in the same graphic style

    rainAnimation : function(opacity){ // opacity --> make the matrix disappear for 0 and appear for 1

        let randColumn
        let randColumnHistoric = []
        let randColumnTest
        let randRow 
        let finalOpacity = opacity

        // Setting the interval that make the rain appear randomly on the x axis and the y axis

        let randomRain = window.setInterval(function(){

            // Avoiding that the rain start more than one time on the same column

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

            // Start at a random row

            randRow = Math.floor(Math.random()*(openOverlay.height+1))

            // Using GSAP TweenMax Stagger to do the smooth opacity animation on the whole line with an effect of spread

            TweenMax.staggerTo(openOverlay.domTab[randColumn], 0.5, {
                opacity: finalOpacity,
                ease: Power1.easeInOut,
                stagger: {
                  from: randRow,
                  amount: 3
                }
            })

            // Displaying the buttons when the rain animation is done

            if(randColumnHistoric.length > openOverlay.width){
                clearInterval(randomRain)
                if(opacity == 1){
                    setTimeout(function(){
                        openOverlay.buttonsAnimation()
                    },2200)
                }

                // The case when we make disappear the matrix background --> we don't want to display the buttons

                else if(opacity == 0){
                    setTimeout(function(){
                        openOverlay.stopInterval = true
                    },5000)
                }
            }
        },10)
    },

    // Hover animation on the matrix (which is not used)

    hoverAnimation : function(){
        openOverlay.domTabBox.forEach(function(e){
            e.addEventListener('mouseover', function(){
                TweenMax.to(e, 0, {opacity: 1})
                setTimeout(function(){
                    TweenMax.to(e, 1.5, {opacity: 0})
                },10)
            })
        })
    },

    // Function that change the characters randomly on the matrix background

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
}
openOverlay.domCreation()
openOverlay.matrixTitleAnimation()
openOverlay.randNumberChange(openOverlay.domTabBox)
