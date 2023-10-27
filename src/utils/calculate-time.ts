export const calculateTime = (object: Record<string, any>) => {
  return Object.entries(object).reduce((acc,[keyName,value]) => {
    if (keyName.includes('time')) {
      acc += value
    }

    return acc;
  },0)
}
