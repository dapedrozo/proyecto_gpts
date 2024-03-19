export const checkEmpresaGets = async (req, res, next) => {
  try {
    const userRole = req.user?.roles?.name;
    const userEmpresa = req.user?.empresa?.name;
    if (!userRole || !userEmpresa) return res.status(403).json({ message: "No se reconoce tu rol o tu empresa." });
    next();
  } catch (error) {
    return res.status(500).json({ error: "Ocurrió un error inesperado" });
  }
};
