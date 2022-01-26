const campoCep = document.querySelector('#cep')

campoCep.addEventListener("blur", e => {
    const cep = tiraHifen(campoCep)
    console.log(cep)
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    const showData = result => {
        for(const campo in result) {
            if(document.querySelector(`#${campo}`)) {
                document.querySelector(`#${campo}`).value = result[campo]
            }
        }
    }

    async function fetchCep() {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`, options)
            if (!response.status) {
                console.log('CEP Inválido');
            }else {
                const data = await response.json()
                console.log(showData(data))
                return data
            }
        } catch(error) {
            console.log(error)
        }
    }
    fetchCep()
})

const tiraHifen = cep => {
    const cepSemHifen = cep.value.replace('-','')
    return cepSemHifen
}