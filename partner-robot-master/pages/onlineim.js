const fileSystem = wx.getFileSystemManager()
const app = getApp()
const getStorageImage = (web_image) => {
let webImages = wx.getStorageSync('webImages') || []
let webImage = webImages.find(y => y.web_path === web_image)
if (webImage) {
try {
fileSystem.accessSync(webImage.local_path)
return webImage.local_path
} catch(e) {
let webImageIdx = webImages.findIndex(y => y.web_path === web_image)
webImages.splice(webImageIdx, 1)
wx.setStorageSync('webImages', webImages)
}
} else {
wx.downloadFile({
url: web_image,
success (res) {
if (res.statusCode === 200) {
let filePath = res.tempFilePath
let webImageStorage = wx.getStorageSync('webImages') || []
let storage = {
web_path: web_image,
local_path: filePath,
last_time: Date.parse(new Date()),
}
webImageStorage.push(storage)
wx.setStorageSync('webImages', webImageStorage)
}
}
})
}
return web_image
}

function StorageGet(key, online){

  try {
    var value = wx.getStorageSync(key)
    if (value) {
      if (key=="vipstart"){
        app.globalData.vipstart = value
        console.log(value)
      }else if(key=="vipend"){
        app.globalData.vipend = value
        console.log(value)
      }else if(key=="type"){
        app.globalData.type = value
        console.log(value)
      }
      // Do something with return value
    }else{
      wx.setStorageSync(key, online)
      console.log(online)
      if (key=="vipstart"){
        app.globalData.vipstart = online
      }else if(key=="vipend"){
        app.globalData.vipend = online
      }else if(key=="type"){
        app.globalData.type = online
      }
    }
  } catch (e) {
    // Do something when catch error
    console.log("error")
  }
}
module.exports = {
getStorageImage,
StorageGet
}