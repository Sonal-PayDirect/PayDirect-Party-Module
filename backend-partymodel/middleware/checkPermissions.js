const { Permissions, UserRole } = require('../models');

const checkPermission = (resource, action) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.user_id; // Assuming user ID is stored in req.user
      const userRole = await UserRole.findOne({ where: { user_id: userId } });

      if (!userRole) {
        return res.status(403).json({ message: 'User role not found' });
      }

      const permission = await Permissions.findOne({
        where: {
          role_id: userRole.role_id,
          resource,
          [`can_${action}`]: true,
        },
      });

      if (!permission) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      console.error('Error checking permission:', error);
      res.status(500).json({ error: 'Error checking permission' });
    }
  };
};

module.exports = checkPermission;
