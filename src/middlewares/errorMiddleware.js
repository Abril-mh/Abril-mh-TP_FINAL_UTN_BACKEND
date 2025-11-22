export const errorMiddleware = (err, req, res, next) => {
    console.error("Error atrapado:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Algo salió mal, oh no 💥",
    });
};