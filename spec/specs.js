describe('Block',function(){
  it("Create a new Contact with the given properties", function(){
    var testBlock = new Block(200,200,40,10,"white");
    expect(testBlock.x).to.equal(200);
    expect(testBlock.y).to.equal(200);
    expect(testBlock.w).to.equal(40);
    expect(testBlock.h).to.equal(10);
    expect(testBlock.color).to.equal("white");
  });
});
