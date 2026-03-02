import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración de la prueba: 50 usuarios virtuales durante 1 minuto
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Rampa ascendente a 20 usuarios
    { duration: '1m', target: 20 },  // Mantener 20 usuarios por 1 minuto
    { duration: '30s', target: 0 },  // Rampa descendente a 0 usuarios
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // El 95% de las peticiones deben ser < 500ms
  },
};

export default function () {
  // Simulando interacción con dos endpoints clave
  
  // 1. Endpoint de Salud (Health Check)
  let res1 = http.get('http://localhost:3000/health');
  check(res1, {
    'health status is 200': (r) => r.status === 200,
    'health returns OK': (r) => r.json().status === 'OK',
  });

  sleep(1);

  // 2. Endpoint de Items (Inventario)
  let res2 = http.get('http://localhost:3000/items');
  check(res2, {
    'items status is 200': (r) => r.status === 200,
    'items message is correct': (r) => r.json().message === 'respond with items',
  });

  sleep(1);
}
