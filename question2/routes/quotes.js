const express = require('express');
const jwt = require('jsonwebtoken');
const { evaluateQuote } = require('../models/quotes');
const { authorize } = require('../utils/auths');

const router = express.Router();

// POST /quotes/evaluate - Evaluate a quote
router.post('/evaluate', authorize, (req, res) => {
  const { id, score } = req.body;
  const token = req.get('authorization');
  const decoded = jwt.decode(token);

  if (!id || score === undefined) {
    return res.sendStatus(400); // Bad request
  }

  const evaluationResult = evaluateQuote(id, decoded.username, score);

  if (evaluationResult.error) {
    return res.status(evaluationResult.statusCode).json({ error: evaluationResult.error });
  }

  return res.json(evaluationResult);
});

module.exports = router;
