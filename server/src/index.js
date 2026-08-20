const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const multer = require('@koa/multer');
const { v4: uuidv4 } = require('uuid');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Настройка хранения файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    }
});

const upload = multer({ storage });

// Хранилище сообщений в памяти
let messages = [];
let pinnedMessage = null;
let favorites = [];

// Демо-данные
const demoMessages = [
    {
        id: uuidv4(),
        type: 'text',
        content: 'Добро пожаловать в Chaos Organizer! 🚀',
        timestamp: Date.now() - 3600000,
        author: 'Bot'
    },
    {
        id: uuidv4(),
        type: 'text',
        content: 'Отправляйте сообщения, файлы, ссылки. Всё будет сохранено!',
        timestamp: Date.now() - 1800000,
        author: 'Bot'
    },
    {
        id: uuidv4(),
        type: 'text',
        content: 'Попробуйте команду: @chaos: погода',
        timestamp: Date.now() - 600000,
        author: 'Bot'
    }
];

messages = [...demoMessages];

// WebSocket сервер
const wss = new WebSocket.Server({ port: 8081 });
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('close', () => {
        clients.delete(ws);
    });
});

function broadcast(data) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Маршруты API
router.get('/api/messages', async (ctx) => {
    const { limit = 10, offset = 0 } = ctx.query;
    const start = parseInt(offset);
    const end = start + parseInt(limit);

    const result = messages.slice(-end, -start || undefined);
    ctx.body = {
        messages: result,
        total: messages.length,
        hasMore: messages.length > end
    };
});

router.post('/api/messages', async (ctx) => {
    const { content, type = 'text' } = ctx.request.body;

    const message = {
        id: uuidv4(),
        type,
        content,
        timestamp: Date.now(),
        author: 'User'
    };

    messages.push(message);
    broadcast({ type: 'new_message', message });
    ctx.body = message;
});

router.post('/api/upload', upload.single('file'), async (ctx) => {
    const file = ctx.file;
    if (!file) {
        ctx.status = 400;
        ctx.body = { error: 'No file uploaded' };
        return;
    }

    const message = {
        id: uuidv4(),
        type: 'file',
        content: {
            filename: file.originalname,
            path: `/uploads/${file.filename}`,
            size: file.size,
            mimetype: file.mimetype
        },
        timestamp: Date.now(),
        author: 'User'
    };

    messages.push(message);
    broadcast({ type: 'new_message', message });
    ctx.body = message;
});

router.get('/api/messages/search', async (ctx) => {
    const { q } = ctx.query;
    if (!q) {
        ctx.body = { messages: [] };
        return;
    }

    const results = messages.filter(msg => {
        if (msg.type === 'text') {
            return msg.content.toLowerCase().includes(q.toLowerCase());
        }
        return false;
    });

    ctx.body = { messages: results };
});

router.post('/api/messages/pin', async (ctx) => {
    const { messageId } = ctx.request.body;
    const message = messages.find(m => m.id === messageId);

    if (!message) {
        ctx.status = 404;
        ctx.body = { error: 'Message not found' };
        return;
    }

    pinnedMessage = message;
    broadcast({ type: 'pin_changed', message: pinnedMessage });
    ctx.body = { success: true };
});

router.delete('/api/messages/pin', async (ctx) => {
    pinnedMessage = null;
    broadcast({ type: 'pin_changed', message: null });
    ctx.body = { success: true };
});

router.post('/api/messages/favorite', async (ctx) => {
    const { messageId } = ctx.request.body;
    const message = messages.find(m => m.id === messageId);

    if (!message) {
        ctx.status = 404;
        ctx.body = { error: 'Message not found' };
        return;
    }

    if (!favorites.some(m => m.id === messageId)) {
        favorites.push(message);
        broadcast({ type: 'favorites_updated', favorites });
    }

    ctx.body = { success: true };
});

router.delete('/api/messages/favorite', async (ctx) => {
    const { messageId } = ctx.request.body;
    favorites = favorites.filter(m => m.id !== messageId);
    broadcast({ type: 'favorites_updated', favorites });
    ctx.body = { success: true };
});

router.get('/api/messages/favorites', async (ctx) => {
    ctx.body = { favorites };
});

router.get('/api/messages/pin', async (ctx) => {
    ctx.body = { pinned: pinnedMessage };
});

// Команды бота
const botCommands = {
    'погода': () => {
        const forecasts = ['☀️ Солнечно, +25°C', '⛅ Облачно, +18°C', '🌧️ Дождливо, +12°C', '❄️ Снежно, -5°C'];
        return forecasts[Math.floor(Math.random() * forecasts.length)];
    },
    'время': () => `🕐 ${new Date().toLocaleTimeString()}`,
    'дата': () => `📅 ${new Date().toLocaleDateString()}`,
    'привет': () => '👋 Привет! Как дела?',
    'справка': () => 'Доступные команды: погода, время, дата, привет, справка'
};

router.post('/api/bot/command', async (ctx) => {
    const { command } = ctx.request.body;
    const response = botCommands[command] ? botCommands[command]() : 'Неизвестная команда';

    const message = {
        id: uuidv4(),
        type: 'text',
        content: `🤖 ${response}`,
        timestamp: Date.now(),
        author: 'Bot'
    };

    messages.push(message);
    broadcast({ type: 'new_message', message });
    ctx.body = message;
});

// Статические файлы
app.use(static('./uploads'));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});