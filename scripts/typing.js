let i = 0, text
text = "Matrix est un film qui aura lorem ipsoum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec est vitae odio ullamcorper malesuada. Cras cursus cursus hendrerit. Donec tristique ex quam. Quisque varius lectus, assa non eros laoreet, sed vestibulum nisl tincidunt. In porta sagittis erat, euaugue egestas id. Etiam eros magna, vehicula sit amet eros ut, convallis mattis tellus. Praesent porttitor odio nisi, non finibus velit molestie ac. Ut facilisis ullamcorper neque, a dignissim leo."
console.log(text)

function typing(){
    
    if(i < text.length){
        document.querySelector(".text__typing").innerHTML += text.charAt(i)
        i++
        setTimeout(typing,10)
    }
}

typing()