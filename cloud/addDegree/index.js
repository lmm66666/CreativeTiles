// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "tile-server-l2751",
})
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id
  const temp = event.degree

  await db.collection('handbook').doc(id).update({
    data: {
      degree: temp + 1
    }
  })
}