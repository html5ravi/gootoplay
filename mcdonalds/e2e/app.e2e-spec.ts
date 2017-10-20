import { McdonaldsPage } from './app.po';

describe('mcdonalds App', () => {
  let page: McdonaldsPage;

  beforeEach(() => {
    page = new McdonaldsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
