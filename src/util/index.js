export const generateData = (num = 100) => {
  const data = [];
  for (let i = 1; i <= num; i++) {
    data.push({
      key: i,
      name: `Name ${i}`,
      age: Math.floor(Math.random() * 60) + 20,
      address: `Address ${i}`,
    });
  }
  return data;
};