const botoes = document.querySelectorAll("#btn");
const stats = document.querySelectorAll("#stats");
const btnAdd = document.querySelector("#btnAdd");
const caixaTexto = document.querySelector("#input");
const btnComp = document.querySelector("#stats_choice1");
const txtBtnComp = btnComp.parentElement.children[1];
const btnAnd = document.querySelector("#stats_choice2");
const txtBtnAnd = btnAnd.parentElement.children[3];
const c = "✔ COMPLETADO";
const a = "EM ANDAMENTO";
const container = document.querySelector("#container");
let itens = JSON.parse(localStorage.getItem("itens")) || [];

criaTudoNovamente()

itens.forEach(() => criaTudo())

const tira = () =>  botoes.forEach((e) => clickTira(e))
const mudaStatus = () => stats.forEach((e) => clickMuda(e))

tira()
mudaStatus()

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

        clickTira(botao)

        itens.push(objAtual)

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

        const x = itens.slice(0, parseInt(pai.dataset.id)) || itens
        const y = itens.slice(parseInt(pai.dataset.id) + 1) || []

        if(itens.length > 2 && x.length !== 0 && y.length !== 0){
            localStorage.setItem("itens", JSON.stringify(x.concat(y)))
        } else if(y.length < 1 && itens.length > 1){
            localStorage.setItem("itens", JSON.stringify(itens[0]))
        } else if(x.length < 1 && itens.length > 1){
            localStorage.setItem("itens", JSON.stringify([itens[itens.length-1]]))
        } else {
            localStorage.setItem("itens", "[]")
        }

        itens = JSON.parse(localStorage.getItem("itens"));
    })
}
