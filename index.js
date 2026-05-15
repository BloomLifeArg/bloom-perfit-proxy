const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.PERFIT_API_KEY || 'bloomlife-MFsgND2hDCIrk4LKz7icZs2bRMdUm9Sx';
const ACCOUNT = 'bloomlife';
const BASE = `https://api.myperfit.com/v2/${ACCOUNT}`;

async function perfitGet(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, data };
  return data;
}

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/campaigns', async (req, res) => {
  try {
    const data = await perfitGet(`/campaigns?limit=${req.query.limit || 100}&sort=launchDate&order=DESC`);
    res.json(data);
  } catch (e) { res.status(e.status || 500).json(e.data || { error: e.message }); }
});

app.get('/contacts/stats', async (req, res) => {
  try {
    const data = await perfitGet('/contacts?limit=1');
    res.json(data);
  } catch (e) { res.status(e.status || 500).json(e.data || { error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Perfit proxy corriendo en puerto ${PORT}`));
