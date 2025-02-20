describe("Tests profile", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Editar profile", () => {
    cy.visit("/profile").wait(2000);
    cy.getByDataTest("edit-button").click();
    cy.getByDataTest("first-name-input").clear().type("Testeo");
    cy.getByDataTest("last-name-input").clear().type("Testeo");
    cy.getByDataTest("succesfully").should("not.exist");
    cy.getByDataTest("save-button").click();
    cy.getByDataTest("name-lastname").should("have.text", "Testeo Testeo");
    cy.getByDataTest("succesfully").should("exist");
  });

  it("Eliminar cuenta de usuario", () => {
    cy.visit("/profile").wait(2000);
    cy.getByDataTest("delete-button").click();
    cy.get("div")
      .contains("¿Estás seguro de eliminar tu cuenta?")
      .should("exist");
  });
});

describe("Tests rutas en navbar", () => {
  beforeEach(() => {
    cy.loginAdmin();
  });

  it("Ver que al registrarte se muestran las rutas y no login y register", () => {
    cy.getByDataTest("login-button").should("not.exist");
    cy.getByDataTest("register-button").should("not.exist");
    cy.getByDataTest("profile-link").should("exist");
    cy.getByDataTest("workout-link").should("exist");
    cy.getByDataTest("logout-button").should("exist");
  });

  it('Ruta Entrenos "/my-workouts"', () => {
    cy.getByDataTest("workout-link").click();
    cy.url().should("include", "my-workouts");
  });

  it('Ruta Usuarios "/users"', () => {
    cy.getByDataTest("user-link").click();
    cy.url().should("include", "users");
  });

  it('Ruta Profile "/profile"', () => {
    cy.getByDataTest("profile-link").click();
    cy.url().should("include", "profile");
  });

  it("Logout", () => {
    cy.getByDataTest("logout-button").should("exist");
    cy.getByDataTest("logout-button").click();
  });
});
