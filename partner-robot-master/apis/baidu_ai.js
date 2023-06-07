// const app = getApp()
// const getToken = require("../../utils/token").getToken
// const SpeechRecognition = require("../../utils/sr")
// const sleep = require("../../utils/util").sleep
// const akid = "LTAI5tFDH9mJZ5QU2ErqFjm5"
// const akkey="FwV11XpxwrRYpEAwtUWiDSnQsPKqha"
// const appkey = "8pgX80WntL1sz3yh"
// function token(){
//   let token = await getToken(akid,akkey)
//   let sr = new SpeechRecognition({
//     url : "wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1",
//     appkey: appkey,
//     token: this.data.token
// })
// await sr.start(sr.defaultStartParams())

// }

export function soundReco(data) {

  let token = wx.getStorageSync("user-token");
  if (!token) {
    getToken();
  }
  return new Promise((resolve, regest) => {
    wx.request({
      url: `https://vop.baidu.com/server_api?dev_pid=1737&cuid=155236miniapp&token=${token}`,
      method: "POST",
      data: data,
      header: {
        "Content-Type": "audio/pcm;rate=16000"
      },
      success: (res) => {
        resolve(res.data.result[0]);
      },
      fail: regest
    })
  });
}
