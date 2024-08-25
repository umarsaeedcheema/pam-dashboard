
export function processUsersByLanguage(callersData: any[]) {
    const languageData = callersData.reduce((acc, caller) => {
      const language = caller.Language || 'Unknown';
      if (!acc[language]) {
        acc[language] = 0;
      }
      acc[language] += 1;
      return acc;
    }, {});
  
    return Object.keys(languageData).map(language => ({
      name: language,
      value: languageData[language],
    }));
  }
  