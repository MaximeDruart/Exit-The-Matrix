let i = 0, text
text = "Anonymous programmer in an administrative department during the day, Thomas Anderson becomes Neo at night. Under this pseudonym, he is one of the most wanted hackers in cyberspace. Straddling between two worlds, Neo is beset by strange dreams and encrypted messages from a certain Morpheus. He exhorted him to go beyond appearances and find the answer to the question that constantly haunts his thoughts: what is the Matrix ?"

function typing(){
    
    if(i < text.length){
        document.querySelector(".text__typing").innerHTML += text.charAt(i)
        i++
        setTimeout(typing,10)
    }
}

typing()