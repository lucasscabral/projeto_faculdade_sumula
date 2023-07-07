import {sumulaService} from "../service/sumulaService.js"


export async function registerPlayer(req,res){
    let player = req.body
    
    try{
        const playerCreated = await sumulaService.registerPlayers(player)
        res.status(201).send(playerCreated)
 
    }catch(err){
        if(err.code === 'unauthorized'){
            return res.status(409).send(err.message)
        }else if(err.code === 'NotFound'){
            return res.status(404).send(err.message)
        }
        res.sendStatus(500)
    }
}

export async function getPlayerById(req,res){
    const {id} = req.params

    const uniquePlayer = await sumulaService.getPlayerById(parseInt(id))
    res.send(uniquePlayer).status(200)
}

export async function getPlayersByIdTeam(req,res){
    const {id} = req.params
    const allPlayers = await sumulaService.getPlayersByIdTeam(parseInt(id))

    res.send(allPlayers).status(200)
}

export async function registerTeam(req,res){
    const team = req.body
    try {
        const teamCreated = await sumulaService.registerTeams(team)
        res.status(201).send(teamCreated)
    } catch (err) {
        if(err.code === 'unauthorized'){
            return res.status(409).send(err.message)
        }else if(err.code === 'NotFound'){
            return res.status(404).send(err.message)
        }
        res.sendStatus(500)
    }
}
export async function getTeams(_,res){
    const allTeams = await sumulaService.getTeams()

    res.send(allTeams).status(200)
}

export async function getTeamById(req,res){
    const {id} = req.params
    const uniqueTeam = await sumulaService.getTeamById(parseInt(id))
    if(!uniqueTeam){
       return res.send([]).status(200)
    }
    res.send(uniqueTeam).status(200)

}