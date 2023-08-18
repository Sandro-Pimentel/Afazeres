let botoes = document.querySelectorAll("#btn");
let stats = document.querySelectorAll("#stats");
const btnAdd = document.querySelector("#btnAdd");
const caixaTexto = document.querySelector("#input");
const btnComp = document.querySelector("#stats_choice1");
const btnAnd = document.querySelector("#stats_choice2");
const c = "✔ COMPLETADO";
const a = "EM ANDAMENTO";
const container = document.querySelector("#container");

const tira = () => botoes.forEach((e) => e.addEventListener("click", () => {
    pai = e.parentElement
    pai.remove()
}))

tira()

const mudaStatus = () => stats.forEach((e) => e.addEventListener("click", () => {
    const lista = e.classList;
    if(lista == "main_container_block_status2"){
        lista.remove("main_container_block_status2")
        lista.add("main_container_block_status1")
        e.innerHTML = c
    } else {
        lista.remove("main_container_block_status1")
        lista.add("main_container_block_status2")
        e.innerHTML = a
    }
}))

mudaStatus()

const estruturaCodigo = (pai, tag, classe) => {
    const comando = document.createElement(tag);
    comando.className = classe
    pai.appendChild(comando)
}

const criaBtn = () => {
    const button = document.createElement("input");
    button.type = "button"
    button.value = "-"
    button.id = "btn"
    button.className = "main_container_block_btn"
    return button
}

document.querySelector("h1").addEventListener("click", () => {
    console.log("Deu?")
    criaBtn()
})

btnAdd.addEventListener("click", () => {
    const texto = caixaTexto.value;
    estruturaCodigo(container, "section", "main_container_block")
    const sec = document.querySelectorAll(".main_container_block")
    const section = sec[(sec.length)-1]
    estruturaCodigo(section, "section", "main_container_block_content")
    const sec2 = document.querySelectorAll(".main_container_block_content")
    const section2 = sec2[(sec.length)-1]
    estruturaCodigo(section2, "p", "main_container_block_text")
    estruturaCodigo(section2, "p", "main_container_block_status2")
    const boxes = document.querySelectorAll(".main_container_block_text")
    boxes[(boxes.length)-1].innerHTML = texto
    if(btnComp.checked === true){
        const p = document.createElement("p")
        p.id = "stats"
        p.className = "main_container_block_status1"
        section2.appendChild(p)
        p.innerHTML = c
        btnComp.checked = false
    } else {
        const p = document.createElement("p")
        p.id = "stats"
        p.className = "main_container_block_status2"
        section2.appendChild(p)
        p.innerHTML = a
        btnAnd.checked = false
    }
    section.appendChild(criaBtn())

    botoes = document.querySelectorAll("#btn")
    stats = document.querySelectorAll("#stats")

    tira()
    mudaStatus()

    caixaTexto.value = ""
})
