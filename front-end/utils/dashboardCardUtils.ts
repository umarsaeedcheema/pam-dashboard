// utils/dashboardCardUtils.ts

export function calculateTasksCompleted(data: any[]) {
    const completedTasks = data.filter(call => call.Accepted).length;
    return ((completedTasks / data.length) * 100).toFixed(2);
  }
  
  export function calculateNewLeads(data: any[]) {
    return data.filter(call => call.Outcome === 'Led to sale').length;
  }
  
  export function calculateFeedbackSatisfied(data: any[]) {
    const satisfiedFeedback = data.filter(call => call.Feedback === true).length;
    return ((satisfiedFeedback / data.length) * 100).toFixed(2);
  }
  
  export function processDataForCallsPerDay(data: any[]) {
    // Example logic to generate data for the line chart
    return data.map(call => ({ date: new Date(call.TimeOfCall).toLocaleDateString(), value: 1 }));
  }
  
  export function processDataForFeedback(data: any[]) {
    const feedbackData = data.reduce(
      (acc, call) => {
        if (call.Feedback) {
          if (call.Feedback.HappyWithAI) {
            acc.AI += 1;
          }
          if (call.Feedback.HappyWithHuman) {
            acc.Human += 1;
          }
        }
        return acc;
      },
      { AI: 0, Human: 0 }
    );
  
    return [
      { type: 'Happy with AI', value: feedbackData.AI },
      { type: 'Happy with Human', value: feedbackData.Human },
    ];
  }
  