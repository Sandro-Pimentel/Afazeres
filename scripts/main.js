const botoes = document.querySelectorAll("#btn");
const stats = document.querySelectorAll("#stats");
const c = "✔ COMPLETADO"
const a = "EM ANDAMENTO"

botoes.forEach((e) => e.addEventListener("click", () => {
    pai = e.parentElement
    pai.remove()
}))

stats.forEach((e) => e.addEventListener("click", () => {
    const lista = e.classList
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