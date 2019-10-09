const canvas = document.querySelector('.matrix-container')
const ctx = canvas.getContext('2d')

const fontSize = 25
const textColor = '#195C1D'
const characters = 'いちイチわたしワタシ金きんぎょキンギたこタバコげいしゃゲイシャ'
let columns
let rows
let letter

function initCanvas(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    columns = Math.round(canvas.width / fontSize)
    rows = Math.round(canvas.height / fontSize)
}

initCanvas()

window.onresize = function() {
    initCanvas()
}

//for (let i = 0; i < rows;i++) {
    letter = characters.charAt(Math.floor(Math.random()*characters.length-1))
    console.log(letter)
    ctx.font = fontSize,"px Arial";
    ctx.fillText("Hello World", 10, 50);
     
//}