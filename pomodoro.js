

/* Relogio mecanismo | clock mechanism*/

const segundosInput = document.getElementById("seg")
const minutosInput = document.getElementById("min")
const playInp = document.getElementById("play")
const pauseInp = document.getElementById("pausar")
const siteTitle = document.getElementById('title')

var pauseSeg = null
var pauseMin = null

var progresso = 360 /*Progresso do circulo do relogio | Clock circle progress*/
var modoAtual = "foco" /*modo atual | current mode*/
var runs = 1 /*quantas vezes ocorreu a troca de modos*/
var troca = true

function play(){
    /*ao apertar play mostra o botão pause | show pause button when you press play*/
    pauseInp.style.zIndex = '2'
    pauseInp.style.opacity = '0.9'
    playInp.style.opacity = '0'

    function seg(){//segundos

    //botão next mode
    /*- Total possui 8 modos, sendo 1-foco, 2-pausa, 3-foco... 8-pausa longa.
      - There's 8 modes, 1-focus, 2-break, 3-focus... 8-long break */

        if (troca == true){//Quando você avança um modo a var 'troca' recebe true | When you switch to a different mode, the variable 'troca' receives true.
            
            if ([1,3,5,7].includes(runs)){//se var runs for igual a 1,3,5,7, significa que é o modo atual é Foco | if var runs is equal 1,3,5,7, that means the mode is Focus
                clearInterval(pauseSeg) 
                focoConfig()
                modoAtual = "foco"
                troca = false
            }
            else if ([2,4,6].includes(runs)){
                clearInterval(pauseSeg) 
                pausaConfig()
                modoAtual = "pausa"
                troca = false
            }
            else if (runs == 8){
                clearInterval(pauseSeg) 
                pausaLongaConfig()
                modoAtual = "pausaLonga"
                troca = false
            } 
        }
        tempo_em_seg = tempo_em_seg - 1
        siteTitle.innerHTML = `Pomodoro | ${tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`
        segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        /*- esse 'toLocaleString...' serve para adicionar duas casas de 0 em segundos, assim ao invez de ficar 5s/m, fica 05s/m
          - 'toLocaleString...' is used to add leading zeros to seconds. Instead of displaying as 5s/m, it will display as 05s/m*/


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
            progresso = progresso - 0.4
            document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
        }

    //quando o tempo acaba, troca de modo | when the timer ends, it switch the mode
        if (tempo_em_min == 0 && tempo_em_seg == 0){
            clearInterval(pauseSeg) 
            
            var audio = document.getElementById('audio')
            audio.play()
            runs = runs + 1
            
            if (runs > 8){
                runs = 1
            }

            if (runs == 8) {
                pausaLongaConfig()
                modoAtual = 'pausaLonga'
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
        if (tempo_em_min == 0) {//pausa se os minutos chegarem a 0 | Pause when the minutes reach 0
            
        }
        if(tempo_em_seg == 0){//reseta se os segundos chegarem a 0 | reset when the seconds reach 0
            tempo_em_seg = 60
            tempo_em_min = tempo_em_min - 1
            minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        }
    }

    //Configuração de cada modo | Configuration of each mode
    function pausaConfig(){

            progresso = 360
            tempo_em_min = 4
            tempo_em_seg = 59

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

            pauseSeg = setInterval(seg, 1000)
            
    }
    function focoConfig(){
            
            progresso = 360
            tempo_em_min = 24
            tempo_em_seg = 60

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

            pauseSeg = setInterval(seg, 1000)
            
    }
    function pausaLongaConfig(){
            
            progresso = 360
            tempo_em_min = 14
            tempo_em_seg = 60

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
            
            pauseSeg = setInterval(seg, 1000)       
    }

    pauseSeg = setInterval(seg, 1000)
    /*- É necessario atribuir o 'setInterval' a uma variavel, para que você possa pausalo com o 'clearInterval()'
      - You need to assign 'setInterval' to a variable , so you can pause it with 'clearInterval()'*/
}




// Pausa o relogio | Pause the clock
document.getElementById("pausar").addEventListener("click", pausar)
function pausar() {
    clearInterval(pauseSeg) 
    


    // Mostra botão play | show the play button
    pauseInp.style.zIndex = '0'
    pauseInp.style.opacity = '0'
    playInp.style.opacity = '0.9'
}


// Reset no relogio | clock reset
document.getElementById("reset").addEventListener('click', reset)
function reset(){

    if (modoAtual == 'foco'){//reseta o relogio caso o modo seja foco | reset if the mode is 'focus'
        tempo_em_seg = 59
        tempo_em_min = 24
        progresso = 360

        minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
        
        clearInterval(pauseSeg) 
        
        troca = true
        play()
    }
    else if (modoAtual == 'pausa'){//reseta o relogio caso o modo seja pausa | reset if the mode is 'break'
        tempo_em_seg = 59
        tempo_em_min = 4
        progresso = 360

        minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
        
        clearInterval(pauseSeg) 
        
        troca = true
        play()
    }

    else if (modoAtual == 'pausaLonga'){//reseta o relogio caso o modo seja pausa longa | reset if the mode is 'long break'
        tempo_em_seg = 59
        tempo_em_min = 14
        progresso = 360

        minutosInput.innerHTML = tempo_em_min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        segundosInput.innerHTML = tempo_em_seg.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        document.documentElement.style.setProperty("--pregresso", `${progresso}deg`)
        
        clearInterval(pauseSeg) 
        
        troca = true
        play()
    }

}


/* Troca de modo | mode switch */
document.getElementById("next_mode_inp").addEventListener('click', next_mode)
function next_mode(){
    
    troca = true
    if (runs >= 8){
        runs = 1
    }
    else{
        runs = runs + 1
    }
}



/*---------------TAREFAS | TASKS---------------*/

const tarefaContainer = document.getElementById("tarefa")
const taskInput = document.getElementById("input_task")

var taskCount = 0 //Conta quantas tarefas existem e também atribui a tarefa seu proprio numero | Count how many tasks exist and also assign each task its own number.
taskInput.addEventListener('keydown', (event) =>{
    if (event.key === 'Enter'){
        event.preventDefault()  
        addTask()
    }
})
function addTask(){

    if (taskInput.value.trim() == ""){//caso o usuario não por nada
        setTimeout(()=>{
            taskInput.classList.add('shake-animation')
        },5)
        taskInput.classList.remove('shake-animation')
        taskInput.value = ''
    }

    else{
        taskCount = taskCount + 1
        if (taskCount >= 1){
            document.getElementById("span").style.display = "none"
        }
        else{
            document.getElementById("span").style.display = "block"
        }
        
        // Cria a os elementos e adciona no DOM | it'll create the elements and add to the DOM
        var labelCreate = document.createElement("label")
        var inputCreate = document.createElement("input")
        var taskText = document.createElement(`p`)
        var moveUp = document.createElement('button')
        var moveDown = document.createElement('button')
        var deleteInp = document.createElement('input')
        var div1 = document.createElement('div')
        var div2 = document.createElement('div')
        

        labelCreate.setAttribute("for", `checkbox${taskCount}`)
        labelCreate.setAttribute("id", `deleteTask${taskCount}`)

        inputCreate.setAttribute("type" , `checkbox`)
        inputCreate.setAttribute("name" , `checkbox`)
        inputCreate.setAttribute("id" , `checkbox${taskCount}`)
        inputCreate.setAttribute("class" , `checkbox`)

        deleteInp.setAttribute("type" , "button")
        deleteInp.setAttribute("class" , "deleteTask")
        deleteInp.setAttribute("id" , `deleteTask${taskCount}`)
        deleteInp.setAttribute("onclick" , `deletTask(this)`)

        moveUp.setAttribute("onclick" , `moveTaskUp(this)`)
        moveUp.setAttribute("id" , `moveTaskUp`)
        moveDown.setAttribute("onclick" , `moveTaskDown(this)`)
        moveDown.setAttribute("id" , `moveTaskDown`)

        div1.setAttribute('id', 'taskDiv1')
        div2.setAttribute('id', 'taskDiv2')
        
        taskText.innerHTML = taskInput.value

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
}

function moveTaskUp(btn) {//coloca a task uma casa acima
    var div1Container = btn.parentNode
    var taskContainer = div1Container.parentNode
    var prevTask = taskContainer.previousElementSibling
    taskContainer.parentNode.insertBefore(taskContainer, prevTask)
}

function moveTaskDown(btn) {//coloca a task uma casa abaixo
    var div1Container = btn.parentNode
    var taskContainer = div1Container.parentNode
    var nextTask = taskContainer.nextElementSibling
    taskContainer.parentNode.insertBefore(nextTask, taskContainer)
}

function deletTask(btn){//deleta a tarefa selecionada | it will delete the task
    var deletId = btn.id
    document.getElementById(deletId).remove()
}