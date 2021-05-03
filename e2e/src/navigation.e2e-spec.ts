import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';

describe('HRIS Navigation', () => {
  let page: AppPage;

  beforeAll(async ()=>{
    page = new AppPage();
    await page.navigateTo();
    await element(by.id("email")).sendKeys("test@gmail.com");
    await element(by.id("password")).sendKeys("anything");
    await element(by.css(".login-form button")).click();  
  });  

  it('should close and open side nav', async () => {
    
    expect(await element(by.css(".side-nav-open")).isPresent()).toBe(true);
    
    await element(by.css(".main-container .toggle-nav")).click();
    expect(await element(by.css(".side-nav-open")).isPresent()).toBe(false);

    await element(by.css(".main-container .toggle-nav")).click();
    expect(await element(by.css(".side-nav-open")).isPresent()).toBe(true);
  });

  it('should redirect to Payslip screen', async () => {
    await element(by.linkText("Payslip")).click();   
    expect(await browser.getCurrentUrl()).toContain("main/payslip") 
  });

  it('should redirect to Leave screen', async () => {
    await element(by.linkText("Leave")).click();   
    expect(await browser.getCurrentUrl()).toContain("main/leave") 
  });

  it('should redirect to Details screen', async () => {
    await element(by.linkText("Details")).click();   
    expect(await browser.getCurrentUrl()).toContain("main/details") 
  });

  it('should redirect to Home screen', async () => {
    await element(by.linkText("Home")).click();   
    expect(await browser.getCurrentUrl()).toContain("main/home") 
  });
 
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
