/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add("getByDataTest", (value) => {
  return cy.get(`[data-test=${value}]`);
});

Cypress.Commands.add("deleteUser", (user) => {
  cy.request({
    method: "DELETE",
    url: `http://localhost:8080/tests/delete/user`,
    body: user,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add(
  "login",
  (email = "juan.perez@example.com", password = "SecurePass123!") => {
    cy.visit("/"); // Ir a la página de login
    cy.getByDataTest("email").type(email);
    cy.getByDataTest("password").type(password);
    cy.getByDataTest("login-button-form").click();
    cy.url().should("include", "/profile");
  }
);

Cypress.Commands.add(
  "loginAdmin",
  (email = "luis@eviden.com", password = "1234") => {
    cy.visit("/"); // Ir a la página de login
    cy.getByDataTest("email").type(email);
    cy.getByDataTest("password").type(password);
    cy.getByDataTest("login-button-form").click();
    cy.url().should("include", "/profile");
  }
);

Cypress.Commands.add("sessionAdmin", () => {
  cy.session("adminSession", () => {
    cy.loginAdmin();
  });
});

Cypress.Commands.add("sessionUser", () => {
  cy.session("adminSession", () => {
    cy.login();
  });
});
