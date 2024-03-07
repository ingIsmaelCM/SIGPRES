import interceptor from "../interceptor";

describe('Testing get clients', () => {

    beforeEach(()=>{
        jest.resetAllMocks();
    })


    it('Should retrieve all clients ', async() => {
        const response = await interceptor.getServer()
            .get("/api/clients")
            .set("Authorization", `Bearer ${interceptor.getAuthenticated()}`)
            .set("Cookie","tenant=sigpres_main_tenant")
        expect(response.status).toEqual(200);
        expect(response.body.content.count).toBeGreaterThan(0)
    });

    it('Should retrieve one client ', async() => {
        const response = await interceptor.getServer()
            .get("/api/clients/1?include=info")
            .set("Authorization", `Bearer ${interceptor.getAuthenticated()}`)
            .set("Cookie","tenant=sigpres_main_tenant")
        expect(response.status).toEqual(200);
        expect(response.body.content.id).toStrictEqual(1)
    });
});