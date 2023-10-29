describe("renderings", () => {
  it("popup is set", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="popup"').should("exist");
  });
  it("putting name inside of input and submit test", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="popup-input"').type("example name");
    cy.get('[data-testid="popup-form"').submit();
  });
  it("appbar is set", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="appbar"').should("exist");
  });
  it("slidbar is set", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="slidbar"').should("exist");
  });
  it("content is set", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="content"').should("exist");
  });
  it("dashboard is set", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="dashboard"').should("exist");
  });
  it("todo list is set", () => {
    cy.visit("http://localhost:5173/todos");
    cy.get('[data-testid="todos"').should("exist");
  });
  it("adding a task in todo list test", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="popup-input"').type("example name");
    cy.get('[data-testid="popup-form"').submit();
    cy.visit("http://localhost:5173/todos");
    cy.get('[data-testid="todo-input"').type("this is a example task");
    cy.get('[data-testid="todo-form"').submit();
  });
  it("removing a task from todo list test", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="popup-input"').type("example name");
    cy.get('[data-testid="popup-form"').submit();
    cy.visit("http://localhost:5173/todos");
    cy.get('[data-testid="delete-btn"').click();
  });

  it("weather is set", () => {
    cy.visit("http://localhost:5173/weather");
    cy.get('[data-testid="weather"').should("exist");
  });
  it("default location weather data is set", () => {
    cy.visit("http://localhost:5173/weather");
    cy.get('[data-testid="weather-container"').should("exist");
  });
  it("searching a location in english to get weather data test", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="popup-input"').type("example name");
    cy.get('[data-testid="popup-form"').submit();
    cy.visit("http://localhost:5173/weather");
    cy.get('[data-testid="search"').type("new york {enter}");
    cy.get('[data-testid="weather-container"').should("exist");
  });
  it("searching a location in persian to get weather data test", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="popup-input"').type("example name");
    cy.get('[data-testid="popup-form"').submit();
    cy.visit("http://localhost:5173/weather");
    cy.get('[data-testid="search"').type("کرج {enter}");
    cy.get('[data-testid="weather-container"').should("exist");
  });
  it("profile is set", () => {
    cy.visit("http://localhost:5173/profile");
    cy.get('[data-testid="profile"').should("exist");
  });
  it("changing profile name test", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="popup-input"').type("example name");
    cy.get('[data-testid="popup-form"').submit();
    cy.visit("http://localhost:5173/profile");
    cy.get('[data-testid="name-edit-input"').type("morteza tavasoly{enter}");
  });
  it("changing theme test", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="popup-input"').type("example name");
    cy.get('[data-testid="popup-form"').submit();
    cy.visit("http://localhost:5173/profile");
    cy.get('[data-testid="mode"').select("Dark Mode");
  });
  it("changing language test", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="popup-input"').type("نادین سافت");
    cy.get('[data-testid="popup-form"').submit();
    cy.visit("http://localhost:5173/profile");
    cy.get('[data-testid="mode"').select("Dark Mode");
    cy.get('[ data-testid="locale"').select("Farsi");
  });
});
// yields <option value="456">apples</option>
// cy.get('select').select('apples').should('have.value', '456')
