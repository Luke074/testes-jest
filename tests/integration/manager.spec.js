const request = require("supertest");
//subir o servidor no supertest
//criar vairavel de ambient para rodar o teste no bd_teste

const app = require("../../src/app");
const connection = require("../../src/database/index");
const {cpf} = require("cpf-cnpj-validator");
const { response } = require("../../src/app");
const truncate = require("./truncate");

describe("MANAGER", () => {
  afterAll(() => {
    connection.close();
  });

  beforeEach(async (done) => {
    await truncate(connection.models)
    done();
  });

  it("é possivel criar um novo gerente", async ()  => {
    let cpfGenerate = cpf.generate();
    let response = await request(app).post("/managers").send({
      name: "Lucas",
      cpf: cpfGenerate,
      email: "teste@gmail.com",
      cellphone: "5511998208012",
      password: "123456",
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
  });

  it("não é possivel cadastrar um gerente com cpf existente", async () => {
    let cpfGenerate = cpf.generate();
    let response = await request(app).post("/managers").send({
      name: "Lucas",
      cpf: cpfGenerate,
      email: "teste@gmail.com",
      cellphone: "5511998208012",
      password: "123456",
    });

    response = await request(app).post("/managers").send({
      name: "Pedro",
      cpf: cpfGenerate,
      email: "teste123@gmail.com",
      cellphone: "5511998208012",
      password: "123456",
    });
  });

  expect(response.ok).toBeFalsy();
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toEqual("cpf already exists");
});
