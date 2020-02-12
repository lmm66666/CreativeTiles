// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "tile-server-l2751",
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const picPath = event.picPath
  const picName = event.picName
  console.log("openid: " + openid)
  const res = await db.collection("storage").where({id: _.eq(openid)}).get({})
  console.log(res.data)
  //用户第一次写入, 新建数据结构
  if(res.data.length == 0){
    await db.collection("storage").add({
      data: {
        id: openid,
        picPath: [picPath],
        picName: [picName],
      }
    })
  }
  //用户已有记录，拓展数据结构
  else{
    await db.collection("storage").doc(res.data[0]._id).update({
      data: {
        picPath: _.push(picPath),
        picName: _.push(picName)
      }
    })
  }
}