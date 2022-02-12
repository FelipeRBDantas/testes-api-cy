/// <reference types="cypress" />

import contrato from '../contracts/usuarios.contract';
import UsuarioPage from '../support/page-objects/UsuarioPage.page';

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body);
          });
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request('usuarios').then(response => {
               expect(response.status).to.equal(200);
               expect(response.body).to.have.property('usuarios');
          });
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let usuarioPage = UsuarioPage.inserirUsuario();

          cy.cadastrarUsuario(usuarioPage.nomeSobrenomeFaker, usuarioPage.emailFaker, usuarioPage.password, usuarioPage.administrador).then(response => {
               expect(response.status).to.equal(201);
               expect(response.body.message).to.equal('Cadastro realizado com sucesso');
          });
     });

     it('Deve validar um usuário com email inválido', () => {
          let usuarioPage = UsuarioPage.inserirUsuario();
          let emailFaker = usuarioPage.emailFaker;

          cy.cadastrarUsuario(usuarioPage.nomeSobrenomeFaker, emailFaker, usuarioPage.password, usuarioPage.administrador).then(response => {
               cy.cadastrarUsuario(usuarioPage.nomeSobrenomeFaker, emailFaker, usuarioPage.password, usuarioPage.administrador).then(response => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message).to.equal('Este email já está sendo usado');
               });
          });
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let usuarioPage = UsuarioPage.inserirUsuario();

          cy.cadastrarUsuario(usuarioPage.nomeSobrenomeFaker, usuarioPage.emailFaker, usuarioPage.password, usuarioPage.administrador).then(response => {
               cy.request({
                    url: `usuarios/${response.body._id}`,
                    method: 'PUT',
                    body: {
                         "nome": usuarioPage.nomeSobrenomeFaker,
                         "email": usuarioPage.emailFaker,
                         "password": usuarioPage.password,
                         "administrador": usuarioPage.administrador
                    },
               }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso');
               });
          });
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let usuarioPage = UsuarioPage.inserirUsuario();

          cy.cadastrarUsuario(usuarioPage.nomeSobrenomeFaker, usuarioPage.emailFaker, usuarioPage.password, usuarioPage.administrador).then(response => {
               cy.request({
                    url: `usuarios/${response.body._id}`,
                    method: 'DELETE',
               }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso');
                    expect(response.status).to.equal(200);
               });
          });
     });

});
