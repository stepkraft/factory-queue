import { browser, by, element } from 'protractor';
import 'tslib';

describe('App', () => {

  beforeEach(async () => {
    await browser.get('/');
  });

  it('should have a title', async () => {
    // let subject = await browser.getTitle();
    // let result  = 'Angular2 Webpack Starter by @gdi2290 from @AngularClass';
    // expect(subject).toEqual(result);
  });
});
