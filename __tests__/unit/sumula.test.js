import {sumulaRepository} from '../../src/repositories/sumulaRepository.js'
import { sumulaService } from '../../src/service/sumulaService.js';
import {jest,expect,it,describe} from '@jest/globals' 


describe('Testes unitário para a função de verificação de time', () => {
    it('Deve verificar se existe um time', async () => {
        const timeId = 1;

        jest
            .spyOn(sumulaRepository, "getTeamById")
            .mockImplementationOnce(() => { 
                return [{
                    id:1,
                    nome:"Corinthians"
                }]
            });      
        const returnRequest = await sumulaService.checkTeamExistence(timeId);
        expect(sumulaRepository.getTeamById).toBeCalled();
        expect(returnRequest).toEqual('success');
    });

    it('Deve verificar se não existe o time com um id passado por paramatro', async () => {
        const timeId = 50;

        jest
            .spyOn(sumulaRepository, 'getTeamById')
            .mockImplementationOnce(() => { return null });
            
        const returnRequest = sumulaService.checkTeamExistence(timeId);
        expect(sumulaRepository.getTeamById).toBeCalled();
        expect(returnRequest).rejects.toEqual({ code: "NotFound", message: "Esse time não existe" });
    });
});


describe('Testes unitários para a função de validação do corpo da requisição de jogadores',()=>{
    it('Deve rejeitar a requisição,pois,nem todos os campos estão preenchidos',async ()=>{
        const player = {
            nome:"Lucas Cabral",
            cpf:"",
            posicao:"GL",
            timeId:1
          }

          const returValidation = sumulaService.checkRequestBody(player)

          expect(returValidation).rejects.toEqual({ code: "unauthorized", message: "Deve ser preenchidos todos os campos" })
    })
    it('Deve validar a requisição,pois,todos os campos estão preenchidos',async ()=>{
        const player = {
            nome:"Lucas Cabral",
            cpf:"043560365245",
            posicao:"GL",
            timeId:1
          }
        
        jest
            .spyOn(sumulaRepository, "getTeamById")
            .mockImplementationOnce(() => { 
                return [{
                    id:1,
                    nome:"Corinthians"
                }]
            }); 

        const returValidation = await sumulaService.checkRequestBody(player)

        expect(sumulaRepository.getTeamById).toBeCalled();
        expect(returValidation).toEqual('success')
    })
})