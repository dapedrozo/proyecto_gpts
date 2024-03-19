
export const checkUserRolesCreateAndUpdate = async (req, res, next) => {
  try {
    const userRole = req.user?.roles?.name;
    const userEmpresa = req.user?.empresa?.name;
    if (!userRole || !userEmpresa) return res.status(403).json({ message: "No se reconoce tu rol o tu empresa." });
    if (userRole!=="superAdmin") req.body.empresa = userEmpresa;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Ocurrió un error inesperado" });
  }
};

export const checkUserGets = async (req, res, next) => {
  try {
    const userRole = req.user?.roles?.name
    const userEmpresa = req.user?.empresa?.name
    if (!userRole || !userEmpresa) return res.status(403).json({ message: "No se reconoce tu rol o tu empresa." })
    let query = { estado: "Activo" }
    if (userRole!=="superAdmin") query.empresa = user.empresa._id
    req.query = query
    next();
  } catch (error) {
    return res.status(500).json({ error: "Ocurrió un error inesperado" });
  }
};