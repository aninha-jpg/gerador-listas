let cidade = document.getElementById('nometxt');
let horario = document.getElementById('horario');
let motorista = document.getElementById('motorista');
let carro = document.getElementById('carro');
let botao = document.getElementById('incluir');
let lancheEspecial = document.getElementById('lancheEspecial');

const hoje = new Date();
const dia = hoje.getDate().toString().padStart(2,'0');
const mes = String(hoje.getMonth() + 1).padStart(2,'0');
const ano = hoje.getFullYear();
const dataAtual = `${dia} / ${mes} / ${ano}`;
// armazeno num array para posteriormente mostrar na tela com o appendChild
const viagens = [];

const main = document.querySelector('main');
const textoSaida = document.createElement("pre");
textoSaida.classList.add("textoSaida");
main.appendChild(textoSaida);


function incluirViagem() {
    const nomeCidade = cidade.value.trim().toUpperCase();
    const motoristaInput = capitalizarNomeCompleto(motorista.value.trim());
    const carroInput = capitalizarNomeCompleto(carro.value.trim());
    const horaFormatada = formatarHora(horario.value.trim());
    let localLanche = definirLocalLanche(horaFormatada);

    if(!nomeCidade || !horaFormatada || !motoristaInput || !carroInput){
    alert("Preencha todos os campos corretamente!");
    return;
    }

    if (lancheEspecial.checked) {
        localLanche = "*(Lanche na padaria)*";
    }
    // add no array
    viagens.push({nomeCidade, motoristaInput, carroInput,  hora: horaFormatada, localLanche});

    let texto = `*Viagens ${dataAtual} Disponível* \n\n`;
    for(let i = 0; i < viagens.length; i++){
        let v = viagens[i];
        texto += `${v.nomeCidade}: ${v.motoristaInput}/${v.carroInput} sai às ${v.hora}. ${v.localLanche}\n\n`;
    }
    textoSaida.textContent = texto;

    // limpa os inputs

    cidade.value = "";
    motorista.value = "";
    carro.value = "";
    horario.value = "";
    lancheEspecial.checked = false;
};

function capitalizarNomeCompleto(texto) {
    if (!texto) return "";
    return texto
        .split(" ")
        .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");
}

function formatarHora(hora) {
    let [h, m] = hora.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return hora;
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}

function definirLocalLanche(hora) {
    if (!hora) return "";

    const [h, m] = hora.split(":").map(Number);
    const totalMinutos = h * 60 + m;

    if (totalMinutos <= 360) {
        return "*(Lanche no hospital).*";
    } else if (totalMinutos > 360 && totalMinutos <= 450) { 
        return "*(Lanche na padaria).*";
    } else {
        return "";
    }
}


botao.addEventListener('click', incluirViagem);

