describe('Orders', () => {

  beforeEach( () => {
    browser.get('/orders');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-orders h2')).getText()).toEqual('Features');
  });

});
