// api/process.js  → Proxy propio en Vercel (el método definitivo)

export default async function handler(req, res) {
  // CORS total (tu frontend en cualquier dominio)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo POST permitido' });
  }

  try {
    // TU NUEVO SPACE SIC (con /predict)
    const hfResponse = await fetch('https://camcel-sic.hf.space/predict', {
      method: 'POST',
      body: req.body,                    // FormData completo (video + params)
      headers: {
        // NO tocar Content-Type → fetch lo genera con boundary
        ...Object.fromEntries(
          Object.entries(req.headers).filter(([k]) => 
            !['host', 'content-length', 'connection'].includes(k.toLowerCase())
          )
        ),
        host: 'camcel-sic.hf.space',
      },
      duplex: 'half',                    // Obligatorio para FormData grande
    });

    // Reenviar headers importantes
    hfResponse.headers.forEach((value, key) => {
      if (!['transfer-encoding', 'connection', 'content-length'].includes(key)) {
        res.setHeader(key, value);
      }
    });

    // Streaming directo = videos grandes sin problemas
    res.status(hfResponse.status);
    if (hfResponse.body) {
      return hfResponse.body.pipe(res);
    } else {
      const arrayBuffer = await hfResponse.arrayBuffer();
      return res.send(Buffer.from(arrayBuffer));
    }

  } catch (error) {
    console.error('Error en proxy Vercel:', error);
    res.status(500).json({ 
      error: 'Error interno del proxy', 
      details: error.message 
    });
  }
}

// Configuración esencial para videos grandes
export const config = {
  api: {
    bodyParser: false,      // Crucial para FormData
    responseLimit: false,   // Sin límite de respuesta (video base64)
  },
};
