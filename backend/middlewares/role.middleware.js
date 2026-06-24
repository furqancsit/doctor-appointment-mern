export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        try {
            // req.user must exist (so use protect middleware first)
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Not authorized, user not found",
                });
            }

            // Check role
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: `Role (${req.user.role}) is not allowed to access this resource`,
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
};