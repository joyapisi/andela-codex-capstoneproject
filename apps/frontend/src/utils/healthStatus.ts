import packageJson from "../../package.json";

export interface HealthStatus {
  module: "refugee-skills-wallet";
  version: string;
  timestamp: string;
}

export function healthStatus(): HealthStatus {
  return {
    module: "refugee-skills-wallet",
    version: packageJson.version ?? "unknown",
    timestamp: new Date().toISOString()
  };
}
