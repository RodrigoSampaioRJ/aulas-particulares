module.exports = {
    //FUNÇAO PARA CALCULO DE IDADE
    age: function (timestamp) {
        const today = new Date()
        const birth = new Date(timestamp)
        const month = today.getMonth() - birth.getMonth()

        let age = today.getFullYear() - birth.getFullYear()

        if (month < 0 || month == 0 && today.getDate() <= birth.getDate()) {
            age -= 1
        }

        return age
    }
}

