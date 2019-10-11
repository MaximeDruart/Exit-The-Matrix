const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


function scrollToBottom() {
  document.querySelector(".terminal").scrollTop = 20000;
  document.querySelector(".neoChat .textLines").scrollTop = 20000;
}

// &$-£_#ç§µ¤@

function glitchText(domElement, speed = 1, glyphs = "&$#0952") {
  glyphs = _.shuffle(glyphs)
  let timeline = new TimelineMax({
    paused: true
  })
  let string=""
  let finalString = domElement.innerText
  timeline.timeScale(speed)
  domElement.innerText=""
  for (let i = 0; i < finalString.length; i++) {
    let firstrun = true
    let lastGlyph = "",
      newGlyph = ""
    glyphs.forEach(() => {
      do {
        newGlyph = glyphs[Math.floor(Math.random() * glyphs.length)]
      } while (newGlyph == lastGlyph);
      firstrun
        ?
        (string = string.replaceAt(string.length, newGlyph), firstrun = false) :
        string = string.replaceAt(string.length - 1, newGlyph)
      timeline.set(domElement, {innerText:string, onComplete:scrollToBottom}, "+=0.05")
      lastGlyph = newGlyph
    });
    string = string.replaceAt(string.length-1, finalString[i])
    timeline.set(domElement, {innerText:string, onComplete:scrollToBottom}, "+=0.05")
  }
  return timeline
}


