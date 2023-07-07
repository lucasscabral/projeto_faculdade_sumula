import {sumulaRepository} from "../repositories/sumulaRepository.js"


async function checkRequestBody(player){
    if(player.nome === "" || player.nome === undefined || player.cpf === "" || player.cpf === undefined  || player.posicao === "" || player.posicao === undefined || player.timeId === "" || player.timeId === undefined){    
        throw ({ code: "unauthorized", message: "Deve ser preenchidos todos os campos" });
    }
    return await checkTeamExistence(player.timeId)
}


async function checkTeamExistence(timeId){
    const verifyTimeId = await sumulaRepository.getTeamById(timeId)
    if(!verifyTimeId){
        throw ({ code: "NotFound", message: "Esse time não existe" });
    }
    return 'success';
}

async function registerPlayers(player){
    const returnVerification = await checkRequestBody(player);
    if(returnVerification === 'success'){
        try {
           return await sumulaRepository.registerPlayer(player)     
        } catch (error) {
            throw { code: "unauthorized", message: "Esse jogador já está cadastrado" }
        }
    } 
    return 'failed';
}

async function getPlayersByIdTeam(idTeam){
    return await sumulaRepository.returnPlayersByIdTeam(idTeam)
}

async function getPlayerById(id){
    return await sumulaRepository.getPlayerById(id)
}

async function registerTeams(team){
    try {
        return await sumulaRepository.registerTeam(team)   
    } catch (error) {
        throw { code: "unauthorized", message: "Esse Time já está cadastrado" }
    }
}

async function getTeams(){
    return await sumulaRepository.getTeams()
}

async function getTeamById(id){
    return await sumulaRepository.getTeamById(id)
}

export const sumulaService ={ 
    checkRequestBody,
    checkTeamExistence,
    registerPlayers,
    getPlayersByIdTeam,
    getPlayerById,
    registerTeams,
    getTeams,
    getTeamById
}
