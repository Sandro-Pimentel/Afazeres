const botoes = document.querySelectorAll("#btn");
const stats = document.querySelectorAll("#stats");
const btnAdd = document.querySelector("#btnAdd");
const caixaTexto = document.querySelector("#input");
const btnComp = document.querySelector("#stats_choice1");
const txtBtnComp = btnComp.parentElement.parentElement.children[1].children[1];
const btnAnd = document.querySelector("#stats_choice2");
const txtBtnAnd = btnAnd.parentElement.parentElement.children[2].children[1];
const c = "✔ COMPLETADO";
const a = "EM ANDAMENTO";
const container = document.querySelector("#container");
let itens = JSON.parse(localStorage.getItem("itens")) || [];

if(itens.length > 0){
    criaTudoNovamente()
    itens.forEach(() => criaTudo())
}


const tira = () =>  botoes.forEach((e) => clickTira(e))
const mudaStatus = () => stats.forEach((e) => clickMuda(e))

tira()
mudaStatus()

caixaTexto.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        criaTudo()
        caixaTexto.value = ""
        txtBtnAnd.className = ""
        txtBtnComp.className = ""
    }
})

btnComp.addEventListener("click", () => {
    if(btnComp.checked === true){
        txtBtnComp.className = "main_choice_txt1"
        txtBtnAnd.className = ""
    }
})

btnAnd.addEventListener("click", () => {
    if(btnAnd.checked === true){
        txtBtnAnd.className = "main_choice_txt2"
        txtBtnComp.className = ""
    }
})

btnAdd.addEventListener("click", () => {
    criaTudo()
    caixaTexto.value = ""
    txtBtnAnd.className = ""
    txtBtnComp.className = ""
})

function criaTudo() {
    const texto = caixaTexto.value;
    
    if (texto != ""){
        const objAtual = {
            "caixaTexto": texto,
            "completo": btnComp.checked,
            "id": itens.length
        }

        const section = estruturaCodigo(container, "section", "main_container_block")
        section.dataset.id = objAtual.id
        const section2 = estruturaCodigo(section, "section", "main_container_block_content")
        const box = estruturaCodigo(section2, "p", "main_container_block_text")
        box.innerHTML = texto
        if(btnComp.checked === true){
            const p = document.createElement("p")
            p.id = "stats"
            p.className = "main_container_block_status1"
            section2.appendChild(p)
            p.innerHTML = c
            btnComp.checked = false
            clickMuda(p)
        } else {
            const p = document.createElement("p")
            p.className = "main_container_block_status2"
            p.id = "stats"
            section2.appendChild(p)
            p.innerHTML = a
            btnAnd.checked = false
            clickMuda(p)
        }
        const botao = criaBtn()
        section.appendChild(botao)
        
        itens.push(objAtual)
        
        clickTira(botao)

        localStorage.setItem("itens", JSON.stringify(itens))
}}

function criaTudoNovamente() {
    itens.forEach((e) => {
        const texto = e.caixaTexto
            
        if (texto != ""){
        
            const section = estruturaCodigo(container, "section", "main_container_block")
            section.dataset.id = e.id
            const section2 = estruturaCodigo(section, "section", "main_container_block_content")
            const box = estruturaCodigo(section2, "p", "main_container_block_text")
            box.innerHTML = texto
    
            if(e.completo === true){
                const p = document.createElement("p")
                p.id = "stats"
                p.className = "main_container_block_status1"
                    section2.appendChild(p)
                    p.innerHTML = c
                btnComp.checked = false
                clickMuda(p)
            } else {
                const p = document.createElement("p")
                p.className = "main_container_block_status2"
                p.id = "stats"
                section2.appendChild(p)
                p.innerHTML = a
                btnAnd.checked = false
                clickMuda(p)
            }
            const botao = criaBtn()
            section.appendChild(botao)
    
            clickTira(botao)
        }
    })
}

function estruturaCodigo(pai, tag, classe) {
    const comando = document.createElement(tag);
    comando.className = classe
    pai.appendChild(comando)
    return comando
}

function clickMuda(e) {
    e.addEventListener("click", () => {
    const idBloco = e.parentElement.parentElement.dataset.id;
    if(e.className == "main_container_block_status2"){
        e.className = "main_container_block_status1"
        e.innerHTML = c
        itens[idBloco].completo = true
    } else {
        e.className = "main_container_block_status2"
        e.innerHTML = a
        itens[idBloco].completo = false
    }

    localStorage.setItem("itens", JSON.stringify(itens))
})
}

function criaBtn() {
    const button = document.createElement("input");
    button.type = "button"
    button.value = "-"
    button.id = "btn"
    button.className = "main_container_block_btn"
    return button
}

function clickTira(e){
    e.addEventListener("click", () => {
        pai = e.parentElement
        pai.remove()
        
        let lista = document.querySelectorAll(".main_container_block");

        let x = itens
        let y = []
        
        if(x.length > 1){
            x = itens.slice(0, parseInt(pai.dataset.id) + 1)
            x.pop()
            y = itens.slice(parseInt(pai.dataset.id) + 1)
            console.log("if")
            console.log(x)
            console.log(y)
        }


        if(itens.length > 2 && x.length !== 0 && y.length !== 0){
            localStorage.setItem("itens", JSON.stringify(x.concat(y)))
            console.log(1)
        } else if(y.length < 1 && itens.length > 1){
            localStorage.setItem("itens", JSON.stringify(x))
            console.log(2)
        } else if(x.length < 1 && itens.length > 1){
            localStorage.setItem("itens", JSON.stringify(y))
            console.log(3)
        } else {
            localStorage.setItem("itens", "[]")
            console.log(4)
        }
        
        itens = JSON.parse(localStorage.getItem("itens"));
        

        if(itens.length > 0){
            lista.forEach((e, i) => e.dataset.id = i)
            itens.forEach((e, i) => e.id = i)
            localStorage.setItem("itens", JSON.stringify(itens))
        }
    })
}
