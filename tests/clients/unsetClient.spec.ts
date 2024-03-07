import ClientRepository from "@source/repositories/ClientRespository";
import interceptor from "../interceptor";

describe('Testing unset clients', () => {

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('Should delete client', async() => {
        jest.spyOn(ClientRepository.prototype, "delete").mockResolvedValue({} as any);
        const response=await interceptor.getServer()
            .delete("/api/clients/1")
            .set("Authorization",`Bearer ${interceptor.getAuthenticated()}`);
        expect(response.status).toEqual(200)
    });

    it('Should restore deleted client', async() => {
        jest.spyOn(ClientRepository.prototype, "restore").mockResolvedValue({} as any);
        const response=await interceptor.getServer()
            .post("/api/clients/1")
            .set("Authorization",`Bearer ${interceptor.getAuthenticated()}`);
        expect(response.status).toEqual(200)
    });
});