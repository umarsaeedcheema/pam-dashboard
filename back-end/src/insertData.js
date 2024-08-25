import {  PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import client from "./dbClient.js";

// const client = new DynamoDBClient({ region: "us-east-1" });

// interface Feedback {
//   HappyWithAI: boolean;
//   HappyWithHuman: boolean;
//   WillUseServiceAgain: boolean;
//   FeedbackTime: string;
// }

// interface Caller {
//   CallerID: string;
//   Name: string;
//   PhoneNumber: string;
//   Location: string;
//   IsPreviousCustomer: boolean;
//   TimeOfCall: string;
//   Language: string;
//   CallHistory: string[];
// }

// interface Agent {
//   AgentID: string;
//   AgentType: "AI" | "Human";
//   Model: string;
//   Performance: string;
// }

// interface Call {
//   CallID: string;
//   Received: string;
//   Accepted: boolean;
//   HandledByAgent: "AI" | "Human";
//   RedirectedToAgent: "AI" | "Human" | "None";
//   Length: number;
//   Outcome: "Led to sale" | "Could not lead to a sale";
//   Topic: "Routine maintenance" | "Repair" | "Oil Change" | "Car wash" | "Car sale";
//   CallTranscript: string;
//   Feedback: Feedback;
// }

// interface Data {
//   Call: Call;
//   Caller: Caller;
//   Agent: Agent;
// }

const data = [
  {
    Call:{
    CallID: "call-001",
    Received: "2024-08-24T08:00:00Z",
    Accepted: true,
    HandledByAgent: "AI",
    RedirectedToAgent: "Human",
    Length: 300,
    Outcome: "Led to sale",
    Topic: "Oil Change",
    CallTranscript: "Customer requested an oil change...",
    Feedback: {
      HappyWithAI: true,
      HappyWithHuman: true,
      WillUseServiceAgain: true,
      FeedbackTime: "2024-08-24T08:10:00Z"
    }
    },
    Caller: {
      CallerID: "caller-001",
      Name: "John Doe",
      PhoneNumber: "+123456789",
      Location: "New York",
      IsPreviousCustomer: true,
      TimeOfCall: "2024-08-24T08:00:00Z",
      Language: "English",
      CallHistory: ["call-001"]
    },
    Agent: {
      AgentID: "agent-001",
      AgentType: "AI",
      Model: "v1.0",
      Performance: "High"
    }
  },

];

async function insertData() {
  for (const item of data) {
    // Insert into Calls table
    const callCommand = new PutItemCommand({
      TableName: "Calls",
      Item: marshall(item.Call)
    });

    // Insert into Callers table
    const callerCommand = new PutItemCommand({
      TableName: "Callers",
      Item: marshall(item.Caller)
    });

    // Insert into Agents table
    const agentCommand = new PutItemCommand({
      TableName: "Agents",
      Item: marshall(item.Agent)
    });

    try {
      await client.send(callCommand);
      console.log(`Inserted call with CallID: ${item.Call.CallID}`);

      await client.send(callerCommand);
      console.log(`Inserted caller with CallerID: ${item.Caller.CallerID}`);

      await client.send(agentCommand);
      console.log(`Inserted agent with AgentID: ${item.Agent.AgentID}`);
    } catch (error) {
      console.error(`Failed to insert data`, error);
    }
  }
}

// Run the insert function
insertData();