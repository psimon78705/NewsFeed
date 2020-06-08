import { browser, by, element, ElementFinder, ElementArrayFinder  } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('.pageTitle')).getText() as Promise<string>;
  }

  getNewsItems(): ElementArrayFinder {
    return element.all(by.className("newsWrapper"));
  }

  getExternalItem(): ElementFinder{
    return element.all(by.className("newsWrapper externalLink")).first();
  }
  
  getInternalItem(): ElementFinder{
    return element.all(by.css("div[class='newsWrapper']:not(.externalLink)")).first();
  }

  getExpadedItem(): ElementFinder{
    return element.all(by.className("newsWrapper expandedStory")).first();
  }
}
