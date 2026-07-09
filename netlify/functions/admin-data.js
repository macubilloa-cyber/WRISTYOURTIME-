// Backend del panel admin de Wrist Your Time.
// Lee y escribe inventario.json (público) y costos.json (privado) directamente
// en el repo de GitHub, usando un token guardado como variable de entorno en
// Netlify. El token y la contraseña NUNCA llegan al navegador.

const OWNER = 'macubilloa-cyber';
const REPO = 'WRISTYOURTIME-';
const BRANCH = 'main';
const GITHUB_API = 'https://api.github.com';

function ghHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json'
  };
}

async function getFile(path) {
  const res = await fetch(
    `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: ghHeaders() }
  );
  if (!res.ok) throw new Error(`No pude leer ${path} (${res.status})`);
  const json = await res.json();
  const content = Buffer.from(json.content, 'base64').toString('utf-8');
  return { data: JSON.parse(content), sha: json.sha };
}

async function putFile(path, sha, dataObj, message) {
  const content = Buffer.from(JSON.stringify(dataObj, null, 2)).toString('base64');
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: ghHeaders(),
    body: JSON.stringify({ message, content, sha, branch: BRANCH })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`No pude guardar ${path} (${res.status}): ${errText}`);
  }
  return res.json();
}

exports.handler = async (event) => {
  try {
    const password =
      event.headers['x-admin-password'] || event.headers['X-Admin-Password'];

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Contraseña incorrecta' }) };
    }

    if (event.httpMethod === 'GET') {
      const [inv, costos] = await Promise.all([
        getFile('inventario.json'),
        getFile('costos.json')
      ]);
      const merged = inv.data.watches.map((w) => {
        const c = costos.data.costs.find((x) => x.id === w.id) || {};
        return { ...w, cost: c.cost ?? null, stock: c.stock ?? 0 };
      });
      return { statusCode: 200, body: JSON.stringify({ watches: merged }) };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const watches = body.watches || [];

      const publicData = {
        watches: watches.map(({ cost, stock, ...rest }) => rest)
      };
      const costData = {
        costs: watches.map((w) => ({
          id: w.id,
          cost: w.cost === '' || w.cost === undefined ? null : w.cost,
          stock: w.stock ?? 0
        }))
      };

      const [invFile, costFile] = await Promise.all([
        getFile('inventario.json'),
        getFile('costos.json')
      ]);

      await Promise.all([
        putFile('inventario.json', invFile.sha, publicData, 'Actualizar inventario (admin)'),
        putFile('costos.json', costFile.sha, costData, 'Actualizar costos (admin)')
      ]);

      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
