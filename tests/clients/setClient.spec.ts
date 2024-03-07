import ClientRepository from "@source/repositories/ClientRespository";
import {EClientType, IClient} from "@source/utils/SourceInterfaces";
import interceptor from "../interceptor";

const token = interceptor.getAuthenticated();
const fakeClient: IClient = {
    clienttype: EClientType.Persona,
    name: "Juan",
    lastname: "Pérez"

}
describe('Testing set Clients', () => {

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it("Must create new client",
        async () => {
            jest.spyOn(ClientRepository.prototype, "create").mockResolvedValue(fakeClient as any);
            const response = await interceptor.getServer()
                .post("/api/clients/")
                .send(fakeClient)
                .set("Authorization", `Bearer ${token}`)
            expect(response.status).toEqual(201)
        })

    it("Must update existing client", async () => {
        jest.spyOn(ClientRepository.prototype, "update").mockResolvedValue(fakeClient as any);
        const response = await interceptor.getServer()
            .put("/api/clients/1")
            .send(fakeClient)
            .set("Authorization", `Bearer ${token}`)
        expect(response.status).toEqual(201)
    })


});