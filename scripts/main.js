const botao = document.querySelector("#btn");

botao.addEventListener("click", () => {
    pai = botao.parentElement
    pai.remove()
})