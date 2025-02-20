describe("Tests users", () => {
  beforeEach(() => {
    cy.loginAdmin();
  });

  it("Eliminar un usuario", () => {
    const id = "23";
    cy.getByDataTest("user-link").click();
    cy.getByDataTest("th-id").contains(id).should("exist");
    cy.getByDataTest(`delete-${id}`).click();
    cy.get("div")
      .contains("¿Estás seguro de eliminar el usuario?")
      .should("exist");
    cy.get("button")
      .contains(/Sí, eliminar/i)
      .click();
    cy.getByDataTest("th-id").contains(id).should("not.exist");
  });
});

describe("User API tests", () => {
  const API_URL = "http://localhost:5173/api/v1/user";
  beforeEach(() => {
    cy.login();
  });

  it("Debe devolver un error al acceder a una ruta de ROL admin", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}/all-users`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("Petición 'me' al cargar la página profile", () => {
    cy.intercept("GET", "/api/v1/user/me").as("me");
    cy.visit("/profile");
    cy.wait("@me").its("response.statusCode").should("eq", 200);
  });
});
