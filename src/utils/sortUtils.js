const ssyuSort = (arr, prop, order = "asc") => {
  const compare =
    order === "asc"
      ? (a, b) => {
          if (a[prop] < b[prop]) return -1;
          if (a[prop] > b[prop]) return 1;
          return 0;
        }
      : (a, b) => {
          if (a[prop] < b[prop]) return 1;
          if (a[prop] > b[prop]) return -1;
          return 0;
        };
  return arr.sort(compare);
};

export { ssyuSort };
