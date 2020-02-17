// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "tile-server-l2751",
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var type = event.type
  var openid = event.openid
  const picInfo = event.picInfo
  if (openid == undefined){
    const wxContext = cloud.getWXContext()
    openid = wxContext.OPENID
  }

  console.log(picInfo)
  const tileRes = await db.collection("storage").where({
    id: _.eq(openid), 
    tileData: picInfo
  }).get()
  const sampleRes = await db.collection("storage").where({
    id: _.eq(openid), 
    sampleData: picInfo
  }).get()

  if((tileRes.data.length != 0) && (type == "tile")){
    await db.collection("storage").doc(tileRes.data[0]._id).update({
      data: {
        tileData: _.pull(picInfo)
      }
    })
  }
  if ((sampleRes.data.length != 0) && (type == "sample")){
    await db.collection("storage").doc(sampleRes.data[0]._id).update({
      data: {
        sampleData: _.pull(picInfo)
      }
    })
  }
}