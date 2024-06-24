

const adminmiddleware = async (req, res, next) => {
    try {
      const admin = req.user.isAdmin;
      if (!admin) {
        return res.status(403).json({ message: "Cannot access because the user is not an admin" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
  



module.exports=adminmiddleware;