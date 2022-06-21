'use strict';

/**
 * Description:
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

module.exports = function (req, res, next) {
  res.status(404).send('Not found');
};