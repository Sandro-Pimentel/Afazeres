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


const clickTira = (e) => e.addEventListener("click", () => {
    pai = e.parentElement
    pai.remove()
})

const tira = () =>  botoes.forEach((e) => clickTira(e))

tira()

const clickMuda = (e) => {
    e.addEventListener("click", () => {
    if(e.className == "main_container_block_status2"){
        e.className = "main_container_block_status1"
        e.innerHTML = c
    } else {
        e.className = "main_container_block_status2"
        e.innerHTML = a
    }
    })
}

const mudaStatus = () => stats.forEach((e) => clickMuda(e))

mudaStatus()

const estruturaCodigo = (pai, tag, classe) => {
    const comando = document.createElement(tag);
    comando.className = classe
    pai.appendChild(comando)
    return comando
}

const criaBtn = () => {
    const button = document.createElement("input");
    button.type = "button"
    button.value = "-"
    button.id = "btn"
    button.className = "main_container_block_btn"
    return button
}

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
    const texto = caixaTexto.value;
    if (texto != ""){
        const section = estruturaCodigo(container, "section", "main_container_block")
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

        caixaTexto.value = ""
    }
})