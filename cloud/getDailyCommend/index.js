// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "tile-server-l2751",
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取日期
  var time = new Date()
  var day = time.getDate()
  console.log(day)

  // 获取服务器数据
  const res = await db.collection("dailyCommend").get({})
  var data = res.data
  var len = data.length
  console.log(data.length)

  // 根据日期取数据
  var temp = []
  for(var i=day-1; i<day-1+5*20; i+=20){
    if (i < len){
      temp.push(data[i])
    }
    else{
      temp.push(data[i%len])
    }
  }
  console.log(temp)

  return{
    data: temp
  }
}