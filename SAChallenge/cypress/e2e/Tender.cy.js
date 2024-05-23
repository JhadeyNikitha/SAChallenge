// Used Cypress Framework - in Javascript language to run the script
//const cypress= require(cypress);

describe('Tendale Store', () => {
    beforeEach(() => {
      // Visit the online store homepage before each test
      cy.visit(cypress.env.URL);
    })

    it('Display the top-level menus:', () => {
        // Check if the main menu is visible
        cy.xpath('//img[@alt="Tendable Logo"]').should('be.visible');
        cy.get(':nth-child(1) > :nth-child(1) > .menu-item').should('be.visible');
        cy.get('.mega-menu > :nth-child(1)').should('be.visible');
        cy.get(':nth-child(1) > :nth-child(3) > .menu-item').should('be.visible');
      })

     
        // Top-level menu pages to check
        const menuPages = [ 
          { name: 'Home', url: '/' },
          { name: 'Our Story', url: '/our-story' },
          { name: 'Our Solution,', url: '/our-solution' },
          { name: 'Why Tendable', url: '/why-tendable' }
        ];
      
        // Function to check the "Request a Demo" button
        const checkRequestDemoButton = () => {
            cy.get('.button-links-panel > [href="https://www.tendable.com/book-a-demo"]')
            .should('be.visible')
            .and('not.be.disabled')
            // cy.wait(2000)
            // cy.get('.button-links-panel > [href="https://www.tendable.com/book-a-demo"]').and('be.enabled');
        };
      
        // Iterate 
        menuPages.forEach(page => {
          it(`should display and enable "Request a Demo" button on the ${page.name} page`, () => {
            // Visit the page
            cy.visit(`https://www.tendable.com${page.url}`);
           // cy.wait(3000);
            
            // Verify the "Request a Demo" button
            checkRequestDemoButton();
          });
        });

         it("submission of form in contact us", ()=>{
            cy.get('.button-links-panel > [href="https://www.tendable.com/contact-us"]').click();
            cy.get(':nth-child(1) > .relative > :nth-child(2) > .flex > .body-button').click();
            cy.get('#contactMarketingPipedrive-163701 > :nth-child(11) > .freeform-column > #form-input-fullName').type('Nikitha')
            cy.get(':nth-child(12) > .freeform-column > #form-input-organisationName').type('SA Technologies')
            cy.get('#contactMarketingPipedrive-163701 > :nth-child(13) > :nth-child(1) > #form-input-cellPhone').type('0000000000')
            cy.get(':nth-child(2) > #form-input-email').type('jnikitha0208@gmail.com')
             //cy.xpath('//*[@id="form-input-jobRole"][@fdprocessedid="7ujadg"]').select('CNO')
            cy.get(':nth-child(16) > .freeform-column > :nth-child(2) > #form-input-consentAgreed-0').check()
            cy.get(':nth-child(18) > .freeform-column > .button').click();

            
            cy.get('.ff-form-errors').should('be.visible').then($errorMessages => {
                const errorMessagesText = $errorMessages.text();
                const containsError1 = errorMessagesText.includes('Sorry, there was an error submitting the form. Please try again.');
                const containsError2 = errorMessagesText.includes('Please verify that you are not a robot.');
          
                // Verify if at least one of the error messages is displayed
                expect(containsError1 || containsError2).to.be.true;
              });
            });

        })