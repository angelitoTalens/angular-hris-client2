import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';

describe('HRIS Login Functionality', () => {
  let page: AppPage = new AppPage();

  beforeEach(() => {

  });

  it('should display login page', async () => {
    await page.navigateTo();
    expect(await element(by.id("email")).isDisplayed());
    expect(await element(by.id("password")).isDisplayed());    
    expect(await element(by.css(".login-form button")).isDisplayed());    
  });

  it('should redirect to home page after login', async () => {
    await element(by.id("email")).sendKeys("test@gmail.com");
    await element(by.id("password")).sendKeys("anything");
    await element(by.css(".login-form button")).click();        
    expect(await browser.getCurrentUrl()).toContain("/main/home");
  });

  it('should redirect to login page after logout', async () => {    
    await element(by.css(".main-container .logout")).click()    
    expect(await browser.getCurrentUrl()).toContain("/login");
  });

  it('should redirect to login page if not logged in', async () => {    
    await browser.get(browser.baseUrl);
    expect(await browser.getCurrentUrl()).toContain("/login");

    await browser.get(browser.baseUrl + "main/home");
    expect(await browser.getCurrentUrl()).toContain("/login");

    await browser.get(browser.baseUrl + "main/payslip");
    expect(await browser.getCurrentUrl()).toContain("/login");

    await browser.get(browser.baseUrl + "main/leave");
    expect(await browser.getCurrentUrl()).toContain("/login");

    await browser.get(browser.baseUrl + "main/details");
    expect(await browser.getCurrentUrl()).toContain("/login");
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
