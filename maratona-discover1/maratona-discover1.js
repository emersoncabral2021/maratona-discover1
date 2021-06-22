
/* função de abri e fechar modal com toggle
function modal() {
    var element = document.querySelector('.modal-overlay');
    element.classList.toggle("active");
  }*/
const Modal = {
    open(){
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const transations = [
    {id: 1,
     description: 'luz',
     amount: -50000,
     date: '23/01/2021',
},
{id: 2,
    description: 'web site',
    amount: 500000,
    date: '23/01/2021',
},
{id: 3,
    description: 'Internet',
    amount: -50000,
    date: '23/01/2021',
},
{id: 4,
    description: 'carro',
    amount: -70000,
    date: '23/01/2021',
},
]

const transation = {
    incomes(){
        //somar entradas
    },
    expenses(){
        //somar saida
    },
    total(){
        //entradas - saida
    }
}

const dom = {
    transationCoteiner: document.querySelector('#data_table tbody'),
    addtransation(transation, index){
        const tr = document.createElement('tr')
        tr.innerHTML = dom.innerhtmltransation(transation)

        dom.transationCoteiner.appendChild(tr)
        
    },
    innerhtmltransation(transation){
        const cssclass = transation.amount > 0 ? "income" : "expense"

        const amount = util.formatcurrency(transation.amount)
        const html =`
        <td class="descrition">${transation.description}</td>
        <td class="${cssclass}">${amount}</td>
        <td class="date">${transation.date}</td>
        <td><i class="fas fa-minus-circle"></i></td>
    
    `
    return html
    }
}

const util = {
    formatcurrency(value){
        const sinal = Number(value) > 0 ? "-" : ""

       value = new String(value).replace(/\D/g,"")//acha tudo que nao e numero
       value = Number(value) / 100//
       value = value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})

       return sinal + value
    }
}

transations.forEach(function(transation){
    dom.addtransation(transation)

})