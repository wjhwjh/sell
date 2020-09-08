/*
localStorage的存和取
*/
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    // 先转化为对象，因为本地存储的都是字符串，在使用时都要转化为对象
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.justify(seller)
}

export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__
  // 如果没有seller这个属性，返回默认值；如果有则要转化为对象
  if (!seller) return def
  // seller存在的情况下，seller转化为对象
  seller = JSON.parse(seller)

  // 当seller[id]不存在的时候返回默认值，如果存在则返回默认值
  if (!seller[id]) return def

  // 返回seller
  return seller
}
