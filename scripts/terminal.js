class Terminal {
    constructor() {
        this.containerDOM = document.querySelector(".terminal")
        this.mapDOM = document.querySelector(".map")
        this.mapCamsDOM = document.querySelectorAll(".map .cctv")
        this.mapExitsDOM = document.querySelectorAll(".map exit")

        this.camsDOM = document.querySelector(".cams")
        this.camsvideoDOM = document.querySelector(".cams video")
        this.neoComDOM = document.querySelector(".neoCom")
        this.neoChatDOM = document.querySelector(".neoChat")
        this.activeInput = document.querySelector(".terminal input")
        this.activeCaret = document.querySelector(".terminal .caret")

        this.phonesCalling = {
          "[h3]" : false,
          "[d6]" : false,
          "[g9]" : false,
          "[b4]" : false
        }
        this.audios = {
            "heyTank": {
                src : "sounds/heyTank.mp3",
                transcript: "Hey tank, I need your help ! Get me out of the matrix now ! I think the agents are onto me ! I need you to find me a phone booth to get out asap."
            },
            "help1": {
                src : "sounds/help1.mp3",
                transcript: "Tank, hurry up !"
            },
            "help2": {
                src : "sounds/help2.mp3",
                transcript: "Please Tank, I need your help now !"
            },
            "agent": {
                src : "sounds/agent.mp3",
                transcript: "I think there's an agent on this way"
            },
            "brokenPhone": {
                src : "sounds/brokenPhone.mp3",
                transcript: "There's a problem with the booth ! I need an other one !"
            },
            "dontUnderstand": {
                src : "sounds/dontUnderstand.mp3",
                transcript: "I don’t understand ..."
            },
            "iGotIt": {
                src : "sounds/iGotIt.mp3",
                transcript: "I got it !"
            },
            "canYouCall": {
                src : "sounds/canYouCall.mp3",
                transcript: "Can you call ? I'm right there !"
            },
            "camOff": {
                src : "sounds/cameraOffSound.mp3",
                transcript : null
            },
        }
        this.voiceLinesTranscript = [
          "Hey tank , i need your help ! get me out of the matrix, and now, i think the agents are on me ! I need you to find me a phone booth to get out asap.",
          "Tank, hurry up !",
          "Please Tank, I need your help now !",
          "I think there's an agent on this way",
          "There's a problem with the booth ! I need an other one !",
          "I don’t understand ...",
          "I got it !",
          "Can you call ? I'm right there !"
        
        ]
        
        this.winPosition = false
        this.isLost = false
        this.neoPosition="f6" // or b4
        this.textDisplayDone = false
        this.isMapOpen = false
        this.isCamOpen = false
        this.linesCount = 0
        this.firstInput = true
        this.commands = ["help", "send", "disconnect", "localize", "display", "call", "info", "clear", "replay", "time", "setColor", "uwu"]
        this.lastCommand = ""
        this.textColor = "#5DFC86"
        this.time1 = ""
        this.time2 = ""

        this.caretBlink()
        this.setInputListener()
        this.setFocus()

        document.addEventListener('keydown', e => {
            if (e.code === "Enter" && this.activeInput.value !== "") {
                this.respondToInput(this.activeInput.value)
            } else if (e.code === "Tab") e.preventDefault()
        })

    }

    timeCheckSup10() {
        let delaySec = 12
        this.time1 = new Date()
        setInterval(() => {
            this.time2 = new Date()
            if (Math.round((this.time2 - this.time1) / 1000) > delaySec) {
                this.playAudio(this.audios["help2"].src)
                this.neoChatWrite(this.audios["help2"].transcript)
                this.time1 = new Date()
                delaySec *=3 // on augmente un peu
            }
        }, 1000);
    }

    txtDisplayReady(){
        this.textDisplayDone = true
    }

    setInputListener() {
        this.activeInput.addEventListener('input', () => {
            this.activeInput.size = this.activeInput.value.length || 1
        })
    }

    clearCarets() {
        let carets = document.querySelectorAll(".caret")
        carets.forEach(caret => {
            if (caret !== this.activeCaret) caret.parentElement.removeChild(caret)
        })
    }

    caretBlink() {
        // 4 mesures visibles pour 1 visible
        let c = 0
        setInterval(() => {
            c = c == 4 ? 0 : c + 1
            this.activeCaret.style.opacity = c == 4 ? 0 : 1
        }, 400);

    }

    neoBlink(){
        // 8 mesures visibles pour 1 visible
        let c = 0
        setInterval(() => {
            c = c == 8 ? 0 : c + 1
            c == 8 ? document.querySelector(".map .neoPos").classList.add("hiddenOp") : document.querySelector(".map .neoPos").classList.remove("hiddenOp")
        }, 400);
    }

    setFocus() {
        this.activeInput.focus()
    }

    createNewLine() {
        let line = document.createElement("div")
        line.classList.add("inputLine")

        let input = document.createElement("input")
        input.setAttribute("size", "1")
        input.setAttribute("maxlength", "40")
        input.setAttribute("type", "text")
        input.setAttribute("spellcheck", "false")

        let prefix = document.createElement("span")
        prefix.classList.add("prefix")
        prefix.innerHTML = "[MATRIX]"

        let caret = document.createElement("div")
        caret.classList.add("caret")
        caret.innerHTML = "&#9646;"

        line.appendChild(prefix)
        line.appendChild(input)
        line.appendChild(caret)
        this.containerDOM.appendChild(line)
        this.activeInput = input
        this.activeCaret = caret

        this.setInputListener()
        this.setFocus()
        this.clearCarets()
    }

    respondToInput(val) {
        this.timeCheckSup10() // on reset la relance toutes les 10 secondes
        if (this.firstInput) this.scenarStart(), this.firstInput = false
        // String.indexOf("substring") >= 0
        let noSlashVal = val[0] == "/" ? val.slice(1) : val
        if (val.indexOf(" ") >= 0) {
            this.respondToInputParam(val) // contient un espace -> surement un truc avec une variable
        } else {
            switch (val) {
                // ["help", "send", "disconnect", "localize", "display", "call", "info", "clear", "replay", "time", "setColor", "uwu"]
                case "/help":
                    this.write(
                        `/SEND "message" : send message to your active caller
                        /SEND_LOCATION ["letter""number"] : send location to your active caller
                        /LOCALIZE "name" : displays the localisation of the person on the map
                        /DISPLAY "item" : displays specified item on the screen (map or cam)
                        /HIDE "item" : hides specified item (map or cam)
                        /ACCESS_CAM ["letter""number"] : displays specified camera using coordinates
                        /PING ["letter""number"] : returns ping for specified phone booth, to know if it is working
                        /CALL ["letter""number"] : emits a call for a specified phone booth at a specified location
                        /CLEAR : clears console
                        /TIME : returns time and date
                        /INFO "info" : returns info on specified item
                        /SETCOLOR "hex color" : changes interface color
                        /UWU : Authorized access only
                    `)
                    break;


                case "/info":
                    this.write("info")
                    break;

                case "/send":
                    this.write("Please specify a text to send.")
                    break;

                case "/localize":
                    this.write("Please specify a location.")
                    break;

                case "/hide":
                case "/display":
                    this.write("Please specify an item.")
                    break;

                case "/send_location":
                    this.write("Please specitfy a location.")
                    break;

                case "/clear":
                    this.clear()
                    break;

                case "/time":
                    this.write("It is now : 13H37")
                    this.write("28/10/2199")
                    break;

                case "/uwu":
                    this.write("Hello Tank-kun (✿◕‿◕)")
                    break;

                case "/wakeupneo":
                case "wake up neo":
                    this.write("The matrix has you.")
                    this.write("Follow the white rabbit.")
                    break;


                default:
                    this.write("'" + noSlashVal + "'" + " is an unknown command. Press /help for more informations.")
                    break;
            }
        }

        this.createNewLine()
    }

    respondToInputParam(val) {
        val = val.toLowerCase()
        let noSlashVal = val[0] == "/" ? val.slice(1) : val
        let spaceIndex = val.indexOf(" ")
        let keyword = val.slice(0, spaceIndex)
        let param = val.slice(spaceIndex + 1)
        let noBrackParam = param.slice(1,3)
        switch (keyword) {

            case "/send_location":
                // on envoie neo vers cet endroit
                switch (param) {
                    case "[h3]":
                        // broken phone
                        this.moveNeoTo(param)
                        this.neoPosition = "h3"
                        setTimeout(() => {                            
                            this.playAudio(this.audios["brokenPhone"].src)
                            this.neoChatWrite(this.audios["brokenPhone"].transcript)
                            TweenMax.set(document.querySelector(".map .ex4"), {
                                backgroundImage: "url(images/icon_phone_offline.png)"
                            })
                        }, 4500);
                        break;

                    case "[b4]":
                    //win
                        this.neoChatWrite("Ok ! I got it !")
                        this.moveNeoTo(param)
                        break;

                    case "[d6]":
                    case "[g9]":
                    //lose
                        this.neoChatWrite("Ok ! I got it !")
                        this.moveNeoTo(param)
                        break;

                    default:
                      this.neoChatWrite("There's nothing there. Guide me to a phone so i can exit !")
                        break;
                }
                break;

            case "/send":
                this.neoChatSend(param)
                this.playAudio(this.audios["dontUnderstand"].src)
                this.neoChatWrite(this.audios["dontUnderstand"].transcript)
                break;

            case "/setColor":
                /^#([0-9A-F]{3}){1,2}$/i.test(param) ? this.setColor(param) : this.write("Invalid color code. Please use an hexadecimal value.")
                // on check si le code hexa est valide
                break;

            case "/localize":
                switch (param) {
                    case "neo":
                        this.displayNeo()
                        this.write("Neo has been localized. Position added to the map.")
                        break;

                    case "trinity":
                        this.write("Unable to find Trinity in the Matrix.")
                        break;

                    case "morpheus":
                        this.write("Unable to find Morpheus in the Matrix.")
                        break;

                    default:
                        this.write("Cannot localize " + "'" + param + "'" + ". Position unknown or invalid demand.")
                        break;
                }
                break;



            case "/display":
                switch (param) {
                    case "maps":
                    case "map":
                        this.openMap()
                        !this.camsvideoDOM.classList.contains("hiddenOp") ?
                        this.write("Map displayed successfully. You can open cameras with /display cam")
                        : this.write("Map displayed successfully. Switch cams with /access_cam")
                        break;

                    case "cam":
                    case "cams":
                    case "camera":
                    case "cameras":
                        this.openCams()
                        this.write("Cameras displayed successfully. Switch between cams with /access_cam [cam_number]")
                        break;
                    default:
                        this.write("No display of " + "'" + param + "'" + " available.")
                        break;
                }
                break;

            case "/hide":
                switch (param) {
                    case "maps":
                    case "map":
                        this.openMap(false)
                        this.write("Map hidden successfully.")
                        break;

                    case "cam":
                    case "cams":
                    case "camera":
                    case "cameras":
                        this.openCams(false)
                        this.write("Cameras hidden successfully. Switch cams with /access_cam [cam_number]")
                        break;

                    default:
                        this.write("Cannot hide " + "'" + param + "'" + ".")
                        break;
                }
                break;

            case "/call":
              switch (param) {
                case "[d6]":
                this.write(`Now calling in ${param.toUpperCase()}...`)
                TweenMax.set(document.querySelector(".map .ex2"), {backgroundImage:"url(images/icon_phonering.png)"})
                this.call(param)
                  break;

                case "[b4]":
                this.write(`Now calling in ${param.toUpperCase()}...`)
                TweenMax.set(document.querySelector(".map .ex1"), {backgroundImage:"url(images/icon_phonering.png)"})
                this.call(param)
                  break;

                case "[g9]":
                this.write(`Now calling in ${param.toUpperCase()}...`)
                TweenMax.set(document.querySelector(".map .ex3"), {backgroundImage:"url(images/icon_phonering.png)"})
                this.call(param)
                  break;


                case "[h3]":
                this.write(`No response from ${param}. Phone is either offline or disconnected.`)
                TweenMax.set(document.querySelector(".map .ex4"), {backgroundImage:"url(images/icon_phone_offline.png)"})
                  break;
                default:

              }
                break;

            case "/ping":
                switch (param) {
                    case "[d6]":
                    case "[b4]":
                    case "[g9]":
                        param = param.toUpperCase()
                        this.write(
                            `Sending a ping request to ${param}...
                            ${param} answer : octets = 32 time = ${15 + Math.floor(Math.random()*7)}ms TTL=251
                            ${param} answer : octets = 32 time = ${15 + Math.floor(Math.random()*7)}ms TTL=251
                            ${param} answer : octets = 32 time = ${15 + Math.floor(Math.random()*7)}ms TTL=251

                            Ping stats for ${param} :
                            Packets : sent = 3, received = 3, lost = 0 (0% loss).
                            Connection is successful.
                            `
                        )
                        break;

                    case "[h3]":
                        param = param.toUpperCase()
                        this.write(
                            `Sending a ping request to ${param}...
                            .
                            .
                            .
                            .
                            .
                            No response from ${param}.
                            Recipient is offline or unavailable.
                            `
                        )
                        TweenMax.set(document.querySelector(".map .ex4"), {backgroundImage:"url(images/icon_phone_offline.png)"})
                        break;

                    default:
                        this.write("No exit found in this location.")
                        break;
                }
                break;

            case "/cam" :
            case "/access_cams":
            case "/access_cam":
                switch (param) {
                    case "[c3]":
                        this.switchCams("1")
                        this.write(`Access to camera ${param} authorized`)
                        TweenMax.set(document.querySelector(".cams"), {backgroundImage:`url(images/${noBrackParam.toUpperCase()}.png)`})
                        break;

                    case "[f3]":
                        this.switchCams("4")
                        this.write(`Access to camera ${param} authorized`)
                        console.log(`url(images/${noBrackParam.toUpperCase()}).png`)
                        TweenMax.set(document.querySelector(".cams"), {backgroundImage:`url(images/${noBrackParam.toUpperCase()}.png)`})
                    break;

                    case "[d5]": // AGENT
                        this.switchCams("2")
                        if (this.isCamOpen) TweenMax.set(".map .cc2", {backgroundImage:"url(images/icon_camwarning.png)"}) // only works if cams are open
                        this.write(`Access to camera ${param} authorized`)
                        TweenMax.set(document.querySelector(".cams"), {backgroundImage:`url(images/${noBrackParam.toUpperCase()}.png)`})
                    break;

                    case "[f8]": // AGENT
                        this.switchCams("3")
                        if (this.isCamOpen) TweenMax.set(".map .cc3", {backgroundImage: "url(images/icon_camwarning.png)"}) // only works if cams are open
                        this.write(`Access to camera ${param} authorized`)
                        TweenMax.set(document.querySelector(".cams"), {backgroundImage:`url(images/${noBrackParam.toUpperCase()}.png)`})
                    break;

                    default:
                        this.write("Unable to access camera " + "'" + param + "'")
                        break;
                }
                break;


            default:
                this.write("'" + noSlashVal + "'" + " is an unknown command. Press /help for more informations")
                break;
        }
    }

    playAudio(src){
      const audio = new Audio(src)
      audio.addEventListener('loadeddata', () => {
        audio.play()
      })
    }

    moveNeoTo(position){
        this.playAudio(this.audios["iGotIt"].src)
        this.neoChatWrite(this.audios["iGotIt"].transcript)
        let tl = new TimelineMax({
            paused:true
        })
        if (this.neoPosition == "f6") {
            switch (position) {
                case "[b4]":
                    this.winPosition = true
                    tl.to(".neoPos", 2.4, {x:-120} )
                    tl.to(".neoPos", 3.6, {y:-180} )
                    break;

                case "[h3]":
                    tl.to(".neoPos", 2.4, {x:-120} )
                    tl.to(".neoPos", 1.8, {y:92} )
                    break;

                case "[g9]":
                    this.isLost = true
                    tl.to(".neoPos", 1.8, {x:90} )
                    // tl.to(".neoPos", 0.5, {y:25} )
                    break;

                case "[d6]":
                    this.isLost = true
                    tl.to(".neoPos", 1.8, {y:-90} )
                    break;

                default:
                    break;
            }
        } else if (this.neoPosition == "h3") {
          switch (position) {
              case "[b4]":
                  this.winPosition = true
                  tl.to(".neoPos", 3.6, {y:270} )
                  break;

                case "[g9]":
                  this.isLost = true
                  tl.to(".neoPos", 1.8, {y:-90} )
                  tl.to(".neoPos", 4.2, {x:210} )
                  tl.to(".neoPos", 0.5, {y:25} )
                  break;

              case "[d6]":
                  this.isLost = true
                  tl.to(".neoPos", 1.8, {y:-90} )
                  tl.to(".neoPos", 4.2, {x:120} )
                  tl.to(".neoPos", 1.8, {y:-90} )
                  break;

              default:
                  break;
          }
        }
        tl.play()
        setTimeout(() => {
            this.checkWinOrLose(position)
        }, tl.duration()*1000);
    }

    checkWinOrLose(position){
      // if player is on the win spot and phone is calling
      if (this.winPosition && !this.phonesCalling[position]) {
        this.playAudio(this.audios["canYouCall"].src)
        this.neoChatWrite(this.audios["canYouCall"].transcript)
        setTimeout(() => {
            this.checkWinOrLose()
        }, 5000);
      }
      if (this.winPosition && this.phonesCalling[position]) {
            console.log("win !")
            TweenMax.set(".finishOverlay_lose", {display:"block"})
        }

      if (this.isLost){
        console.log("lose !")
        TweenMax.set(".finishOverlay_win", {display:"block"})
      }
    }


    switchCams(cam_number_str) {
        // reset la video
        this.camsvideoDOM.pause()
        this.camsvideoDOM.currentTime = 0
        //video de transition
        this.camsvideoDOM.setAttribute("src", "videos/cctv_transition.mp4")
        this.camsvideoDOM.play()
        this.camsvideoDOM.addEventListener("ended", () => {
            // const transDurationMs = this.camsvideoDOM.duration * 1000
            cam_number_str = cam_number_str.length == 1 ? "0" + cam_number_str : cam_number_str
            cam_number_str == "01" || cam_number_str == "02" ?
            this.camsvideoDOM.setAttribute("src", `videos/cctv${cam_number_str}.mp4`)
            : this.camsvideoDOM.setAttribute("src", `videos/cctv${cam_number_str}.mov`)
            // this.camsvideoDOM.play()
            // on gere le cas ou il met X au lieu de 0X
            // setTimeout(() => {
            // }, transDurationMs);
            // on switch la video de surveillance
        },{once : true})
    }

    neoChatSend(string) {
        string = "[Tank] " + string
        let strDOM = document.createElement("div")
        strDOM.classList.add("neoChatLine")
        strDOM.innerText = string
        this.neoChatDOM.children[0].appendChild(strDOM)
        let glitch = glitchText(strDOM, 18)
        glitch.play()
    }

    neoChatWrite(string) {
        string = "[Neo] " + string
        let strDOM = document.createElement("div")
        strDOM.classList.add("neoChatLine")
        strDOM.innerText = string
        this.neoChatDOM.children[0].appendChild(strDOM)
        let glitch = glitchText(strDOM, 18)
        glitch.play()
    }

    openMap(open = true) {
        if (open) {
            this.mapDOM.classList.remove("hiddenOp")
            this.isCamOpen = true
        } else {
            this.mapDOM.classList.add("hiddenOp")
            this.isCamOpen = false
        }
        // this.MapOpenTl.play()
    }

    openCams(open = true) {
        if (open) {
            this.camsDOM.classList.remove("hiddenOp")
            this.isCamOpen = true
            this.camsvideoDOM.play() // on restart la video
        } else {
            this.mapDOM.classList.add("hiddenOp")
            this.isCamOpen = false
        }
    }

    displayNeo() {
        document.querySelector(".map .neoPos").classList.remove("hiddenOp")
        this.neoBlink()
        setTimeout(() => {
            this.playAudio(this.audios["help1"].src)
            this.neoChatWrite(this.audios["help1"].transcript)
        }, 1000);
    }

    call(location) {
      this.phonesCalling[location] = true
      console.log(this.phonesCalling)
    }


    write(text) {
        let txtDiv = document.createElement("div")
        txtDiv.classList.add("response")
        txtDiv.innerText = text
        this.containerDOM.appendChild(txtDiv)

        let glitch = glitchText(txtDiv, 18)
        glitch.play()
    }

    clear() {
        while (this.containerDOM.firstChild) {
            this.containerDOM.removeChild(this.containerDOM.firstChild)
        }
    }

    setColor(hex) {
        this.textColor = hex
        document.querySelector(".prefix").style.color = this.textColor
        document.querySelector(".prefix").style.textShadow = "1px 1px 10px" + this.textColor
        document.querySelector(".inputLine input").style.color = this.textColor
        document.querySelector(".inputLine input").style.textShadow = "1px 1px 10px" + this.textColor
    }

    scenarStart() {
        setTimeout(() => {
            this.neoComDOM.classList.remove("hiddenOp")
            this.neoChatDOM.classList.remove("hiddenOp")
            this.playAudio(this.audios["heyTank"].src)
            this.neoChatWrite(this.audios["heyTank"].transcript)

            this.timeCheckSup10()
        }, 12000)
    }
}

let terminal = new Terminal()
