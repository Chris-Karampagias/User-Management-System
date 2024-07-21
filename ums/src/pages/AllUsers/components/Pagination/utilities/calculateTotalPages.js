export const calculateTotalPages = (users, resultsPerPage) => {
  let totalPages = users.length / resultsPerPage;
  if (!Number.isInteger(totalPages)) {
    // If it's not an integer then it must have a remainder that is either 1, 2, ..., resultsPerPage - 1 < resultsPerPage
    // so we only need to add one more page to totalPages
    totalPages = Math.floor(totalPages);
    totalPages += 1;
  }
  return totalPages;
};
