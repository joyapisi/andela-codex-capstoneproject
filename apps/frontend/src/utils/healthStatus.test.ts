import assert from "node:assert/strict";
import test from "node:test";
import { healthStatus } from "./healthStatus";

test("healthStatus returns module health information", () => {
  const status = healthStatus();

  assert.equal(status.module, "refugee-skills-wallet");
  assert.equal(typeof status.version, "string");
  assert.ok(status.version.length > 0);
  assert.equal(new Date(status.timestamp).toISOString(), status.timestamp);
});
