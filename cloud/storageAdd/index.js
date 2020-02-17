// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "tile-server-l2751",
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const type = event.type
  const picPath = event.picPath
  const picName = event.picName
  var openid = event.openid
  if(openid == undefined){
    const wxContext = cloud.getWXContext()
    openid = wxContext.OPENID
  }
  console.log("openid: " + openid)
  const res = await db.collection("storage").where({id: _.eq(openid)}).get({})
  console.log(res.data)
  //用户第一次写入, 新建数据结构
  if(res.data.length == 0){
    if (type == 'tile'){
      await db.collection("storage").add({
        data: {
          id: openid,
          tileData: [{picPath: picPath, picName: picName}],
          sampleData: []
        }
      })
    }
    else if (type == "sample"){
      await db.collection("storage").add({
        data: {
          id: openid,
          tileData: [],
          sampleData: [{picPath: picPath, picName: picName}]
        }
      })
    }
  }
  //用户已有记录，拓展数据结构
  else{
    if (type == 'tile'){
      await db.collection("storage").doc(res.data[0]._id).update({
        data: {
          tileData: _.push({picPath: picPath, picName: picName}),
        }
      })
    }
    else if (type == 'sample'){
      await db.collection("storage").doc(res.data[0]._id).update({
        data: {
          sampleData: _.push({picPath: picPath, picName: picName}),
        }
      })
    }
  }
}