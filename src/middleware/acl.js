'use strict';

function acceptAdmin() {
  return (req, res, next) => {
    try {
      if(req.user.role === 'admin') {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next ('Invalid request.');
    }
  }
}

module.exports = acceptAdmin;