describe("Tests workout", () => {
  beforeEach(() => {
    cy.loginAdmin();
  });

  it("Crear un workout", () => {
    cy.getByDataTest("workout-link").click();
    cy.getByDataTest("new-workout").click();
    cy.get("#swal-input1").type("Testeo");
    cy.get("#swal-input2").type("Testeo");
    cy.get("#swal-input4").type("Testeo");
    cy.get("button")
      .contains(/Guardar/i)
      .click();
    cy.getByDataTest("workout-card")
      .contains(/Testeo/i)
      .should("exist");
  });

  it("Eliminar un workout", () => {
    cy.getByDataTest("workout-link").click(); // Navega a la página de workouts

    cy.getByDataTest("workout-card")
      .contains(/Testeo/i)
      .should("exist");
    cy.getByDataTest(`delete-Testeo`).click();
    cy.get("button")
      .contains(/Sí, eliminar/i)
      .click();
    cy.getByDataTest("workout-card")
      .contains(/Testeo/i)
      .should("not.exist");

    cy.getByDataTest("workout-card")
      .contains(/Testeo/i)
      .should("not.exist");
  });
});

describe("Workout API Tests", () => {
  const API_URL = "http://localhost:8080/api/v1/workout";
  const userId = 2; // Cambiar esto según el usuario de prueba
  let token;

  before(() => {
    cy.window().then((win) => {
      cy.sessionAdmin().then(() => {
        const tokens = JSON.parse(win.localStorage.getItem("token"));
        token = tokens.token;
      });
    });
  });

  beforeEach(() => {
    cy.visit("/profile");
  });

  it("Debe obtener un workout por ID", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}/2`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.workout).to.have.property("idWorkout", 2);
    });
  });

  it("Debe obtener todos los workouts", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}/all-workouts`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("Debe obtener los workouts de un usuario específico", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}/user-workouts/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("Debe crear un nuevo workout", () => {
    cy.request({
      method: "POST",
      url: `${API_URL}/create`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {
        name: "Workout de prueba",
        description: "workout creado desde test",
        result: "tu resultado",
        user: userId,
        date: new Date(),
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("idWorkout");
    });
  });

  it("Debe actualizar un workout existente", () => {
    cy.request({
      method: "PUT",
      url: `${API_URL}/44`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {
        name: "Workout actualizado",
        description: "workout actualizad desde test",
        result: "tu resultado actualizado",
        user: userId,
        date: new Date(),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.requestBody).to.contains("Workout actualizado");
      expect(response.body).to.have.property("name", "Workout actualizado");
    });
  });

  it("Debe eliminar un workout por ID", () => {
    cy.request({
      method: "DELETE",
      url: `${API_URL}/64`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Debe devolver un error si no se envía el token", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}/2`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("Interceptar workouts para introducirlos por fixture", () => {
    cy.intercept("GET", "api/v1/workout/user-workouts/2", {
      fixture: "workouts.json",
    }).as("myWorkouts");
    cy.getByDataTest("workout-link").click();
    cy.wait("@myWorkouts").then((res) => {
      expect(res.response.body).to.be.an("array");
    });
  });
});
