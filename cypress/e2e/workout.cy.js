describe("Tests login and register form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("user").as("user");
    cy.fixture("newUser").as("newUser");
  });

  it("Login y redirección a profile", () => {
    cy.get("@user").then((user) => {
      cy.getByDataTest("email").type(user.email);
      cy.getByDataTest("password").type(user.password);
      cy.getByDataTest("login-button").click();
      cy.url().should("include", "/profile");
    });
  });

  it("Login con email con formato inválido", () => {
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

  it("Registro de usuario con exito", () => {
    cy.visit("/register");
    cy.get("@newUser").then((newUser) => {
      console.log(newUser);
      cy.getByDataTest("email").type(newUser.email);
      cy.getByDataTest("password").type(newUser.password);
      cy.getByDataTest("firstname").type(newUser.firstName);
      cy.getByDataTest("lastname").type(newUser.lastName);
      cy.getByDataTest("username").type(newUser.username);
      cy.getByDataTest("register-button").click();
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
      cy.getByDataTest("register-button").click();
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
      cy.getByDataTest("register-button").click();
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
    cy.session("login", () => {
      cy.request("POST", "http://localhost:8080/auth/login", {
        email: "luis@eviden.com",
        password: "1234",
      }).then((response) => {
        cy.setCookie("token", JSON.stringify(response.body));
        window.localStorage.setItem("token", JSON.stringify(response.body));
      });
    });
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
    cy.session("login", () => {
      cy.request("POST", "http://localhost:8080/auth/login", {
        email: "luis@eviden.com",
        password: "1234",
      }).then((response) => {
        cy.setCookie("token", JSON.stringify(response.body));
        window.localStorage.setItem("token", JSON.stringify(response.body));
      });
    });
    cy.visit("/profile");
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
});

describe("Tests workout", () => {
  beforeEach(() => {
    cy.session("login", () => {
      cy.request("POST", "http://localhost:8080/auth/login", {
        email: "luis@eviden.com",
        password: "1234",
      }).then((response) => {
        cy.setCookie("token", JSON.stringify(response.body));
        window.localStorage.setItem("token", JSON.stringify(response.body));
      });
    });
    cy.visit("/profile");
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

describe.only("Tests users", () => {
  beforeEach(() => {
    cy.session("login", () => {
      cy.request("POST", "http://localhost:8080/auth/login", {
        email: "luis@eviden.com",
        password: "1234",
      }).then((response) => {
        cy.setCookie("token", JSON.stringify(response.body));
        window.localStorage.setItem("token", JSON.stringify(response.body));
      });
    });
    cy.visit("/profile");
  });

  it("Eliminar un usuario", () => {
    const id = "10";
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
