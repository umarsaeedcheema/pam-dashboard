import {  PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import client from "./dbClient.js";
import fs from 'fs';



// const data = [
//   {
//     Call:{
//       CallID: "call-001",
//       Received: "2024-08-24T08:00:00Z",
//       Accepted: true,
//       HandledByAgent: "AI",
//       RedirectedToAgent: "Human",
//       Length: 300,
//       Outcome: "Led to sale",
//       Topic: "Oil Change",
//       CallTranscript: "Customer requested an oil change...",
//       Feedback: {
//         HappyWithAI: true,
//         HappyWithHuman: true,
//         WillUseServiceAgain: true,
//         FeedbackTime: "2024-08-24T08:10:00Z"
//       }
//     },
//     Caller: {
//       CallerID: "caller-001",
//       Name: "John Doe",
//       PhoneNumber: "+123456789",
//       Location: "New York",
//       IsPreviousCustomer: true,
//       TimeOfCall: "2024-08-24T08:00:00Z",
//       Language: "English",
//       CallHistory: ["call-001"]
//     },
//     Agent: {
//       AgentID: "agent-001",
//       AgentType: "AI",
//       Model: "v1.0",
//       Performance: "High"
//     }
//   },

// ];

const dataPath =  '../generated_call_data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));


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