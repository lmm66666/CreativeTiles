// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "tile-server-l2751",
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  //数据初始化
  const page = event.page
  if (event.brand == '全部'){
    var brand = ["马可波罗", "蒙娜丽莎"]
  }
  else{
    var brand = [event.brand]
  }
  if (event.color == '全部'){
    var color = ['灰色', '棕色', '杏色', '黑色', '白色', '褐色', '黄色']
  }
  else{
    var color = [event.color]
  }
  if (event.type == '全部'){
    var type = ['1295', '地理石', '瓷片', '中国印象文化陶瓷', 'E石代', '全抛釉', 'E-stone+', '真石', '罗马高档仿石砖系列', '新型陶瓷砖板系列', '七星珍石', '时尚新贵抛光砖系列', '新贵抛光砖系列', '现代仿古砖系列', '瓷木地板砖系列', '下乡-定制产品']
  }
  else{
    var type = [event.type]
  }
  if (event.width == '全部'){
    var width = ['4800', '3600', '2400', '1800', '1200', '900', '800', '600', '300']
  }
  else{
    var width = [event.width]
  }
  if (event.height == '全部'){
    var height = ['3600', '2400', '1600', '1200', '900', '800', '600', '400', '300', '200']
  }
  else {
    var height = [event.height]
  }


  // 没有尺寸要求，加快效率
  if ((event.height == '全部') && (event.width == '全部')){
    const resNoSize = await db.collection("tileData").where(
      {
        brand: _.in(brand),
        color: _.in(color),
        type: _.in(type),
      }
    ).skip(8*(page-1)).limit(8).get({})
    console.log(resNoSize.data) //打印
    return{
      tileData: resNoSize.data
    }
  }
  //有尺寸要求
  else{
    var size = []
    //生成size表格
    for (var i=0; i<width.length; i++){
      for (var j=0; j<height.length; j++){
        size.push(width[i] + 'x' + height[j])
      }
    }
    console.log(size)
    //查询
    const resWithSize = await db.collection("tileData").where(
      {
        brand: _.in(brand),
        color: _.in(color),
        type: _.in(type),
        size: _.in(size)
      }
    ).skip(8*(page-1)).limit(8).get({})
    //打印
    console.log(resWithSize.data)
    return{
      tileData: resWithSize.data
    }
  }
}