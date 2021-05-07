const request = require("supertest");
//subir o servidor no supertest
//criar vairavel de ambient para rodar o teste no bd_teste

const app = require("../../src/app");
const {cpf} = require("cpf-cnpj-validator");

describe("MANAGER", () => {
  it("é possivel criar um novo gerente", () => {
    const response = request(app).post("/managers", {
      name: "Rafael Leme",
      cpf: cpf.generate(),
      email: "teste@gmail.com",
      cellphone: "55119998208012",
      password: "123456",
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
    
  });
});
