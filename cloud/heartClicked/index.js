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
  const id = wxContext.OPENID
  const picPath = event.picPath
  const picName = event.picName
  var tempText = ''
  // 查询个人收藏中否有该记录
  const res = await db.collection("storage").where({
    id: _.eq(id), 
    tileData: {picPath: picPath, picName: picName}
  }).get()
  //如果有删除
  console.log(res)
  if (res.data.length != 0){
    await cloud.callFunction({
      name: "storageDel",
      data:{
        type: 'tile',
        openid: id,
        picInfo: {picPath: picPath, picName: picName}
      }
    })
    tempText = "已从收藏夹移除"
  }
  else{
    await cloud.callFunction({
      name: "storageAdd",
      data: {
        type: 'tile',
        openid: id,
        picPath: picPath,
        picName: picName
      }
    })
    tempText = "收藏成功!"
  }

  return{
    text: tempText
  }
}