const express = require('express');
const contract = require('../contract/contract');
const web3 = require('../web3');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from Express + MongoDB + Web3!' });
});

// GET /hello/value — Call getValue() from smart contract
router.get('/value/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
        }
  
      const value = await contract.methods.getData(id).call();
      res.json({ contractValue: value });
    } catch (err) {
      console.error('Error calling contract:', err.message);
      res.status(500).json({ error: 'Failed to fetch value from smart contract' });
    }
  });

// POST /hello/data — Add data to the blockchain using addData function
router.post('/data', async (req, res) => {
  try {
    const { id, data } = req.body;

    // Validate input parameters
    if (!id || isNaN(id) || !data || isNaN(data)) {
      return res.status(400).json({ error: 'Invalid or missing ID or data. Both must be numbers.' });
    }

    // Get the account address from web3 wallet
    const fromAddress = web3.eth.defaultAccount;
    
    // Estimate gas for the transaction
    const gasEstimate = await contract.methods.addData(id, data).estimateGas({ from: fromAddress });
    
    // Send the transaction
    const receipt = await contract.methods.addData(id, data).send({
      from: fromAddress,
      gas: Math.round(gasEstimate * 1.2), // Add 20% buffer to gas estimate
      maxFeePerGas: web3.utils.toWei('30', 'gwei'),     // Set max fee per gas to 30 gwei
      maxPriorityFeePerGas: web3.utils.toWei('25', 'gwei')  // Set priority fee to 25 gwei (minimum required)
    });

    res.json({
      success: true,
      message: 'Data added successfully',
      transactionHash: receipt.transactionHash
    });
  } catch (err) {
    console.error('Error adding data to contract:', err.message);
    res.status(500).json({ error: 'Failed to add data to smart contract', details: err.message });
  }
});

module.exports = router;
