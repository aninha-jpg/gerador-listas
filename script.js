let cidade = document.getElementById('nometxt');
let horario = document.getElementById('horario');
let quantidade = document.getElementById('quantidadePessoas');
let botao = document.getElementById('incluir');

const hoje = new Date();
const dia = (hoje.getDate() + 1).toString().padStart(2,'0');
const mes = String(hoje.getMonth() + 1).padStart(2,'0');
const ano = hoje.getFullYear();
const dataAtual = `${dia} / ${mes} / ${ano}`;
// armazeno num array para posteriormente mostrar na tela com o appendChild
const lanches = [];
let totalPessoas = 0;

const main = document.querySelector('main');
const textoSaida = document.createElement("pre");
textoSaida.classList.add("textoSaida");
main.appendChild(textoSaida);


function incluirLanche() {
    const nomeCidade = cidade.value.trim().toUpperCase();
    const quantidadeLanche = parseInt(quantidade.value);
    const hora = formatarHora(horario.value.trim());

    if(!nomeCidade || !hora || quantidadeLanche <= 0){
    alert("Preencha todos os campos corretamente!");
    return;
}
    // add no array
    lanches.push({nomeCidade, quantidadeLanche, hora});
    totalPessoas += quantidadeLanche;

    let texto = `*Lanches: ${dataAtual}*\n\n`;
    for(let i = 0; i<lanches.length; i++){
        let l = lanches[i];
        texto += `${l.nomeCidade}: ${l.quantidadeLanche} pessoas sai às ${l.hora}.\n`;
    }
    texto += `\nTotal: ${totalPessoas} lanches.`;

    textoSaida.textContent = texto;

    // limpa os inputs

    cidade.value = "";
    quantidade.value = "";
    horario.value = "";
};

botao.addEventListener('click', incluirLanche);

function formatarHora(hora) {
    let [h, m] = hora.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return hora;
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}




