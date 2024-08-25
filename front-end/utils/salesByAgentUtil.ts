export function processSalesByAgent(callsData: any[]) {
  const salesData = callsData.reduce(
    (acc, call) => {
      if (call.Outcome === 'Led to sale') {
        if (call.HandledByAgent === 'AI') {
          acc.AI += 1;
        } else if (call.HandledByAgent === 'Human') {
          acc.Human += 1;
        }
      }
      return acc;
    },
    { AI: 0, Human: 0 }
  );

  return [
    { name: 'AI', value: salesData.AI },
    { name: 'Human', value: salesData.Human },
  ];
}
