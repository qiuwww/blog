export const disabledNewAfterDate = {
  disabledDate(time) {
    return time.getTime() > Date.now();
  }
};
export const disabledNewBeforeDate = {
  disabledDate(time) {
    return time.getTime() < Date.now() - 8.64e7;
  }
};

