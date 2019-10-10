/* MATRIX FALL SCIPT */
//Script modifed from https://codepen.io/stathisnikolaidis/pen/AejEf

//Font's size
const font_size = 20
//Text
const textColor = '#09550B'
//Select canvas
const canvas = document.querySelector('.matrix-canvas')
const ctx = canvas.getContext("2d")

//Making the canvas full screen
canvas.height = window.innerHeight
canvas.width = window.innerWidth

//Character string list 
const characters = 'いちイチわたしワタシ金きんぎょキンギたこタバコげいしゃゲイシャ'

const columns = canvas.width/font_size; //number of columns for the rain

//Array of drops - one per column
let drops = []

//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(let x = 0; x < columns; x++)
	drops[x] = 1

//drawing the characters
function draw()
{
	//Filling the canvas with a black background to hidde the last printed letters
	ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	
	//Changing the style and size of the text which will be printed
	ctx.fillStyle = textColor 
	ctx.font = font_size + 'px arial';

	//looping over drops
	for(let i = 0; i < drops.length; i++)
	{  
		//Chosing randomly a letter from the string 
		let text = characters.charAt(Math.floor(Math.random()*characters.length-1))

		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i]*font_size)
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > canvas.height && Math.random() > 0.975)
			drops[i] = 0
		
		//Incrementing Y coordinates (drop[i])
		drops[i]++
	}
}

setInterval(draw, 40)



