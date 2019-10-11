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
            "[h3]": false,
            "[d6]": false,
            "[g9]": false,
            "[b4]": false
        }
        
        this.audios = {
            "heyTank": {
                src: "sounds/heyTank.mp3",
                transcript: "Hey tank, I need your help ! Get me out of the matrix now ! I think the agents are onto me ! I need you to find me a phone booth to get out asap."
            },
            "help1": {
                src: "sounds/help1.mp3",
                transcript: "Tank, hurry up !"
            },
            "help2": {
                src: "sounds/help2.mp3",
                transcript: "Please Tank, I need your help now !"
            },
            "agent": {
                src: "sounds/agent.mp3",
                transcript: "I think there's an agent on this way"
            },
            "brokenPhone": {
                src: "sounds/brokenPhone.mp3",
                transcript: "There's a problem with the booth ! I need an other one !"
            },
            "dontUnderstand": {
                src: "sounds/dontUnderstand.mp3",
                transcript: "I don’t understand ..."
            },
            "iGotIt": {
                src: "sounds/iGotIt.mp3",
                transcript: "I got it !"
            },
            "canYouCall": {
                src: "sounds/canYouCall.mp3",
                transcript: "Can you call ? I'm right there !"
            },
            "camOff": {
                src: "sounds/cameraOffSound.mp3",
                transcript: null
            },
        }

        this.winPosition = false
        this.isLost = false
        this.neoPosition = "f6" // or b4
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
        this.plsTank = ""

        this.caretBlink()
        this.setInputListener()
        this.setFocus()
        this.periodicFocus()

        document.querySelectorAll(".refresh").forEach(button => {
            button.addEventListener('click', () => {
                location.reload()
            })
        })

        document.addEventListener('keydown', e => {
            if (e.code === "Enter" && this.activeInput.value !== "") {
                this.respondToInput(this.activeInput.value)
            } else if (e.code === "Tab") e.preventDefault()
        })

    }

    // workaround un peu cheap pour refocus sur l'input
    periodicFocus(){
        setInterval(() => {
            this.setFocus()
        }, 1500);
    }
    // joue la voice-line help 2 si l'utilisateur n'a pas entré d'input depuis +de 20secondes
    timeCheckSup10() {
        let delaySec = 20
        this.time1 = new Date()
        this.plsTank = setInterval(() => {
            this.time2 = new Date()
            if (Math.round((this.time2 - this.time1) / 1000) > delaySec) {
                this.playAudio(this.audios["help2"].src)
                this.neoChatWrite(this.audios["help2"].transcript)
                this.time1 = new Date()
                delaySec *= 3 // on augmente un peu
            }
        }, 1000);
    }

    txtDisplayReady() {
        this.textDisplayDone = true
    }

    // l'input est tjrs a la taille du nombre de char qu'il peut supporter pour que le caret soit toujours juste a droite
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

    neoBlink() {
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


    // on créé une nouvelle ligne d'input dans le terminal
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

    // on va gérér tous les inputs possibles pour l'utilisateur
    respondToInput(val) {
        this.timeCheckSup10() // on reset la relance toutes les 10 secondes
        // sur un input, le scenar commence
        if (this.firstInput) this.scenarStart(), this.firstInput = false
        let noSlashVal = val[0] == "/" ? val.slice(1) : val
        // on check si la val contient un espace, signifiant une variable
        if (val.indexOf(" ") >= 0) {
            this.respondToInputParam(val) // contient un espace -> surement un truc avec une variable
        } else {
            // on va gérer toutes les commandes qui ne contiennent pas de variable ici
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
                        /GOTOSITE : Go to the main site
                    `)
                    break;

                case "/gotosite":
                    window.location.href = "maxime.druart.github.io/"
                    break;

                // on gére le cas ou le parametre est omis pour guider l'utilsatuer
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

                // uWu

                case "/uwu":
                    this.write("Hello Tank-kun (✿◕‿◕)")
                    break;

                case "/wakeupneo":
                case "wake up neo":
                    this.write("The matrix has you.")
                    this.write("Follow the white rabbit.")
                    break;

                // cas de base soit une commande non supporté. On redirige vers /help

                default:
                    this.write("'" + noSlashVal + "'" + " is an unknown command. Press /help for more informations.")
                    break;
            }
        }
        // apres un input on créé une nouvelle ligne
        this.createNewLine()
    }
    // une autre fonction pour gérer le cas ou ca contient une variable
    respondToInputParam(val) {
        val = val.toLowerCase()
        let noSlashVal = val[0] == "/" ? val.slice(1) : val
        let spaceIndex = val.indexOf(" ")
        let keyword = val.slice(0, spaceIndex)
        let param = val.slice(spaceIndex + 1)
        let noBrackParam = param.slice(1, 3)
        switch (keyword) {

            // on envoie une position a neo ou il va se déplacer. Seulement géré sont les cas d'un déplacement vers un point d'intérêt
            case "/send_location":
                // on envoie neo vers cet endroit
                switch (param) {
                    case "[h3]":
                        // broken phone
                        this.neoChatWrite("Ok ! I got it !")
                        this.moveNeoTo(param)
                        this.neoPosition = "h3"
                        // on change l'image vers un phone offline et joue la voice line
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

            // l'utilisateur peut parler a neo directement. Il faut juste pas qu'il attende une réponse.
            case "/send":
                this.neoChatSend(param)
                this.playAudio(this.audios["dontUnderstand"].src)
                this.neoChatWrite(this.audios["dontUnderstand"].transcript)
                break;

            // toujours dans le style
            case "/setColor":
                /^#([0-9A-F]{3}){1,2}$/i.test(param) ? this.setColor(param) : this.write("Invalid color code. Please use an hexadecimal value.")
                // on check si le code hexa est valide
                break;

            // i put neo on the map huh
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


            // on va afficher divers éléments graphiques qui vont guider l'utilsateur ( map, cams, ...)
            case "/display":
                switch (param) {
                    case "maps":
                    case "map":
                        this.openMap()
                        !this.camsvideoDOM.classList.contains("hiddenOp") ?
                            this.write("Map displayed successfully. You can open cameras with /display cam") :
                            this.write("Map displayed successfully. Switch cams with /access_cam")
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

            // l'opérateur doit appeler sur la cabine pour que neo puisse sortir
            case "/call":
                switch (param) {
                    case "[d6]":
                        this.write(`Now calling in ${param.toUpperCase()}...`)
                        TweenMax.set(document.querySelector(".map .ex2"), {
                            backgroundImage: "url(images/icon_phonering.png)"
                        })
                        this.call(param)
                        break;

                    case "[b4]":
                        this.write(`Now calling in ${param.toUpperCase()}...`)
                        TweenMax.set(document.querySelector(".map .ex1"), {
                            backgroundImage: "url(images/icon_phonering.png)"
                        })
                        this.call(param)
                        break;

                    case "[g9]":
                        this.write(`Now calling in ${param.toUpperCase()}...`)
                        TweenMax.set(document.querySelector(".map .ex3"), {
                            backgroundImage: "url(images/icon_phonering.png)"
                        })
                        this.call(param)
                        break;


                    case "[h3]":
                        this.write(`No response from ${param}. Phone is either offline or disconnected.`)
                        TweenMax.set(document.querySelector(".map .ex4"), {
                            backgroundImage: "url(images/icon_phone_offline.png)"
                        })
                        break;
                    default:
                        this.write(`No phone found in ${param}`)
                        break;

                }
                break;

            // avant d'appeler il peut savoir si la cabine répond
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
                        TweenMax.set(document.querySelector(".map .ex4"), {
                            backgroundImage: "url(images/icon_phone_offline.png)"
                        })
                        break;

                    default:
                        this.write("No exit found in this location.")
                        break;
                }
                break;

            // l'utilisateur peut switch entre les 4 cams pour répérer les agents / le chemin
            case "/cam":
            case "/access_cams":
            case "/access_cam":
                switch (param) {
                    case "[c3]":
                        this.switchCams("1")
                        this.write(`Access to camera ${param} authorized`)
                        TweenMax.set(document.querySelector(".cams"), {
                            backgroundImage: `url(images/${noBrackParam.toUpperCase()}.png)`
                        })
                        break;

                    case "[f3]":
                        this.switchCams("4")
                        this.write(`Access to camera ${param} authorized`)
                        TweenMax.set(document.querySelector(".cams"), {
                            backgroundImage: `url(images/${noBrackParam.toUpperCase()}.png)`
                        })
                        break;

                    case "[d5]": // AGENT
                        this.switchCams("2")
                        if (this.isCamOpen) TweenMax.set(".map .cc2", {
                            backgroundImage: "url(images/icon_camwarning.png)"
                        }) // only works if cams are open
                        this.write(`Access to camera ${param} authorized`)
                        TweenMax.set(document.querySelector(".cams"), {
                            backgroundImage: `url(images/${noBrackParam.toUpperCase()}.png)`
                        })
                        break;

                    case "[f8]": // AGENT
                        this.switchCams("3")
                        if (this.isCamOpen) TweenMax.set(".map .cc3", {
                            backgroundImage: "url(images/icon_camwarning.png)"
                        }) // only works if cams are open
                        this.write(`Access to camera ${param} authorized`)
                        TweenMax.set(document.querySelector(".cams"), {
                            backgroundImage: `url(images/${noBrackParam.toUpperCase()}.png)`
                        })
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

    // la fn qui jouer l'audio
    playAudio(src) {
        const audio = new Audio(src)
        audio.addEventListener('loadeddata', () => {
            audio.play()
        })
    }

    // on déplace concrétement neo puis check si  il a win / lose
    moveNeoTo(position) {
        this.playAudio(this.audios["iGotIt"].src)
        this.neoChatWrite(this.audios["iGotIt"].transcript)
        let tl = new TimelineMax({
            paused: true,
            ease: "linear",
        })
        // dans le cas ou il part de f6
        if (this.neoPosition == "f6") {
            switch (position) {
                case "[b4]":
                    this.winPosition = true
                    tl.to(".neoPos", 4.8, {
                        ease: Power0.easeNone,
                        x: -120
                    })
                    tl.to(".neoPos", 7.2, {
                        ease: Power0.easeNone,
                        y: -180
                    })
                    break;

                case "[h3]":
                    tl.to(".neoPos", 4.8, {
                        ease: Power0.easeNone,
                        x: -120
                    })
                    tl.to(".neoPos", 3.6, {
                        ease: Power0.easeNone,
                        y: 92
                    })
                    break;

                case "[g9]":
                    this.isLost = true
                    tl.to(".neoPos", 3.6, {
                        ease: Power0.easeNone,
                        x: 90
                    })
                    // tl.to(".neoPos", 0.5, {ease: Power0.easeNone,y:25} )
                    break;

                case "[d6]":
                    setTimeout(() => {
                        this.playAudio(this.audios["agent"].src)
                        this.neoChatWrite(this.audios["agent"].transcript)
                    }, 800);
                    this.isLost = true
                    tl.to(".neoPos", 3.6, {
                        ease: Power0.easeNone,
                        y: -90
                    })
                    break;

                default:
                    break;
            }
            // dans le cas ou il part de h3
        } else if (this.neoPosition == "h3") {
            switch (position) {
                case "[b4]":
                    this.winPosition = true
                    tl.to(".neoPos", 7.2, {
                        ease: Power0.easeNone,
                        y: -220
                    })
                    tl.to(".neoPos", 7.2, {
                        ease: Power0.easeNone,
                        x: 30
                    })
                    break;

                case "[g9]":
                    this.isLost = true
                    tl.to(".neoPos", 3.6, {
                        ease: Power0.easeNone,
                        y: 12
                    })
                    tl.to(".neoPos", 8.2, {
                        ease: Power0.easeNone,
                        x: 180
                    })
                    tl.to(".neoPos", 1.2, {
                        ease: Power0.easeNone,
                        y: 32
                    })
                    break;

                case "[d6]":
                    setTimeout(() => {
                        this.playAudio(this.audios["agent"].src)
                        this.neoChatWrite(this.audios["agent"].transcript)
                    }, 800);
                    this.isLost = true
                    tl.to(".neoPos", 3.6, {
                        ease: Power0.easeNone,
                        y: -68
                    })
                    break;

                default:
                    break;
            }
        }
        tl.play()
        // on check la win une fois la tl fini
        setTimeout(() => {
            this.checkWinOrLose(position)
            if (position == "[b4]" && !this.phonesCalling[b4]) {
                this.playAudio(this.audios["canYouCall"].src)
                this.neoChatWrite(this.audios["canYouCall"].transcript)
            }
        }, tl.duration() * 1000);
    }

    // on affiche les ecrans de win / lose /rien
    checkWinOrLose(position) {
        // if player is on the win spot and phone is calling
        if (this.winPosition && !this.phonesCalling[position]) {
            setTimeout(() => {
                this.checkWinOrLose(position)
            }, 2000);
        }

        // win
        if (this.winPosition && this.phonesCalling[position]) {
            clearInterval(this.plsTank)
            document.querySelector(".finishOverlay").style.display = "block"
            document.querySelector(".finishOverlay_win").style.display = "flex"
            document.querySelector("body").style.cursor = "pointer"
        }

        // lose
        if (this.isLost) {
            document.querySelector(".finishOverlay").style.display = "block"
            document.querySelector(".finishOverlay_lose").style.display = "flex"
            document.querySelector("body").style.cursor = "pointer"
        }
    }

    // on switch entre les cams simplement en changement la src de la video. on joue aussi une petite video de transition
    switchCams(cam_number_str) {
        // reset la video
        this.camsvideoDOM.pause()
        this.camsvideoDOM.currentTime = 0
        //video de transition
        this.camsvideoDOM.setAttribute("src", "videos/cctv_transition.mp4")
        this.camsvideoDOM.play()
        // une fois la transi fini ->
        this.camsvideoDOM.addEventListener("ended", () => {
            cam_number_str = cam_number_str.length == 1 ? "0" + cam_number_str : cam_number_str
            cam_number_str == "01" || cam_number_str == "02" ?
                this.camsvideoDOM.setAttribute("src", `videos/cctv${cam_number_str}.mp4`) :
                this.camsvideoDOM.setAttribute("src", `videos/cctv${cam_number_str}.mov`)
        }, {
            once: true
        })
    }

    // on ajoute une string avec le contenu dans le chatbox a droite
    neoChatSend(string) {
        string = "[Tank] " + string
        let strDOM = document.createElement("div")
        strDOM.classList.add("neoChatLine")
        strDOM.innerText = string
        this.neoChatDOM.children[0].appendChild(strDOM)
        let glitch = glitchText(strDOM, 18)
        glitch.play()
    }

    // meme chose coté neo
    neoChatWrite(string) {
        string = "[Neo] " + string
        let strDOM = document.createElement("div")
        strDOM.classList.add("neoChatLine")
        strDOM.innerText = string
        this.neoChatDOM.children[0].appendChild(strDOM)
        let glitch = glitchText(strDOM, 18)
        glitch.play()
    }

    // toggle simple de class
    openMap(open = true) {
        if (open) {
            this.mapDOM.classList.remove("hiddenOp")
            this.isCamOpen = true
        } else {
            this.mapDOM.classList.add("hiddenOp")
            this.isCamOpen = false
        }
    }

    // toggle simple de class
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

    // pareil. petite voice line pour check que l'utilisateur est sur le bon chemin
    displayNeo() {
        document.querySelector(".map .neoPos").classList.remove("hiddenOp")
        this.neoBlink()
        setTimeout(() => {
            this.playAudio(this.audios["help1"].src)
            this.neoChatWrite(this.audios["help1"].transcript)
        }, 1000);
    }

    // on update l'objet
    call(location) {
        this.phonesCalling[location] = true
    }

    // la réponse aux inputs
    write(text) {
        let txtDiv = document.createElement("div")
        txtDiv.classList.add("response")
        txtDiv.innerText = text
        this.containerDOM.appendChild(txtDiv)

        // fais une anim sur le text
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

    // début du scenar aka appel de neo
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

// lets go !!!!
let terminal = new Terminal()


