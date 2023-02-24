const yup = require("yup");
async function validate(req, res, next) {
    try {
      const schema = yup.object().shape({
        fullName: yup.string().length(8),
        phone: yup.number().max(50)
      });
      await schema.validate(req.body)
      next();
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
module.exports = validate;