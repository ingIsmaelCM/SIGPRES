import request from "supertest";
import tools from "@/app/utils/tools";
import app from "../App";

class Interceptor {
  mockRequest() {
    const req: any = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    req.auth= jest.fn().mockResolvedValue({id: 1})
    return req;
  }

  mockResponse() {
    const res: any = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
  }
  mockNext() {
    return () => jest.fn();
  }

  getAuthenticated(status: Boolean = true, auth?: any): String {
    if (!auth) {
      auth = {
        id: 1,
        username: "icontreras",
        sessionId: status ? null : 1,
      };
    }

    return tools.getToken(auth, 360);
  }
  getServer() {
    return  request(app.app);
  }
}


export default new Interceptor();
