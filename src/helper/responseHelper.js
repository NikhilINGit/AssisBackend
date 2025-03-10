exports.userResponse = userResponse;
exports.negativeResponce = negativeResponce;
const statusCode = 200;
async function userResponse(res, message, data) {
  return res.status(statusCode).send({
    success: true,
    message,
    data,
  });
}
async function negativeResponce(res, message, error) {
  return res.status(201).send({
    success: false,
    message,
    error,
  });
}