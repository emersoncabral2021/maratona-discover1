
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
    amount: 30000,
    date: '23/01/2021',
},

]

const transation = {
    incomes(){
        let income = 0
        //pegar todas as transaçõe
        //para cada transação
        transations.forEach(transation => {
           // se for maior que zero 
           if(transation.amount > 0){
            income += transation.amount
           }
        //somar a uma variavel e retorna a variavel 
        })
        
        return income
    },
    expenses(){
        let expense = 0
        //pegar todas as transaçõe
        //para cada transação
        transations.forEach(transation => {
           // se for meno que zero 
           if(transation.amount < 0){
            expense += transation.amount
           }
        //somar a uma variavel e retorna a variavel 
        })
        
        return expense 
       },
    total(){
        return transation.incomes() + transation.expenses()
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
        const cssclass = transation.amount < 0 ? "income" : "expense"

        const amount = util.formatcurrency(transation.amount)
        const html =`
        <td class="descrition">${transation.description}</td>
        <td class="${cssclass}">${amount}</td>
        <td class="date">${transation.date}</td>
        <td><i class="fas fa-minus-circle"></i></td>
    
    `
    return html
    },
    updatebalance(){
        document.getElementById('expensedisplay').innerHTML = util.formatcurrency(transation.expenses()) 
        document.getElementById('incomedisplay').innerHTML = util.formatcurrency(transation.incomes()) 
        document.getElementById('totaldisplay').innerHTML = util.formatcurrency(transation.total()) 
    }
}

const util = {
    formatcurrency(value){
        const sinal = Number(value) < 0 ? "-" : ""

       value = new String(value).replace(/\D/g,"")//acha tudo que nao e numero
       value = Number(value) / 100//
       value = value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})

       return sinal + value
    }
}

transations.forEach(function(transation){
    dom.addtransation(transation)

})

dom.updatebalance()