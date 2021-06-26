
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
/*const transations = [
    {
     description: 'luz',
     amount: -50000,
     date: '23/01/2021',
},
{
    description: 'web site',
    amount: 500000,
    date: '23/01/2021',
},
{
    description: 'Internet',
    amount: -50000,
    date: '23/01/2021',
},
{
    description: 'carro',
    amount: 30000,
    date: '23/01/2021',
},

]
*/
const storage = {
    get(){
        //transformar um string em objeto com JSON.parse(localStorage()
        return JSON.parse(localStorage.getItem("dev")) || []
        
    },
    set(transition){
        //transformar um objeto em string com JSON.stringify()
        console.log(JSON.stringify(transition))
        localStorage.setItem("dev", JSON.stringify(transition))
    }
}
const transation = {
    all: storage.get(),

    add(transatio){
        transation.all.push(transatio)
        App.reload()

    },
    remove(index){
        transation.all.splice(index, 1)
        App.reload()
    },
    incomes(){
        let income = 0
        //pegar todas as transaçõe
        //para cada transação
        transation.all.forEach(transation => {
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
        transation.all.forEach(transation => {
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
        tr.dataset.index = index
        dom.transationCoteiner.appendChild(tr)
        
    },
    innerhtmltransation(transation,index){
        const cssclass = transation.amount < 0 ? "income" : "expense"

        const amount = util.formatcurrency(transation.amount)
        const html =`
        <td class="descrition">${transation.description}</td>
        <td class="${cssclass}">${amount}</td>
        <td class="date">${transation.date}</td>
        <td><i onclick = "transation.remove(${index})" class="fas fa-minus-circle"></i></td>
    
    `
    return html
    },
    updatebalance(){
        document.getElementById('expensedisplay').innerHTML = util.formatcurrency(transation.expenses()) 
        document.getElementById('incomedisplay').innerHTML = util.formatcurrency(transation.incomes()) 
        document.getElementById('totaldisplay').innerHTML = util.formatcurrency(transation.total()) 
    },
    cleartransation(){
        dom.transationCoteiner.innerHTML = ""
    }
}

const util = {
    formatamount(value){
        value = Number(value) * 100

        return value

    },

    formatdate(date){
        const splitdate = date.split("-")

        return `${splitdate[2]}/${splitdate[1]}/${splitdate[0]}`
    },
    formatcurrency(value){
        const sinal = Number(value) < 0 ? "-" : ""

       value = new String(value).replace(/\D/g,"")//acha tudo que nao e numero
       value = Number(value) / 100//
       value = value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})

       return sinal + value
    }
}



const form = {
    description: document.querySelector("input#descripition"),
    amount: document.querySelector("input#number"),
    date: document.querySelector("input#date"),

    getvalues(){
        return{
        description: form.description.value,
        amount: form.amount.value,
        date: form.date.value,
        }
        
        
    },

   
    validatefields(){
        const {description,amount,date} = form.getvalues()
        if(description.trim() ===  "" || amount.trim() === "" || date.trim() === "" ){
            //criando um erro com "throw new Error()"
            throw new Error("por favor, preencha todos campos")

        }
    }, 
    formatvalues(){
        let {description,amount,date} = form.getvalues()

        amount = util.formatamount(amount)
        date = util.formatdate(date)

        return {
            description,
            amount,
            date
        }
    },
    save(transatio){
        transation.add(transatio)
    },
    clearfielts(){
        form.description.value = ""
        form.amount.value = ""
        form.date.value = ""
    },
    submit(event){
        event.preventDefault()
        //tratamento de error
    try{
        //vereficar se todasas informações foram preenchidas
        form.validatefields()
        //formatar os dados para salvar
        const transation = form.formatvalues()
        //salvar
        form.save(transation)
        //apagar os dados do formulario
        form.clearfielts()
        //modal feche
        Modal.close()
        
    }catch(error){
        alert(error.message)
    }
    
}
    }
   
const App = {
    init (){
    transation.all.forEach(function(transation,index){
    dom.addtransation(transation,index)
    dom.updatebalance()
    storage.set(transation.all)

})
    },
    reload(){
        dom.cleartransation()
        App.init()
    }
}

App.init()
