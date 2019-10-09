/*
const canvas = document.querySelector('.matrix-canvas')
const ctx = canvas.getContext('2d')

const fontSize = 25
const textColor = '#0F0'
const characters = 'いちイチわたしワタシ金きんぎょキンギたこタバコげいしゃゲイシャ'
let columns
let rows
let letter
let drops = []


initCanvas()

function initCanvas(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    columns = Math.round(canvas.width / fontSize)

    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)

    for(let x = 0; x < columns; x++)
        drops[x] = 1;

        console.log(drops)
    drawCanvas()
}

function drawCanvas(){
    console.log('ok')
    for(let i = 0; i < drops.length; i++)
    {
        //translucent BG to show trail
	    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        letter = characters.charAt(Math.floor(Math.random()*characters.length-1))
        console.log(letter)

        //Définit le style de la font
        ctx.fillStyle = textColor
        ctx.font = `${fontSize}px Arial`

        ctx.fillText(letter, i*fontSize, drops[i]*fontSize);
        
        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975)
			drops[i] = 0;
		
		//incrementing Y coordinate
		drops[i]++;
    }
}

window.onresize = function() {
    initCanvas()
}

setInterval(drawCanvas(), 10000);
*/

const font_size = 20
const textColor = '#38AE3F'
var c = document.querySelector('.matrix-canvas')
var ctx = c.getContext("2d")

//making the canvas full screen
c.height = window.innerHeight
c.width = window.innerWidth

//chinese characters - taken from the unicode charset
var chinese = 'いちイチわたしワタシ金きんぎょキンギたこタバコげいしゃゲイシャ'
//converting the string into an array of single characters
chinese = chinese.split("")

var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = []
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
	drops[x] = 1
//drawing the characters
function draw()
{
	//Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
	ctx.fillRect(0, 0, c.width, c.height)
	
	ctx.fillStyle = textColor //green text
	ctx.font = font_size + "px arial";
	//looping over drops
	for(var i = 0; i < drops.length; i++)
	{  
		//a random chinese character to print
		var text = chinese[Math.floor(Math.random()*chinese.length)]
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i]*font_size)
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > c.height && Math.random() > 0.975)
			drops[i] = 0
		
		//incrementing Y coordinate
		drops[i]++
	}
}

setInterval(draw, 40)



