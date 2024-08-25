export function processCallTopics(callsData: any[], specificTopics: string[]) {
    const topicCounts = callsData.reduce((acc, call) => {
      const topic = call.Topic;
      if (specificTopics.includes(topic)) {
        acc[topic] = (acc[topic] || 0) + 1;
      } else {
        acc['Other'] = (acc['Other'] || 0) + 1;
      }
      return acc;
    }, {});
  
    return Object.keys(topicCounts).map(topic => ({
      name: topic,
      value: topicCounts[topic],
    }));
  }
  