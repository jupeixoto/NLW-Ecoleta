function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) //função anonima q retorna um valor
        .then(states => {

            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
    })
}

populateUfs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json()) //função anonima q retorna um valor
        .then(cities => {

            for(const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li") 

for(const item of itemsToCollect){
    item.addEventListener("click", handSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] //variavel q pode mudar de valor

function handSelectedItem(event){
    const itemLi = event.target

    //add ou remover uma classe com js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)


    //verificar se existem itens selecionados, se sim pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item =>{
        const itemFound = item == itemId //sera true ou false
        return itemFound
    })

    //se ja tiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else{ //se não tiver selecionado, add a seleção
        selectedItems.push(itemId)
    } 

    //console.log('ITENS SELECIONADOS: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}