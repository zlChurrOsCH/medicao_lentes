import app from './src/app.js'

const PORT = process.env.PORT || 5000

// ouve a PORTA 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT} !`)
})