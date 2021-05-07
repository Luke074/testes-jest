const generetedId = require('../../src/utils/generateUUID');

//se é possivel erear um uuid unico
//se esta vindo um id
//se esse id é uma string
//se o tamanho da string é o que eu espero, 36 caracteres

describe("generatedUUID", () => {
  it("se é possivel erear um uuid unico", () => {
    const id = generetedId();

    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
    expect(id).toHaveLength(36);
    
  })
});