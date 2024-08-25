
export function processUsersByLocation(callersData: any[]) {
    const locationData = callersData.reduce((acc, caller) => {
      const location = caller.Location || 'Unknown';
      if (!acc[location]) {
        acc[location] = 0;
      }
      acc[location] += 1;
      return acc;
    }, {});
  
    return Object.keys(locationData).map(location => ({
      name: location,
      value: locationData[location],
    }));
  }
  