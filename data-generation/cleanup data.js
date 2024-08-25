const fs = require('fs');
const data = fs.readFileSync('../generated_call_data.json', 'utf8');
const jsonObject = JSON.parse(data);
console.log(jsonObject.length)
let transformed = []
for(let obj of jsonObject){
    let { Caller, Agent, ...callDetails } = obj;
    let transformedObject = {
        Call: callDetails,
        Caller: Caller,
        Agent: Agent
      };
    transformed.push(transformedObject)
}
const jsonData = JSON.stringify(transformed, null, 2);
fs.writeFileSync('../output.json', jsonData, 'utf8');


