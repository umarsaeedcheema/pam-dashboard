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
    // Group calls by date over the last 7 days
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toLocaleDateString();
    }).reverse();
  
    const callsPerDay = last7Days.map(date => ({
      date,
      value: data.filter(call => new Date(call.TimeOfCall).toLocaleDateString() === date).length,
    }));
  
    return callsPerDay;
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
  