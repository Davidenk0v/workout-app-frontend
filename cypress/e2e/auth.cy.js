describe("Tests login and register form", () => {
  beforeEach(() => {
    cy.fixture("user").as("user");
    cy.fixture("newUser").as("newUser");
    cy.visit("/");
  });

  it("Login y redirección a profile", () => {
    cy.get("@user").then((user) => {
      cy.getByDataTest("email").type(user.email);
      cy.getByDataTest("password").type(user.password);
      cy.getByDataTest("login-button-form").click();
      cy.url().should("include", "/profile");
    });
  });

  it("Login con email con formato inválido", () => {
    cy.get("@user").then((user) => {
      cy.getByDataTest("email").type("malemail.com");
      cy.getByDataTest("password").type(user.password);
      cy.getByDataTest("bad-email").should("not.exist");
      cy.getByDataTest("login-button-form").click();
      cy.getByDataTest("email").should("have.class", "border-red-500");
      cy.getByDataTest("bad-email").should("exist");
    });
  });

  it("Login con password incorrecto", () => {
    cy.get("@user").then((user) => {
      cy.getByDataTest("email").type(user.email);
      cy.getByDataTest("password").type("12222");
      cy.getByDataTest("bad-email").should("not.exist");
      cy.getByDataTest("login-button-form").click();
      cy.getByDataTest("errorMessage")
        .should("exist")
        .should("have.text", "Usuario o contraseña incorrectos");
    });
  });

  it("Registro de usuario con exito", () => {
    cy.visit("/register");
    cy.get("@newUser").then((newUser) => {
      console.log(newUser);
      cy.getByDataTest("email").type(newUser.email);
      cy.getByDataTest("password").type(newUser.password);
      cy.getByDataTest("firstname").type(newUser.firstName);
      cy.getByDataTest("lastname").type(newUser.lastName);
      cy.getByDataTest("username").type(newUser.username);
      cy.getByDataTest("register-button-form").click();
      cy.url().should("include", "/profile");
    });
  });

  it("Mensaje de error al poner un email inválido", () => {
    cy.visit("/register");
    cy.get("@newUser").then((newUser) => {
      cy.getByDataTest("email").type("malemail.com");
      cy.getByDataTest("password").type(newUser.password);
      cy.getByDataTest("firstname").type(newUser.firstName);
      cy.getByDataTest("lastname").type(newUser.lastName);
      cy.getByDataTest("username").type(newUser.username);
      cy.getByDataTest("email").should("have.class", "border-red-500");
      cy.getByDataTest("bad-email-message").should("exist");
    });
  });

  it("User con EMAIL ya existente", () => {
    cy.visit("/register");
    cy.get("@newUser").then((user) => {
      cy.getByDataTest("email").type(user.email);
      cy.getByDataTest("password").type(user.password);
      cy.getByDataTest("firstname").type(user.firstName);
      cy.getByDataTest("lastname").type(user.lastName);
      cy.getByDataTest("username").type(user.username);
      cy.getByDataTest("register-button-form").click();
      cy.getByDataTest("errorMessage").should("exist");
      cy.getByDataTest("errorMessage").should(
        "have.text",
        "Ya existe un usuario con ese email"
      );
    });
  });

  it("User con USERNAME ya existente", () => {
    cy.visit("/register");
    cy.get("@newUser").as("user");
    cy.get("@user").then((user) => {
      cy.getByDataTest("email").type("usermail@mail.es");
      cy.getByDataTest("password").type(user.password);
      cy.getByDataTest("firstname").type(user.firstName);
      cy.getByDataTest("lastname").type(user.lastName);
      cy.getByDataTest("username").type(user.username);
      cy.getByDataTest("register-button-form").click();
      cy.getByDataTest("errorMessage").should("exist");
      cy.getByDataTest("errorMessage").should(
        "have.text",
        "Ya existe un usuario con ese Username"
      );
    });
  });
});
