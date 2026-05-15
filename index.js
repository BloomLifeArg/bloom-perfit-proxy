const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.PERFIT_API_KEY || 'bloomlife-MFsgND2hDCIrk4LKz7icZs2bRMdUm9Sx';
const ACCOUNT = 'bloomlife';
const BASE = `https://api.myperfit.com/v2/${ACCOUNT}`;

async function perfitGet(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, data };
  return data;
}

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/campaigns', async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const data = await perfitGet(`/campaigns?limit=${limit}&sort=launchDate&order=DESC`);
    res.json(data);
  } catch (e) {
    res.status(e.status || 500).json(e.data || { error: e.message });
  }
});

app.get('/contacts/stats', async (req, res) => {
  try {
    const data = await perfitGet('/contacts?limit=1');
    res.json(data);
  } catch (e) {
    res.status(e.status || 500).json(e.data || { error: e.message });
  }
});

app.get('/lists', async (req, res) => {
  try {
    const data = await perfitGet('/lists');
    res.json(data);
  } catch (e) {
    res.status(e.status || 500).json(e.data || { error: e.message });
  }
});

app.get('/campaigns/:id', async (req, res) => {
  try {
    const data = await perfitGet(`/campaigns/${req.params.id}`);
    res.json(data);
  } catch (e) {
    res.status(e.status || 500).json(e.data || { error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Perfit proxy corriendo en puerto ${PORT}`));
