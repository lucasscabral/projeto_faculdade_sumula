import prisma from "../prisma/prismaClient.js";

async function registerPlayer(player) {
   return await prisma.jogador.create({data: player})
}

async function returnPlayersByIdTeam(idTeam){
    return await prisma.time.findUnique({where: {id:idTeam},include:{jogadores:true}})
}

async function getPlayerById(id){
    return await prisma.jogador.findUnique({where: {id},select:{nome:true,posicao:true,cpf:true,Time:true}}) 
}

async function registerTeam(team) {
   return await prisma.time.create({data: team})
}

async function getTeams(){
    return await prisma.time.findMany()
}

async function getTeamById(idTeam){
    const team = await prisma.time.findUnique({
        where:{id:idTeam},
    });
    return team
}

export const sumulaRepository ={ 
    registerPlayer,
    returnPlayersByIdTeam,
    getPlayerById,
    registerTeam,
    getTeams,
    getTeamById
}