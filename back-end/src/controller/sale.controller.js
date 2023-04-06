const saleService = require('../service/sale.service');
const { verifyToken } = require('../utils/verify.token');

const register = async (req, res) => {
    const newSale = req.body;
    const token = req.header('Authorization');
    const tokenValidate = verifyToken(token);
    if (tokenValidate.type) {
      return res.status(tokenValidate.type).json(tokenValidate.message);
    }
    const { type, message } = await saleService.register(newSale);
    if (type) return res.status(type).json(message);
    return res.status(201).json(message);
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getOrder(+id);
  if (type) return res.status(type).json(message);
  return res.status(200).json(message);
};

const getDetails = async (req, res) => {
  const { saleId } = req.params;
  const { type, message } = await saleService.getDetails(+saleId);
  if (type) return res.status(type).json(message);
  return res.status(200).json(message);
};

const getAllSellers = async (_req, res) => {
  const { type, message } = await saleService.getAllSellers();
  if (type) return res.status(type).json(message);
  return res.status(200).json(message);
};

const getSeller = async (req, res) => {
  const { sellerId } = req.params;
  const { type, message } = await saleService.getSeller(+sellerId);
  if (type) return res.status(type).json(message);
  return res.status(200).json(message);
};

const update = async (req, res) => {
  const { saleId } = req.params;
  const { status } = req.body;
  const { type, message } = await saleService.update(saleId, status);
  if (type) return res.status(type).json(message);
  return res.status(202).json(message);
};

module.exports = {
  register,
  getOrder,
  getDetails,
  getAllSellers,
  getSeller,
  update,
};