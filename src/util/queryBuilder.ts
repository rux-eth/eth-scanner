export default function queryBuilder(baseUrl: string, filters?: any): string {
  if (!filters || Object.keys(filters).length < 1) {
    return baseUrl;
  }
  let newUrl: string = baseUrl;
  Object.keys(filters).forEach((filter) => {
    newUrl = `${newUrl}&${filter}=${filters[filter]}`;
  });
  newUrl = newUrl.replace(/&/, "?");
  return newUrl;
}
