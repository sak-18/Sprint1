describe("App Home Page", function () {
  it("successfully loads", function () {
    cy.visit("/");
  });
  it("Home page contains login link", function () {
    cy.visit("/");
    cy.get(".nav-link").contains("LOGIN", { timeout: 10000 }).click();
    cy.contains("Google +");
  });
  it("Home page contains register link", function () {
    cy.visit("/");
    cy.get(".nav-link").contains("REGISTER", { timeout: 10000 }).click();
    cy.contains("Get Started");
  });
});

describe("Login Page", function () {
  it("successfully loads", function () {
    cy.visit("/login-page");
  });

  it("Empty Username not allowed", function () {
    cy.visit("/login-page");
    cy.get(":nth-child(1) > .form-control").invoke("val", "");
    cy.get(":nth-child(2) > .form-control").type("test_password");
    var infoboxDisplayed = false;
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Empty Username");
      infoboxDisplayed = true;
    });
    cy.get(".btn-gplus").click();
    cy.should(() => {
      expect(infoboxDisplayed).to.be.true;
    });
  });

  it("Empty Password not allowed", function () {
    cy.visit("/login-page");
    cy.get(":nth-child(2) > .form-control").invoke("val", "");
    cy.get(":nth-child(1) > .form-control").type("test_username");
    var infoboxDisplayed = false;
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Empty Password");
      infoboxDisplayed = true;
    });
    cy.get(".btn-gplus").click();
    cy.should(() => {
      expect(infoboxDisplayed).to.be.true;
    });
  });
});

describe("Discussion Page", function () {
  beforeEach(function () {
    cy.server(); // enable response stubbing
    cy.route({
      method: "GET", // Route all GET requests
      url: "/", // that have a URL that matches '/'
      response: "fixture:questions-list.json", // stub the responses using responses
    });
    cy.route({
      method: "GET", // Route all GET requests
      url: "/5e7db77ec7117606c88abe02", // that have a URL that matches '/:questionId'(math question)
      response: "fixture:math-question.json", // stub the responses using responses
    });
    cy.route({
      method: "GET", // Route all GET requests
      url: "/5e805259cfcda123c0c6905d", // that have a URL that matches '/:questionId'(SE question)
      response: "fixture:se-question.json", // stub the responses using responses
    });
  });

  it("successfully loads discussion page", function () {
    cy.visit("/discussion-page");
  });

  it("questions  are visible", function () {
    cy.visit("/discussion-page");
    cy.contains("A math question").should("be.visible");
    cy.contains("How do you rate the course IS341 Software Engineering").should(
      "be.visible"
    );
  });

  it("Clicking question redirects to the  specific question", function () {
    cy.visit("/discussion-page");
    cy.contains(
      "How do you rate the course IS341 Software Engineering"
    ).click();
    cy.url().should(
      "include",
      "/discussion-page/question/5e805259cfcda123c0c6905d"
    );
  });
});

describe("Add an answer page", function () {
  beforeEach(function () {
    cy.server(); // enable response stubbing
    cy.route({
      method: "GET", // Route all GET requests
      url: "/5e805259cfcda123c0c6905d", // that have a URL that matches '/:questionId'(SE question)
      response: "fixture:se-question.json", // stub the responses using responses
    });
  });

  it("successfully loads", function () {
    cy.visit("/discussion-page/question/5e805259cfcda123c0c6905d");
    cy.contains("How do you rate the course IS341 Software Engineering");
  });

  it("fill and submit answer", function () {
    cy.visit("/discussion-page/question/5e805259cfcda123c0c6905d");
    cy.get("input").type("Cypress Test Answer");
    //cy.screenshot();
    cy.get(".btn"); // no need of making an actual submission just check if there is a submit button
  });

  it("Empty response not allowed", function () {
    cy.visit("/discussion-page/question/5e805259cfcda123c0c6905d");
    cy.get("input").invoke("val", "");

    var infoboxDisplayed = false;
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Empty response");
      infoboxDisplayed = true;
    });
    cy.get(".btn").click();
    cy.should(() => {
      expect(infoboxDisplayed).to.be.true;
    });
  });
});
