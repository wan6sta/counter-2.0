

export const checkValue = (initialValue: number, minLimit: number, maxLimit: number) => {
  if (initialValue >= maxLimit || initialValue <= minLimit) {
    return 'error'
  }

  if (minLimit >= maxLimit || minLimit >= initialValue) {
    return 'error'
  }

  if (maxLimit <= minLimit || maxLimit <= initialValue) {
    return 'error'
  }
}