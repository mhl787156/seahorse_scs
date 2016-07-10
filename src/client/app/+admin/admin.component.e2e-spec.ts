describe('Admin', () => {

  beforeEach( () => {
    browser.get('/admin');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-admin h2')).getText()).toEqual('Features');
  });

});
