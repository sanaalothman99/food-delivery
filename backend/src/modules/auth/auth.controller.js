const { register, login } = require('./auth.service');

const registerController = async (req, res) => {
  try {
    const result = await register(req.body);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const loginController = async (req, res) => {
  try {
    const result = await login(req.body.email, req.body.password);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { registerController, loginController };