var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var itemsRouter = require('./routes/items')

var app = express()

const client = require('prom-client');
client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP procesadas',
  labelNames: ['metodo', 'ruta', 'estado_http'],
});

const activeUsersGauge = new client.Gauge({
    name: 'active_users_current',
    help: 'Número actual de usuarios activos simulados'
});

// Track active users periodically
setInterval(() => {
  activeUsersGauge.set(Math.floor(Math.random() * 50) + 10);
}, 5000);

// Record metrics at the end of each request
app.use((req, res, next) => {
  res.on('finish', () => {
    // Evitar contar llamadas a /metrics si quieres mantener el dato limpio de ruido (opcional)
    if (req.path !== '/metrics') {
      httpRequestCounter.labels({
        metodo: req.method,
        ruta: req.path,
        estado_http: res.statusCode.toString()
      }).inc();
    }
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/items', itemsRouter)

module.exports = app
