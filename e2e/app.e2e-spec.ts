import { TeoriaPage } from './app.po';

describe('teoria App', () => {
  let page: TeoriaPage;

  beforeEach(() => {
    page = new TeoriaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
