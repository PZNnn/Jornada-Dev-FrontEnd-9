

/* Relogio mecanismo | clock mechanism*/

const segundosInput = document.getElementById("seg")
const minutosInput = document.getElementById("min")
const playInp = document.getElementById("play")
const pauseInp = document.getElementById("pausar")
const siteTitle = document.getElementById('title')

let pauseSeg = null
let pauseMin = null

let progresso = 360 /*Progresso do circulo do relogio | Clock circle progress*/
let modoAtual = "foco" /*modo atual | current mode*/
let runs = 1 /*quantas vezes ocorreu a troca de modos*/
let troca = true
let tempo_em_min = 0
let tempo_em_seg = 0


//botão next mode
/*- Total possui 8 modos, sendo 1-foco, 2-pausa, 3-foco... 8-pausa longa.
  - There's 8 modes, 1-focus, 2-break, 3-focus... 8-long break */
function switchMode(nextBtnPressed){//Quando você avança um modo a var 'troca' recebe true | When you switch to a different mode, the variable 'troca' receives true.

    if ([1,3,5,7].includes(runs)){//se var runs for igual a 1,3,5,7, significa que é o modo atual é Foco | if var runs is equal 1,3,5,7, that means the mode is Focus
        clearInterval(pauseSeg) 
        modoAtual = "foco"
        troca = false
        focoConfig(nextBtnPressed)
    }
    else if ([2,4,6].includes(runs)){
        clearInterval(pauseSeg) 
        modoAtual = "pausa"
        troca = false
        pausaConfig(nextBtnPressed)
    }
    else if (runs == 8){
        clearInterval(pauseSeg) 
        modoAtual = "pausaLonga"
        troca = false
        pausaLongaConfig(nextBtnPressed)
    } 
}

//Configuração de cada modo | Configuration of each mode
function focoConfig(nextBtnPressed){
    
    progresso = 360
    tempo_em_min = 25
    tempo_em_seg = 0

    //Muda as cores, SVGs, display... e muda para modo 'foco' | change the colors, SVGs, display... and current mode to 'focus'
    document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
    segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    document.getElementById('current_mode').style.borderColor = 'var(--modeFoco_color)'
    document.getElementById('current_mode').style.backgroundColor = 'rgb(35, 43, 26)'
    document.getElementById('current_mode').style.backgroundImage = `url("data:image/svg+xml,%3Csvg stroke='rgb(132, 204, 22)' fill='none' stroke-width='2' viewBox='0 0 24 24' stroke-linecap='round' stroke-linejoin='round' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8'%3E%3C/path%3E%3Cpath d='M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8'%3E%3C/path%3E%3Cpath d='M17.5 16a3.5 3.5 0 0 0 0 -7h-.5'%3E%3C/path%3E%3Cpath d='M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0'%3E%3C/path%3E%3Cpath d='M6.5 16a3.5 3.5 0 0 1 0 -7h.5'%3E%3C/path%3E%3Cpath d='M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10'%3E%3C/path%3E%3C/svg%3E")`
    document.getElementById('foco_mode_CM').style.display = 'block'
    document.getElementById('pausa_mode_CM').style.display = 'none'
    document.getElementById('pausaLonga_mode_CM').style.display = 'none'
    document.getElementById('current_mode').style.width = '90px'
    document.getElementById('progress').style.background = 'conic-gradient(var(--modeFoco_color) var(--pregresso), rgb(35, 35, 38) 0deg)'
    
    document.getElementById('next_mode_text').style.borderColor = 'var(--modePause_color)'
    document.getElementById('next_mode_text').style.backgroundColor = 'rgb(47, 38, 25)'
    document.getElementById('next_mode_text').style.backgroundImage = `url("data:image/svg+xml,%3Csvg stroke='rgb(245, 158, 11)' fill='none' stroke-width='2' viewBox='0 0 24 24' stroke-linecap='round' stroke-linejoin='round' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1'%3E%3C/path%3E%3Cpath d='M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'%3E%3C/path%3E%3Cpath d='M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'%3E%3C/path%3E%3Cpath d='M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z'%3E%3C/path%3E%3Cpath d='M16.746 16.726a3 3 0 1 0 .252 -5.555'%3E%3C/path%3E%3C/svg%3E")`
    document.getElementById('next_mode_text').style.width = '90px'
    document.getElementById('foco_mode_NM').style.display = 'none'
    document.getElementById('pausaLonga_mode_NM').style.display = 'none'
    document.getElementById('pausa_mode_NM').style.display = 'block'

    if (runs == 7){
        document.getElementById('next_mode_text').style.borderColor = 'var(--modePausaLonga_color)'
        document.getElementById('next_mode_text').style.backgroundColor = 'rgb(22, 41, 46)'
        document.getElementById('next_mode_text').style.backgroundImage = `url("data:image/svg+xml,%3Csvg stroke='rgb(6, 182, 212)' fill='none' stroke-width='2' viewBox='0 0 24 24' stroke-linecap='round' stroke-linejoin='round' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1'%3E%3C/path%3E%3Cpath d='M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'%3E%3C/path%3E%3Cpath d='M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'%3E%3C/path%3E%3Cpath d='M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z'%3E%3C/path%3E%3Cpath d='M16.746 16.726a3 3 0 1 0 .252 -5.555'%3E%3C/path%3E%3C/svg%3E")`
        document.getElementById('next_mode_text').style.width = '150px'
        document.getElementById('foco_mode_NM').style.display = 'none'
        document.getElementById('pausa_mode_NM').style.display = 'none'
        document.getElementById('pausaLonga_mode_NM').style.display = 'block'
    }

    if (!nextBtnPressed){
       play() 
    }
    else{
    // Mostra botão play | show the play button
        pauseInp.style.zIndex = '0'
        pauseInp.style.opacity = '0'
        playInp.style.opacity = '0.9'
    }
}
function pausaConfig(nextBtnPressed){
    progresso = 360
    tempo_em_min = 5
    tempo_em_seg = 0

    //Muda as cores, SVGs, display... e muda para modo 'pausa' | change the colors, SVGs, display... and current mode to 'break'
    document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
    segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    document.getElementById('current_mode').style.borderColor = 'var(--modePause_color)'
    document.getElementById('current_mode').style.backgroundColor = 'rgb(47, 38, 25)'
    document.getElementById('current_mode').style.backgroundImage = `url("data:image/svg+xml,%3Csvg stroke='rgb(245, 158, 11)' fill='none' stroke-width='2' viewBox='0 0 24 24' stroke-linecap='round' stroke-linejoin='round' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1'%3E%3C/path%3E%3Cpath d='M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'%3E%3C/path%3E%3Cpath d='M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'%3E%3C/path%3E%3Cpath d='M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z'%3E%3C/path%3E%3Cpath d='M16.746 16.726a3 3 0 1 0 .252 -5.555'%3E%3C/path%3E%3C/svg%3E")`
    document.getElementById('current_mode').style.width = '90px'
    document.getElementById('foco_mode_CM').style.display = 'none'
    document.getElementById('pausaLonga_mode_CM').style.display = 'none'
    document.getElementById('pausa_mode_CM').style.display = 'block'
    document.getElementById('progress').style.background = 'conic-gradient(var(--modePause_color) var(--pregresso), rgb(35, 35, 38) 0deg)'
    
    document.getElementById('next_mode_text').style.borderColor = 'var(--modeFoco_color)'
    document.getElementById('next_mode_text').style.backgroundColor = 'rgb(35, 43, 26)'
    document.getElementById('next_mode_text').style.backgroundImage = `url("data:image/svg+xml,%3Csvg stroke='rgb(132, 204, 22)' fill='none' stroke-width='2' viewBox='0 0 24 24' stroke-linecap='round' stroke-linejoin='round' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8'%3E%3C/path%3E%3Cpath d='M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8'%3E%3C/path%3E%3Cpath d='M17.5 16a3.5 3.5 0 0 0 0 -7h-.5'%3E%3C/path%3E%3Cpath d='M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0'%3E%3C/path%3E%3Cpath d='M6.5 16a3.5 3.5 0 0 1 0 -7h.5'%3E%3C/path%3E%3Cpath d='M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10'%3E%3C/path%3E%3C/svg%3E")`
    document.getElementById('foco_mode_NM').style.display = 'block'
    document.getElementById('pausa_mode_NM').style.display = 'none'
    document.getElementById('pausaLonga_mode_NM').style.display = 'none'
    document.getElementById('next_mode_text').style.width = '90px'

    if (!nextBtnPressed){
       play() 
    }
    else{
    // Mostra botão play | show the play button
        pauseInp.style.zIndex = '0'
        pauseInp.style.opacity = '0'
        playInp.style.opacity = '0.9'
    }
    
}
function pausaLongaConfig(nextBtnPressed){
    progresso = 360
    tempo_em_min = 30
    tempo_em_seg = 0

    //Muda as cores, SVGs, display... e muda para modo 'pausa longa' | change the colors, SVGs, display... and current mode to 'long break'
    document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
    segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    document.getElementById('current_mode').style.borderColor = 'var(--modePausaLonga_color)'
    document.getElementById('current_mode').style.backgroundColor = 'rgb(22, 41, 46)'
    document.getElementById('current_mode').style.backgroundImage = `url("data:image/svg+xml,%3Csvg stroke='rgb(6, 182, 212)' fill='none' stroke-width='2' viewBox='0 0 24 24' stroke-linecap='round' stroke-linejoin='round' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1'%3E%3C/path%3E%3Cpath d='M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'%3E%3C/path%3E%3Cpath d='M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2'%3E%3C/path%3E%3Cpath d='M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z'%3E%3C/path%3E%3Cpath d='M16.746 16.726a3 3 0 1 0 .252 -5.555'%3E%3C/path%3E%3C/svg%3E")`
    document.getElementById('current_mode').style.width = '150px'
    document.getElementById('foco_mode_CM').style.display = 'none'
    document.getElementById('pausa_mode_CM').style.display = 'none'
    document.getElementById('pausaLonga_mode_CM').style.display = 'block'

    document.getElementById('next_mode_text').style.borderColor = 'var(--modeFoco_color)'
    document.getElementById('next_mode_text').style.backgroundColor = 'rgb(35, 43, 26)'
    document.getElementById('next_mode_text').style.backgroundImage = `url("data:image/svg+xml,%3Csvg stroke='rgb(132, 204, 22)' fill='none' stroke-width='2' viewBox='0 0 24 24' stroke-linecap='round' stroke-linejoin='round' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8'%3E%3C/path%3E%3Cpath d='M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8'%3E%3C/path%3E%3Cpath d='M17.5 16a3.5 3.5 0 0 0 0 -7h-.5'%3E%3C/path%3E%3Cpath d='M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0'%3E%3C/path%3E%3Cpath d='M6.5 16a3.5 3.5 0 0 1 0 -7h.5'%3E%3C/path%3E%3Cpath d='M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10'%3E%3C/path%3E%3C/svg%3E")`
    document.getElementById('foco_mode_NM').style.display = 'block'
    document.getElementById('pausa_mode_NM').style.display = 'none'
    document.getElementById('pausaLonga_mode_NM').style.display = 'none'
    document.getElementById('next_mode_text').style.width = '90px'
    document.getElementById('progress').style.background = 'conic-gradient(var(--modePausaLonga_color) var(--pregresso), rgb(35, 35, 38) 0deg)'

    if (!nextBtnPressed){
       play() 
    }
    else{
    // Mostra botão play | show the play button
        pauseInp.style.zIndex = '0'
        pauseInp.style.opacity = '0'
        playInp.style.opacity = '0.9'
    }
}



function play(){
    /*ao apertar play mostra o botão pause | show pause button when you press play*/
    pauseInp.style.zIndex = '2'
    pauseInp.style.opacity = '0.9'
    playInp.style.opacity = '0'

    function seg(){//segundos

        if (troca == true){
            switchMode()
        }

    //- progresso do circulo do relogio | clock circle progress
    /*- subtrai a quantidade certa de graus do circulo, para que ele acabe junto com o tempo
      - remove the right amount from the degrees of the circle */
        if (modoAtual == 'foco'){
            progresso = progresso - 0.24
            document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
        }
        if (modoAtual == 'pausa'){
            progresso = progresso - 1.2
            document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
        }
        if (modoAtual == 'pausaLonga'){
            progresso = progresso - 0.2
            document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
        }

    //quando o tempo acaba, troca de modo | when the timer ends, it switch the mode
        if (tempo_em_min == 0 && tempo_em_seg == 0){
            clearInterval(pauseSeg) 
            
            let audio = document.getElementById('audio')
            audio.play()
            runs = runs + 1
            
            if (runs > 8){
                runs = 1
            }

            if (runs == 8) {
                modoAtual = 'pausaLonga'
                pausaLongaConfig()
            }

            else if (modoAtual == "foco"){ //modo FOCO para modo PAUSA | Focus mode to Break mode
                pausaConfig()
                modoAtual = "pausa"
            }

            else if (modoAtual == "pausa"){//modo PAUSA para modo FOCO | Break mode to Focus mode
                focoConfig()
                modoAtual = "foco"
            }

            else if (modoAtual == 'pausaLonga'){// modo Pausa longa para modo Foco | Long break mode to Focus mode
                focoConfig()
                modoAtual = "foco"
            }
        }

    //Condições do relogio
        if(tempo_em_seg == 0){//reseta se os segundos chegarem a 0 | reset when the seconds reach 0
            tempo_em_seg = 60
            tempo_em_min = tempo_em_min - 1
            minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        }

        tempo_em_seg = tempo_em_seg - 1
        siteTitle.innerHTML = `Pomodoro | ${tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`
        segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        /*- esse 'toLocaleString...' serve para adicionar duas casas de 0 em segundos, assim ao invez de ficar 5s/m, fica 05s/m
          - 'toLocaleString...' is used to add leading zeros to seconds. Instead of displaying as 5s/m, it will display as 05s/m*/
    }

    pauseSeg = setInterval(seg, 1000)
    /*- É necessario atribuir o 'setInterval' a uma variavel, para que você possa pausalo com o 'clearInterval()'
      - You need to assign 'setInterval' to a variable , so you can pause it with 'clearInterval()'*/
}


// Pausa o relogio | Pause the clock
document.getElementById("pausar").addEventListener("click", () =>{
    clearInterval(pauseSeg) 

    // Mostra botão play | show the play button
    pauseInp.style.zIndex = '0'
    pauseInp.style.opacity = '0'
    playInp.style.opacity = '0.9'
})

// Reset no relogio | clock reset
document.getElementById("reset").addEventListener('click', () =>{
        if (modoAtual == 'foco'){//reseta o relogio caso o modo seja foco | reset if the mode is 'focus'
        clearInterval(pauseSeg) 
        tempo_em_seg = 0
        tempo_em_min = 25
        progresso = 360

        minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        siteTitle.innerHTML = `Pomodoro | ${tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`
        document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
        
        troca = true
        pauseInp.style.zIndex = '0'
        pauseInp.style.opacity = '0'
        playInp.style.opacity = '0.9'
    }
    else if (modoAtual == 'pausa'){//reseta o relogio caso o modo seja pausa | reset if the mode is 'break'
        clearInterval(pauseSeg) 
        tempo_em_seg = 0
        tempo_em_min = 5
        progresso = 360

        minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
 
        troca = true
        pauseInp.style.zIndex = '0'
        pauseInp.style.opacity = '0'
        playInp.style.opacity = '0.9'
    }

    else if (modoAtual == 'pausaLonga'){//reseta o relogio caso o modo seja pausa longa | reset if the mode is 'long break'
        clearInterval(pauseSeg) 
        tempo_em_seg = 0
        tempo_em_min = 30
        progresso = 360

        minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
        
        troca = true
        pauseInp.style.zIndex = '0'
        pauseInp.style.opacity = '0'
        playInp.style.opacity = '0.9'
    }
})

/* Troca de modo | switch mode */
document.getElementById("next_mode_inp").addEventListener('click', () =>{

    troca = true
    if (runs >= 8){
        runs = 1
    }
    else{
        runs = runs + 1
    }
    let nextBtnPressed = true
    switchMode(nextBtnPressed)
})



/*---------------TAREFAS | TASKS---------------*/

const tarefaContainer = document.getElementById("tarefa")
const taskInput = document.getElementById("input_task")

let taskCount = 0 //Conta quantas tarefas existem e também atribui a tarefa o seu proprio numero | Count how many tasks exist and also assign each task its own number.

taskInput.addEventListener('keydown', (event) =>{
    if (event.key === 'Enter'){
        event.preventDefault()  
        addTask()
    }
})

function createTask(p, state){
    document.getElementById("span").style.display = "none"
    // Cria a os elementos e adciona no DOM | it'll create the elements and add to the DOM
    let labelCreate = document.createElement("label")
    let inputCreate = document.createElement("input")
    let taskText = document.createElement(`p`)
    let moveUp = document.createElement('button')
    let moveDown = document.createElement('button')
    let deleteInp = document.createElement('input')
    let div1 = document.createElement('div')
    let div2 = document.createElement('div')
    

    labelCreate.setAttribute("for", `checkbox${taskCount}`)
    labelCreate.setAttribute("id", `deleteTask${taskCount}`)

    inputCreate.setAttribute("type" , `checkbox`)
    inputCreate.setAttribute("name" , `checkbox`)
    inputCreate.setAttribute("id" , `checkbox${taskCount}`)
    inputCreate.setAttribute("class" , `checkbox`)
    inputCreate.setAttribute('onclick', 'checkedInp(this)')
    if (state == 'true'){
        inputCreate.setAttribute('checked', 'checked')
    }

    deleteInp.setAttribute("type" , "button")
    deleteInp.setAttribute("class" , "deleteTask")
    deleteInp.setAttribute("id" , `deleteTask${taskCount}`)
    deleteInp.setAttribute("onclick" , `deletTask(this)`)

    moveUp.setAttribute("onclick" , `moveTaskUp(this)`)
    moveUp.setAttribute("id" , `MTUpDown${taskCount}`)
    moveUp.setAttribute("class" ,`moveTaskUp`)

    moveDown.setAttribute("onclick" , `moveTaskDown(this)`)
    moveDown.setAttribute("id" , `MTUpDown${taskCount}`)
    moveDown.setAttribute("class" , `moveTaskDown`)

    div1.setAttribute('id', 'taskText')
    div2.setAttribute('id', 'taskbuttons')
    
    taskText.innerText = p
    taskText.setAttribute('id', `deleteTask${taskCount}Text`)

    div1.appendChild(inputCreate)
    div1.appendChild(taskText)
    labelCreate.appendChild(div1)

    div2.appendChild(moveUp)
    div2.appendChild(moveDown)
    div2.appendChild(deleteInp)
    labelCreate.appendChild(div2)

    tarefaContainer.appendChild(labelCreate)
    taskInput.value = ''
}

let taskArray = []//cria o array para armazenar no localStorage e carrega as task| array to store the task then load it
if (localStorage.storageArrayKey){
    taskArray = JSON.parse(localStorage.getItem('storageArrayKey'))

    for (let i in taskArray) {
        taskCount = taskCount + 1
        let state = 'false'

        if(taskArray[i].checkbox == 'true'){
            state = 'true'
        }

        createTask(taskArray[i].texto, state)
    }
}

function addTask(){

    if (taskInput.value.trim() == ""){//caso o usuario não por nada | if the task input is empty
        setTimeout(()=>{
            taskInput.classList.add('shake-animation')
        },5)
        taskInput.classList.remove('shake-animation')
        taskInput.value = ''
    }

    else{//inicia a criação da task | create the task
        taskCount = taskCount + 1
        let p = taskInput.value
        
        if (localStorage.taskArray){// armazena a task no localStorage | it'll store the task in localStorage
            taskArray = JSON.parse(localStorage.getItem('taskArray'))
        }
        taskArray.push({
            checkbox: 'false',
            texto: p
        })
        localStorage.storageArrayKey = JSON.stringify(taskArray)
        createTask(p)
    }
}

function moveTaskUp(btn) {//move a task uma casa acima e armazena ela | move task up and store it

    // pega o numero do id do botão, depois pega o texto e procura ele no arrya para descobir o index
    // get the button id number then get the text and search it in the array and take the index
    let MTDInputID = btn.id.match(/\d+/g).join('')
    const textFinder = document.getElementById(`deleteTask${MTDInputID}Text`).textContent
    let indice = (taskArray.findIndex(item => item.texto === textFinder))

    if (indice != 0){
        taskArray.splice(indice-1, 0, taskArray.splice(indice, 1)[0])
        localStorage.storageArrayKey = JSON.stringify(taskArray)

        let div1Container = btn.parentNode
        let taskContainer = div1Container.parentNode
        let prevTask = taskContainer.previousElementSibling
        taskContainer.parentNode.insertBefore(taskContainer, prevTask)
    }
}

function moveTaskDown(btn) {//move a task uma casa abaixo e armazena | move task down and store it

    // pega o numero do id do botão, depois pega o texto e procura ele no arrya para descobir o index
    // get the button id number then get the text and search it in the array and take the index
    let MTDInputID = btn.id.match(/\d+/g).join('')
    const textFinder = document.getElementById(`deleteTask${MTDInputID}Text`).textContent
    let indice = (taskArray.findIndex(item => item.texto === textFinder))

    if (indice + 1 < taskArray.length){
        taskArray.splice(indice+1, 0, taskArray.splice(indice, 1)[0])
        localStorage.storageArrayKey = JSON.stringify(taskArray)

        let div1Container = btn.parentNode
        let taskContainer = div1Container.parentNode
        let nextTask = taskContainer.nextElementSibling
        taskContainer.parentNode.insertBefore(nextTask, taskContainer)
    }
}

function checkedInp(btn){//adiciona o estado checked ao local storage | add the state checked to the local storage

    let checkboxId = btn.id.match(/\d+/g).join('')
    const textFinder = document.getElementById(`deleteTask${checkboxId}Text`).textContent
    let indice = (taskArray.findIndex(item => item.texto === textFinder))

    if (btn.checked){
        taskArray[indice].checkbox = 'true'
        localStorage.storageArrayKey = JSON.stringify(taskArray)
    }
    else{
        taskArray[indice].checkbox = 'false'
        localStorage.storageArrayKey = JSON.stringify(taskArray)
    }
}

function deletTask(btn){//deleta a tarefa selecionada | it will delete the task
    const deleteId = btn.id
    const textFinder = document.getElementById(`${deleteId}Text`).textContent

    taskArray = taskArray.filter(item => item.texto !== textFinder)
    localStorage.storageArrayKey = JSON.stringify(taskArray)

    document.getElementById(deleteId).remove()
    localStorage.removeItem(deleteId)

    if(taskArray.length == 0){
        document.getElementById("span").style.display = "block"
    }
}