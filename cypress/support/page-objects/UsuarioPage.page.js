var faker = require('faker');

class UsuarioPage {

    inserirUsuario() {
        let nomeSobrenomeFaker = `${faker.name.firstName()} ${faker.name.lastName()}`

        return {
            nomeSobrenomeFaker: nomeSobrenomeFaker,
            emailFaker: faker.internet.email(nomeSobrenomeFaker),
            password: "teste",
            administrador: "true"
        };
    }

}

export default new UsuarioPage();