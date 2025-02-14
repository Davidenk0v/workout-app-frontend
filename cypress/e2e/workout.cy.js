describe("Tests logi", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("user").as("user");
  });
  it("Login y redirección a profile", () => {
    cy.get("@user").then((user) => {
      cy.getByDataTest("email").type(user.email);
      cy.getByDataTest("password").type(user.password);
      cy.getByDataTest("login-button").click();
      cy.url().should("include", "/profile");
    });
  });

  it("Login con email incorrecto", () => {
    cy.get("@user").then((user) => {
      cy.getByDataTest("email").type("malemail.com");
      cy.getByDataTest("password").type(user.password);
      cy.getByDataTest("errorMessage").should("not.exist");
      cy.getByDataTest("login-button").click();
      cy.getByDataTest("email").should("have.class", "border-red-500");
      cy.getByDataTest("errorMessage").should("exist");
    });
  });

  it("Login con password incorrecto", () => {
    cy.get("@user").then((user) => {
      cy.getByDataTest("email").type(user.email);
      cy.getByDataTest("password").type("12222");
      cy.getByDataTest("bad-email").should("not.exist");
      cy.getByDataTest("login-button").click();
      cy.getByDataTest("errorMessage")
        .should("exist")
        .should("have.text", "Usuario o contraseña incorrectos");
    });
  });

  it.only("Registro de usuario", () => {
    cy.visit("/register");
  });
});
