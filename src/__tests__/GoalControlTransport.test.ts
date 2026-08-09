import * as acp from "@agentclientprotocol/sdk";
import {describe, expect, it} from "vitest";
import {GOAL_CONTROL_METHOD, LEGACY_GOAL_CONTROL_METHOD} from "../AcpExtensions";
import {registerGoalControlRequests} from "../GoalControlTransport";

describe("goal control transport", () => {
    it.each([GOAL_CONTROL_METHOD, LEGACY_GOAL_CONTROL_METHOD])(
        "routes %s over an ACP connection",
        async (method) => {
            const app = registerGoalControlRequests(acp.agent({name: "goal-control-test"}), () => ({
                async extMethod(receivedMethod, params) {
                    return {receivedMethod, params};
                },
            }));

            const response = await acp.client({name: "goal-control-client"}).connectWith(app, (connection) =>
                connection.request(method, {
                    sessionId: "session-1",
                    action: "set",
                    objective: "Ship the sync",
                })
            );

            expect(response).toEqual({
                receivedMethod: method,
                params: {
                    sessionId: "session-1",
                    action: "set",
                    objective: "Ship the sync",
                },
            });
        },
    );
});
