const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

let glitchEx=""
// let glitch = glitchText($(".headline-wrapper h1"), 2)

// window.onload = glitch.play()

function glitchExtraInit(dom) {
  glitchEx = glitchExtras(dom)
  glitchEx.restart()
}

function scrollToBottom() {
  document.querySelector(".terminal").scrollTop = 20000;
  document.querySelector(".neoChat .textLines").scrollTop = 20000;
}

// &$-£_#ç§µ¤@

function glitchText(domElement, speed = 1, extras = false, glyphs = "&$#0952") {
  glyphs = _.shuffle(glyphs)
  let timeline = extras ?
  new TimelineMax({
    paused:true,
    onComplete: glitchExtraInit,
    onCompleteParams : [domElement]
  })
  : new TimelineMax({
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

function spanify(dom) {
  let text = dom.innerText
  dom.innerText=""
  for (const letter of text) {
    let span = document.createElement("span")
    span.innerText=letter
    dom.appendChild(span)
  }
}

function glitchExtras(dom) {
  spanify(dom)
  let random = ""
  let dom_arr=[]
  this.getRan = () => {
    dom_arr = []
    random = Math.floor(Math.random() * dom.children.length-2)
    random < 0 ? random=0 : ""
    for (let i = 0; i < 3; i++) {dom_arr.push(dom.children[random + i])}
  }
  this.getRan()
  let tl = new TimelineMax({
    paused:true,
    onStart: this.getRan,
    repeat:-1,
    repeatDelay:5,
    yoyo:true,
  })

  tl.set(dom, {fontStyle:"italic"}, "+=0.6")
  tl.set(dom, {fontStyle:"initial"}, "+=0.1")
  tl.set(dom_arr, {backgroundColor:"black", color:"white"}, "+=0.1")
  tl.set(dom_arr, {backgroundColor:"none", color:"black"}, "+=0.2")
  tl.set(dom_arr, {backgroundColor:"black", color:"white"}, "+=0.1")
  tl.set(dom_arr, {backgroundColor:"none", color:"black"}, "+=0.2")
  tl.set([dom.children[2],dom.children[3],dom.children[4],dom.children[5], dom.children[6]], {textDecoration:"line-through"})
  tl.set([dom.children[2],dom.children[3],dom.children[4],dom.children[5], dom.children[6]], {textDecoration:"initial"}, "+=0.2")
  tl.set(dom, {fontStyle:"italic"}, "-=0.3")
  tl.set(dom, {fontStyle:"initial"}, "-=0.1")

  return tl
}

