class ApiError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}

const handleError = (err, res) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error('Erro interno do servidor:', err);
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor.' });
};

export { ApiError, handleError };