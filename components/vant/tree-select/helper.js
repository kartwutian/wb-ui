/* eslint-disable */

function isArray(array) {
  return array && array.constructor === 'Array';
}

function isActive (activeList, itemId) {
  if (isArray(activeList)) {
    return activeList.indexOf(itemId) > -1;
  }

  return activeList === itemId;
}

module.exports.isActive = isActive;
