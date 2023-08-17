const botoes = document.querySelectorAll("#btn");
const stats = document.querySelectorAll("#stats");
const btnAdd = document.querySelector("#btnAdd");
const caixaTexto = document.querySelector("#input");
const btnComp = document.querySelectorAll("#stats_choice1")[1];
const btnAnd = document.querySelectorAll("#stats_choice2")[2];
const c = "✔ COMPLETADO";
const a = "EM ANDAMENTO";

botoes.forEach((e) => e.addEventListener("click", () => {
    pai = e.parentElement
    pai.remove()
}))

stats.forEach((e) => e.addEventListener("click", () => {
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

const estruturaCodigo = (pai, tag, classe) => {
    const comando = document.createElement(tag);
    comando.className = classe
    pai.appendChild(comando)
}

btnAdd.addEventListener("click", () => {
    const texto = caixaTexto.value;
    const container = document.querySelector("#container");
    estruturaCodigo(container, "section", "main_container_block")
    const sec = document.querySelectorAll(".main_container_block")
    const section = sec[(sec.length)-1]
    estruturaCodigo(section, "section", "main_container_block_content")
    const sec2 = document.querySelectorAll(".main_container_block_content")
    const section2 = sec2[(sec.length)-1]
    estruturaCodigo(section2, "p", "main_container_block_text")
    estruturaCodigo(section2, "p", "main_container_block_status2")
    const button = document.createElement("input")
    button.type = "button"
    button.value = "-"
    button.className = "main_container_block_btn"
    button.id = "btn"
    estruturaCodigo(section, "input", "main_container_block_btn")
    const boxes = document.querySelectorAll(".main_container_block_text")
    boxes[(boxes.length)-1].innerHTML = texto
})





/* <section class="main_container_block">
<section class="main_container_block_content">
<p class="main_container_block_text"> Faça 25 chutes em partidas online durante o evento Champions Road 2023  </p>
<p class="main_container_block_status2" id="stats"> EM ANDAMENTO </p>
</section>
<input type="button" value="-" class="main_container_block_btn" id="btn">
</section> */
