import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/prisma/prismaClient";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM jogador;`
    await prisma.$executeRaw`DELETE FROM time;`
});


describe("Testa criação de Time", () => {
    it("Deve Retornar status 201 Para a criação de um Time", async () => {
        const bodyTeam ={
            nome:"Botafogo"
        }

        const createTeam = await supertest(app).post("/teams").send(bodyTeam)
        expect(createTeam.status).toBe(201)
    })

    it("Deve Retornar status 409 Para a criação de um time igual há uma existente no Banco de Dados", async () => {
        const bodyTeam ={
            nome:"Corinthians"
        }

        await supertest(app).post("/teams").send(bodyTeam)

        const createTeamAgain = await supertest(app).post("/teams").send(bodyTeam)

        expect(createTeamAgain.status).toBe(409)
    })
    
    it("Deve Retornar status 200 para o retorno de todos os times cadastrados", async () => {
        const bodyTeam ={
            nome:"Barcelona"
        }

        const bodyTeam2 ={
            nome:"Real Madrid"
        }


        await supertest(app).post("/teams").send(bodyTeam)

        await supertest(app).post("/teams").send(bodyTeam2)

        const AllTeams = await supertest(app).get("/teams")

        expect(AllTeams.status).toBe(200)
        expect(AllTeams.body.length > 0).toBe(true)
    })

    it("Deve Retornar status 200 para a busca de um time pelo id que exista no banco de dados", async () => {
        const bodyTeam ={
            nome:"Barcelona"
        }

        const team = await supertest(app).post("/teams").send(bodyTeam)

        const teamById = await supertest(app).get(`/teams/${team.body.id}`)

        expect(teamById.status).toBe(200)
        expect(teamById.body.nome).toBe("Barcelona")
    })

})


describe("Testa criação de Jogador",() => {
    it("Deve Retornar status 201 para a criação de um Jogador", async () => {
        const bodyTeam ={
            nome:"LucasFut"
        }

        const createTeam = await supertest(app).post("/teams").send(bodyTeam)

        const bodyPlay = { 
            nome:"Lucas Cabral",
            cpf:"04356926548",
            posicao:"AT",
            timeId:createTeam?.body.id
        }

        const createPlayers = await supertest(app).post("/players").send(bodyPlay)

        expect(createPlayers.status).toBe(201)
    })
    it("Deve Retornar status 409 para a criação de um Jogador com o CPF já existente no banco de dados", async () => {
        const bodyTeam ={
            nome:"Remo"
        }

        const createTeam = await supertest(app).post("/teams").send(bodyTeam)

        const bodyPlay = { 
            nome:"Lucas Cabral",
            cpf:"04356926548",
            posicao:"AT",
            timeId:createTeam?.body.id
        }

        await supertest(app).post("/players").send(bodyPlay)
        const createPlayersAgain = await supertest(app).post("/players").send(bodyPlay)

        expect(createPlayersAgain.status).toBe(409)
    })

    it("Deve Retornar status 200 para o retorno de um jogador cadastrado no banco de dados", async () => {
        const bodyTeam ={
            nome:"Corinthians"
        }

        const createTeam = await supertest(app).post("/teams").send(bodyTeam)

        const bodyPlay = { 
            nome:"Lucas Cabral",
            cpf:"04356926548",
            posicao:"AT",
            timeId:createTeam?.body.id
        }

        const playerCreated = await supertest(app).post("/players").send(bodyPlay)
        
        const playerById = await supertest(app).get(`/players/${playerCreated.body.id}`)

        expect(playerById.status).toBe(200)
        expect(playerById.body.nome).toBe("Lucas Cabral")
    })

    it("Deve Retornar status 200 para a busca de um jogador pelo seu id de um time", async () => {
        const bodyTeam ={
            nome:"Barcelona"
        }

        const createTeam = await supertest(app).post("/teams").send(bodyTeam)

        const bodyPlay = { 
            nome:"Lucas Cabral",
            cpf:"04356926548",
            posicao:"AT",
            timeId:createTeam?.body.id
        }

        const bodyPlay2 = { 
            nome:"José da Silva",
            cpf:"04356926547",
            posicao:"AT",
            timeId:createTeam?.body.id
        }

        await supertest(app).post("/players").send(bodyPlay)
        await supertest(app).post("/players").send(bodyPlay2)

        const teamById = await supertest(app).get(`/teams/${createTeam.body.id}/players`)

        expect(teamById.status).toBe(200)
        expect(teamById.body.id).toBe(createTeam.body.id)
        expect(teamById.body.jogadores.length > 0).toBe(true)
    })
})

afterAll(async ()=> {
    await prisma.$disconnect()
})