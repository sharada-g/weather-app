import { server } from "./mocks/server";
import { cleanup } from "@testing-library/react";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
