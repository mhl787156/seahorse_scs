describe('Customers', () => {

  beforeEach( () => {
    browser.get('/customers');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-customers h2')).getText()).toEqual('Features');
  });

});
