import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let newWindowHandle;
  let windowCount: number;
  beforeEach(() => {
    page = new AppPage();
  });

  it('should render News Items', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Hacker News Feed');
  });

  it('should pull news items', () => {
    page.navigateTo();
    expect(page.getNewsItems().count()).toBeGreaterThan(0); // did we get items?
  });

  it('external items should open new pages', () => {
    page.navigateTo();
    browser.getAllWindowHandles().then(function (handles) {
      windowCount = handles.length; // count the number of open tabs currently
      page.getExternalItem().click().then(function(){
        browser.getAllWindowHandles().then(function (handles) {             
            expect(windowCount+1).toEqual(handles.length); // if we have one more than before, consider it a success
        });
      });    
    });   
  });

  it('internal items should expand', () => {
    page.navigateTo();
    page.getInternalItem().click().then(function(){
      expect(page.getExpadedItem()).toBeDefined(); // if an expanded element exists after clicking, consider it success.
    });         
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
