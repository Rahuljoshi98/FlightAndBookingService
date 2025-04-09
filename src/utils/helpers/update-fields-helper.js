const allowedFields = (allowedFields, data) => {
  let fieldsToUpdate = {};
  fieldsToUpdate = Object.keys(data)?.reduce((acc, curr) => {
    if (allowedFields?.includes(curr)) {
      acc[curr] = data[curr];
    }
    return acc;
  }, {});

  return fieldsToUpdate;
};

module.exports = {
  allowedFields
};
