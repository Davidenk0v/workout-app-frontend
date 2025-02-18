describe.only("Tests login and register form", () => {
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

  it("Usuer con USERNAME ya existente", () => {
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

describe("Workout API Tests", () => {
  const API_URL = "http://localhost:8080/api/v1/workout";
  const userId = 2; // Cambiar esto según el usuario de prueba
  let token;

  before(() => {
    cy.window().then((win) => {
      cy.loginAdmin().then(() => {
        const tokens = JSON.parse(win.localStorage.getItem("token"));
        token = tokens.token;
      });
    });
  });

  beforeEach(() => {
    cy.visit("/");
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
      url: `${API_URL}/40`,
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
      url: `${API_URL}/38`,
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
});

describe("User API tests", () => {
  const API_URL = "http://localhost:5173/api/v1/user";
  let token;
  before(() => {
    cy.window().then((win) => {
      cy.login().then(() => {
        const tokens = JSON.parse(win.localStorage.getItem("token"));
        console.log(tokens);
        token = tokens.token;
      });
    });
  });

  it.only("Debe devolver un error al acceder a una ruta de ROL admin", () => {
    cy.request({
      method: "GET",
      url: `${API_URL}/all-users`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
