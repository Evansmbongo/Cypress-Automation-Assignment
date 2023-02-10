//const { it } = require("mocha");
import 'cypress-file-upload';
///<reference types="cypress-iframe" />

describe('Check the website and verify if everything is working as expected', () => {
    beforeEach(() => {
        cy.visit('https://demoqa.com/')
        cy.xpath("//div[@class='category-cards']//div[1]//div[1]//div[2]//*[name()='svg']").click()
    });
    context('Texbox', () => {
        it('Textbox: Fill the fields, submit and assert that everything works', () => {
            cy.xpath("//div[@class='element-list collapse show']//li[@id='item-0']").click()
            cy.get('#userName').type('Evans Mbongo')
            cy.get('#userEmail').type('evance@fakemail.com')
            cy.get('#currentAddress').type('Takoradi, Ghana')
            cy.get('#permanentAddress').type('Kumasi, Ghana')
            cy.get('#submit').click()
            cy.get('#name').should('have.text', 'Name:Evans Mbongo')
        }); 
    });
    context('Check box', () => {
       it('Check box: Check any of the boxes and assert it is checked', () => {
            cy.xpath("//span[normalize-space()='Check Box']").click()
            cy.xpath("//button[@title='Toggle']//*[name()='svg']").click()
            cy.xpath("//span[contains(text(),'Desktop')]").click()
            //cy.xpath("//span[contains(text(),'Documents')]").click()
            cy.xpath("//span[normalize-space()='You have selected :']").should('have.text', 'You have selected :')
       }); 
    });
    context('Radio button', () => {
        it('Check any of the Radio buttons and assert it is selected', () => {
            cy.xpath("//span[normalize-space()='Radio Button']").click()
            cy.xpath("//label[normalize-space()='Yes']").click()
            cy.xpath("(//p[@class='mt-3'])[1]").should('have.text', 'You have selected Yes')
        });
    });
    context('Web Tables', () => {
        it('fill the table and assert that the added row is saved', () => {
            cy.xpath("(//li[@id='item-3'])[1]").click()
            cy.xpath("//button[@id='addNewRecordButton']").click()
            cy.xpath("//input[@id='firstName']").type("Evans")
            cy.xpath("(//input[@id='lastName'])[1]").type("Mbongo")
            cy.xpath("//input[@id='userEmail']").type("evans@fakemail.com")
            cy.xpath("//input[@id='age']").type(50)
            cy.xpath("//input[@id='salary']").type(5000000000)
            cy.xpath("//input[@id='department']").type("Training Centre")
            cy.xpath("(//button[normalize-space()='Submit'])[1]").click()
            cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').should('have.text', 'Evans')
        });
    });
    context('Buttons', () => {
        it('Do as the button texts say. Add assertions after click', () => {
            cy.xpath("(//li[@id='item-4'])[1]").click()
            cy.xpath("//button[@id='doubleClickBtn']").dblclick()
            cy.xpath("//p[@id='doubleClickMessage']").should('have.text', 'You have done a double click')

            cy.get('#rightClickBtn').rightclick()
            cy.get('#rightClickMessage').should('have.text', 'You have done a right click')

            cy.xpath("(//button[normalize-space()='Click Me'])[1]").click()
            cy.get('#dynamicClickMessage').should('have.text', 'You have done a dynamic click')
        });
    });
    context('Links', () => {
        it('Check for links opening in same tab', () => {
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-5').click()
            cy.xpath("//a[@id='created']").click()
        });

        it('Check for links opening in different tab', () => {
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-5').click()
            cy.xpath("//a[@id='dynamicLink']").click()
        });
    });
    context('Upload and Download', () => {
        it('Download and make assertion', () => {
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-7 > .text').click()
            cy.get('#downloadButton').click()
            cy.verifyDownload('sampleFile.jpeg', { timeout: 15000, interval: 600 });
        });
        it('Upload and Make assertion', () => {
            cy.get(':nth-child(1) > .element-list > .menu-list > #item-7 > .text').click()
            cy.xpath("//input[@id='uploadFile']").attachFile('Toolsqa.jpg')
            cy.get('#uploadedFilePath').should('have.text', 'C:\\fakepath\\Toolsqa.jpg')    
        });
    });
    context('Browser Windows', () => {
        it("New tab", () => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-0 > .text').click()
            cy.get('#tabButton').click()
            cy.url().should('include', 'https://demoqa.com/browser-windows')
        });
        it("New window", () => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-0 > .text').click()
            cy.get('#windowButton').click()
            cy.url().should('include', 'https://demoqa.com/browser-windows')
        });
        it('new window message', () => {
            cy.contains('div', 'Alerts, Frame & Windows').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-0').click()
            cy.window().then(win => {
            cy.stub(win, 'open').returns('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
            cy.get('#messageWindowButton').click()
            cy.url().should('include', '/browser-windows')
             });
        })
    });
    context('Alert', () => {
        it('alert', ()  => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click()
            cy.get('#alertButton').click()
            cy.on('window:alert', (alertText) => {
              expect(alertText).to.contains('You clicked a button');
            })
        })
        
        it('alert and wait 5 sec', ()  => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click()
            cy.get('#timerAlertButton').click()
            cy.wait(5000)
            
            cy.on('window:alert', (alertWithTimeText) => {
              expect(alertWithTimeText).to.contains('This alert appeared after 5 seconds');
            })
        })
        
        it('Confirm Box', ()  => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click()
            cy.get('#confirmButton').click()
            
            cy.on('window:confirm', (confirmText) => {
              expect(confirmText).to.contains('Do you confirm action?');
              return false
            })
            cy.get('#confirmResult').should('have.text', 'You selected Cancel')
        })
        
        it('Prompt Box', ()  => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click()
            cy.window().then(win => {
                cy.stub(win, 'prompt').returns('Lucky');
                cy.get('#promtButton').click();
                cy.get('#promptResult').should('have.text', 'You entered Lucky');
            });
        })
    });
    context('iFrames', () => {
        it('frame 1', () => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-2').click()
            cy.get('#frame1')
                .its('0.contentDocument.body')
                .should('be.visible')
                .and('have.text', 'This is a sample page')
            cy.frameLoaded('#frame1')
        })
        
        it('frame 2', () => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper > .header-text').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-2').click()
            cy.get('#frame2')
                .its('0.contentDocument.body')
                .should('be.visible')
                .and('have.text', 'This is a sample page')
            cy.frameLoaded('#frame2')
        })
    });  
    context('Neted iFrames', () => {
        it('Nested Frames 1', () => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-3').click()
            cy.get('#frame1')
                .its('0.contentDocument.body')
                .should('be.visible')
                .and('have.text', 'Parent frame')
            cy.frameLoaded('#frame1')
            cy.get('#frame1')
              .its('0.contentDocument.body')
              .find('iframe')
              .its('0.contentDocument.body')
              .should('be.visible')
              .and('have.text', 'Child Iframe')    
        })
    });  
    context('Modal Dialogs', () => {
        it('Small Modal', () => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-4').click()
            cy.get('#showSmallModal').click()
            cy.get('.modal-content')
              .should('be.visible')
            cy.get('#closeSmallModal').click()
            cy.get('.modal-content')
              .should('not.exist')
        })
        
        it('Large Modal', () => {
            cy.get(':nth-child(3) > .group-header > .header-wrapper').click()
            cy.get(':nth-child(3) > .element-list > .menu-list > #item-4').click()
            cy.get('#showLargeModal').click()
            cy.get('.modal-content')
              .should('be.visible')
            cy.get('#closeLargeModal').click()
            cy.get('.modal-content')
              .should('not.exist')
        })
        
    })
   
});