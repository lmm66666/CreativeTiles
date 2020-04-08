// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "tile-server-l2751",
})
const db = cloud.database();
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  const _id = event._id

  await db.collection('friendCircle').doc(_id).update({
    data: {
      num: _.inc(1)
    }
  })
}