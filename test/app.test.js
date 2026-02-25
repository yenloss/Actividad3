const request = require('supertest');
const app = require('../app');
const { calculateValue } = require('../lib/logic');


describe('Suite de Pruebas de Calidad de Software', () => {


  describe('Pruebas Unitarias - Lógica de Inventario', () => {
    test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
      const result = calculateValue(10, 5);
      expect(result).toBe(50);
    });


    test('Debe retornar 0 si se ingresan valores negativos', () => {
      const result = calculateValue(-10, 5);
      expect(result).toBe(0);
    });


    test('Debe calcular correctamente con decimales (12.5 * 4 = 50)', () => {
      const result = calculateValue(12.5, 4);
      expect(result).toBe(50);
    });


    test('Debe retornar 0 si el stock es 0', () => {
      const result = calculateValue(99, 0);
      expect(result).toBe(0);
    });
  });




  describe('Pruebas de Integración - API Endpoints', () => {
    test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
    });


    test('GET /items - Debe responder con JSON y mensaje esperado', async () => {
      const response = await request(app).get('/items');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'respond with items');
    });


    test('GET /users - Debe responder con status 200 y texto esperado', async () => {
      const response = await request(app).get('/users');
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('respond with a resource');
    });


    test('GET /ruta-inexistente - Debe responder 404', async () => {
      const response = await request(app).get('/no-existe');
      expect(response.statusCode).toBe(404);
    });
  });
});
