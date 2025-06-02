describe("readFeedback", () => {
  it("Opens Feedback Detial Overlay", () => {
    cy.visit("http://localhost:5173");

    // give specific feedback
    cy.get('img[alt="Add Icon"]').click();
    cy.get('div[id="extendedOverlay"]').should("be.visible");
    cy.get('img[alt="Feedback Text Icon"]').click();
    cy.get('p[id="exampleElement"]').click();
    cy.get('input[id="feedback_Author"]').click();
    cy.get('input[id="feedback_Author"]').type("Its Me the Feedback Author");
    cy.get('input[id="feedback_AuthorEmail"]').click();
    cy.get('input[id="feedback_AuthorEmail"]').type("email@author.com");
    cy.get('input[id="feedback_Title"]').click();
    cy.get('input[id="feedback_Title"]').type("This is my feedback.");
    cy.get('textarea[id="feedback_Description"]').type(
      "This is my feedback. Text Lorem Ipsum"
    );
    cy.get('button[type="submit"]').click();

    //read given Feedback

    cy.get('img[alt="Close Icon"]').click();
    cy.get('img[alt="Feedback List Icon"]').click();
    cy.contains("Its Me the Feedback Author").should("exist");
  });
});
