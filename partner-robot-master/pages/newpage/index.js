const app = getApp()
const host = app.globalData.host
const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: true
});
const openid = wx.getStorageSync("openid");
const getToken = require("../../utils/token").getToken
const SpeechRecognition = require("../../utils/sr")
const sleep = require("../../utils/util").sleep
const {
  getStorageImage
} = require('../onlineim.js')
Page({
  data: {
    loading: true,
    visable: true,
    points: 0,
    interval: "",
    leftshow: false,
    rightshow: false,
    play: true,
    pause: false,
    audio_path: "",
    audio_data: undefined,
    mymsg: '',
    teachermsg: '',
    speeching: false,
    isInitialized: false,
    playingSpeech: '',
    filepath: "",
    type: 0,
    thinking: false,
    Identifying: false,
    othersrStart: false,
    srResult: "",
    videoloading: true,
    imindex: 1,
    dataplaying: [],
    dataurls: [],
    showtip:false,
    canspeaknum:100,
    chatCountcount:"",
    url: [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/9406d59b-3f3f-4172-88b4-ca604c3c5e01.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/85da47a5-2c36-4427-8dbf-2a19d90c80fa.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/feceed23-45a6-4d9a-a12a-e406c1d4cc77.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/970808d5-f3e7-44db-a77e-91a7a06adba4.png"),
      getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/c0635ece-6a65-4666-9def-10318ac6b55f.png")
    ],
    
    mapl: app.globalData.mapl,
    teacherim: [
      [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/daf0abed-1810-459f-93dc-b444916ccb05.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/0dc43502-7679-4344-bdfa-40175b1e0eeb.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/92d71919-bf26-43b4-8dc1-97ff0ae67fb3.png")],
      [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ee4789d2-08da-4a26-b50d-3c5ff9d52b73.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/a758354f-3696-4332-876a-0bc17357ffb0.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/8696dd9a-19ab-4e8c-92b0-28cab659b2d1.png")],
      [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/9b32446f-bcd1-44d3-9334-e12c93c15325.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/4c88cfd4-4000-4878-81e4-5e500d8d1c16.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/3b279657-4e2a-409a-95cb-f073fbef5967.png")]
    ],
    meim: [
      [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/bb792341-1557-4e49-87ff-620274ed0dd5.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/50e37a97-4bf2-4878-b2f5-eb483c4cb9ca.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/2ffd67d4-24fa-4a65-98c0-8e9365ae86a7.png")],
      [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/303fdaf2-76c1-4e91-95d2-77177409cdd4.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/de673b47-fa51-42b9-951f-0d6e33ad9c06.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/a3b6fe18-d49f-4d56-9721-b76c7d7f3659.png")],
      [getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/ec41bd23-00f2-46db-b8d3-7931d70ce2ae.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/72af6985-1878-4831-a7c6-44d45bf36334.png"), getStorageImage("https://mp-e5245a2d-e568-43d9-8bc9-6ace734752d4.cdn.bspapp.com/cloudstorage/5e629d05-f10e-4f92-8a33-2e0547bad8d9.png")]
    ]
  },

  onLoad: async function (options) {
    let that = this
    this.setData({
      mapl: app.globalData.mapl
    })
    console.log(this.data.mapl)
    const AKID = app.globalData.E[0]
    const AKKEY = app.globalData.E[1]
    console.log("ali")
    console.log(app.globalData.E)
    let freetime = wx.getStorageSync("freetime")
    let freevoice = wx.getStorageSync("freevoicetime")
    this.setData({
      freetime: freetime,
      freevoice: freevoice,
      type: app.globalData.type,
      points: app.globalData.points,
      map: app.globalData.map,
      me: app.globalData.me,
      teacher: app.globalData.teacher,
      vipend: app.globalData.vipend,
      speed: app.globalData.speed
    });
    if (that.data.teacher == 3) {
      that.setData({
        playkey: app.globalData.E[2],
        freemodel: "VR6AewLTigWG4xSOukaG"
      })
    } else {
      that.setData({
        playkey: app.globalData.E[3],
        freemodel:"MF3mGyEYCl7XYWbV9V6O"
      })
    }
    // 人物转身计时器
    let Interval = setInterval(() => {
      if (that.data.imindex == 2) {
        that.setData({
          imindex: 1
        })
      } else {
        that.setData({
          imindex: that.data.imindex + 1
        })
      }
    }, 3000);

    that.setData({
      Interval: Interval
    })
    // 正常
    let timeout = setTimeout(function () {
      that.setData({
        loading: false
      })
      that.first_load()
      clearTimeout(timeout)
    }, 3000)
    if (!this.data.isInitialized) {
      // 执行初始化操作...
      this.setData({
        isInitialized: true
      });
      wx.showModal({
        title: '提示',
        content: '请耐心听完ai讲完之后，长按录音键至少五秒即可录音',
        success: res => {
          if (res.confirm) {
            console.log('用户点击了确定')
          } else if (res.cancel) {
            console.log('用户点击了取消')
          }
        }
      })
    }
   
    // 头部提示
    let list = ["Weather", "Climate", "Food", "Shopping", "Souvenir", "Park", "Culture", "Alley", "Sidewalk", "Historical site", "District", "Stroll", "Temple", "Garden", "Door", "Hobby", "Sports", "Fashion", "Travel", "Travel", "Work schedule ", "Workload", "Movie", "Theater", "Landmark", "Pride", "Strength", "History", "Education", "Religion", "Festival"]
    this.choice(list)
    // 语音识别鉴权与初始化
    this.sr_init()
    try {
      this.data.token = await getToken(AKID, AKKEY)
    } catch (e) {
      console.log("error on get token:", JSON.stringify(e))
      return
    }
    var sr = new SpeechRecognition({
      url: app.globalData.URL,
      appkey: app.globalData.E[2],
      token: this.data.token
    })

    console.log("appkey.................",app.globalData.E[2])

    sr.on("started", (msg) => {
      console.log("Client recv started")
    })

    sr.on("changed", (msg) => {

      this.setData({
        leftshow: true
      })
   
      this.setData({
        srResult: JSON.parse(msg).payload.result
      })
    })

    sr.on("completed", (msg) => {
      console.log("msg555555555555555555555555",msg)
      this.setData({
        srResult: JSON.parse(msg).payload.result
      })
    })

    sr.on("closed", () => {
      console.log("Client recv closed")
    })

    sr.on("failed", (msg) => {
      console.log(msg)
      console.log("???????\\\\\\\\\\\\????//",msg)
       // 语音识别鉴权与初始化
    this.sr_init()
    // try {
    //   this.data.token = await getToken(AKID, AKKEY)
    // } catch (e) {
    //   console.log("error on get token:", JSON.stringify(e))
    //   return
    // }
    let sr = new SpeechRecognition({
      url: app.globalData.URL,
      appkey: app.globalData.E[2],
      token: this.data.token
    })
    })
    this.data.sr = sr;

  },

  first_load() {
    let that = this;
    const newName = wx.getStorageSync('alname');
    const username = wx.getStorageSync('username');
    const place_list = [
      "",
      "Grand Canyon in Colorado in United states",
      "Rocky Mountains in Canada",
      "a small town in United Kingdom",
      "Germany City Hall",
      "Beach of Cape Town in South Africa",
      "Venice in Italy",
      "Dubai mall in UAE",
      "Saint Petersburg in Russia",
      "Nagoya City in Japan",
      "Bali of Indonesia",
      "Sydney Opera House in Australia"
    ];

    // let onloadanswer = `Hi ${username}, I'm ${newName},your buddy to walk around ${place_list[that.data.map]}. Nice to see you!
    // You can ask anything! Anything you can imagine. So, how's your day today?`; //获取的文字复；
     let onloadanswer = `walk around ${place_list[that.data.map]}. how's your day today?`; //获取的文字复；
    this.setData({
      preteachermsg: onloadanswer,
    })
    console.log("机器人语音转换中");
    var url = 'https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts';
    url = url + '?appkey=' + that.data.playkey;
    console.log("token" + that.data.token)
    url = url + '&token=' + that.data.token;
    url = url + '&text=' + onloadanswer;
    url = url + '&speech_rate=' + that.data.speed;
    url = url + '&format=' + "mp3";

    this.setData({
      playingSpeech: url
    })
    this.playRobotSpeech();
  },
  // 语音识别初始化
  sr_init: function () {
    wx.getRecorderManager().onFrameRecorded((res) => {
      if (res.isLastFrame) {
        console.log("record done")
      }
      if (this.data.sr && this.data.srStart) {
        console.log("send " + res.frameBuffer.byteLength)
        this.data.sr.sendAudio(res.frameBuffer)
      }
    })
    wx.getRecorderManager().onStart(() => {
      console.log("start recording...")

    })
    wx.getRecorderManager().onStop((res) => {
      console.log("stop recording...")
      if (res.tempFilePath) {
        wx.removeSavedFile({
          filePath: res.tempFilePath
        })
      }
    })
    wx.getRecorderManager().onError((res) => {
      console.log("recording failed:" + res)
    })

  },
  // 积分方法
  points: function () {
    let that = this
    console.log(app.globalData.points)
    let adp = 10
    app.globalData.points = this.data.points + adp
    that.setData({
      points: that.data.points + adp
    })
    console.log("points")
    that.butt("获得积分" + adp)
    wx.cloud.init({
      env: "chat-3gcx95wg01401d33"
    });

    wx.cloud.callFunction({
      name: 'updatedata',
      data: {
        filter: {
          openid: openid
        },
        new: {
          points: app.globalData.points
        }
      },
      success(res) {
        console.log(res)
        console.log("成功积分")
      },
      fail(err) {
        console.log("更新失败")
      }
    })
  },
  // 暂停方法
  pause: function () {
    if (!this.data.rightshow) {
      this.butt("发送消息试试吧！")
    } else {
      innerAudioContext.pause()
      console.log("pause")
      this.setData({
        pause: true,
        play: false
      })
      console.log(this.data)
    }
  },

  // 播放方法
  play: function () {
    innerAudioContext.play()
    console.log("playing")
    this.setData({
      play: true,
      pause: false
    })
    console.log(this.data);
   
  },
  // 回放方法
  replay: function () {
    this.setData({
      play: true,
      pause: false
    })
    innerAudioContext.stop()
    innerAudioContext.play()
  },
  // 开始录音的方法
  startRecord: async function () {
    wx.cloud.init({
          env: "chat-3gcx95wg01401d33"
        });
    
         // 查询数据库
         wx.cloud.callFunction({
          name: 'querydata',
          data: {
            filter: {
              openid: wx.getStorageSync("openid")
            }
          },
          success(res) {
            console.log(res)
            if (res.result.data.length != 0) {
              // 获取到用户，向全局传递用户信息
              console.log('成功查询,获取用户信息如下：');
              let userinfo = res.result.data[0]
    
              StorageGet("vipend", userinfo.vipend)
              // 这里的Date对象用于计算剩余天数，数据库只存储截至日期，减少数据库交互
              let day = new Date
              let x = (userinfo.vipend - day.getTime())
              if (x <=0) {
                wx.navigateTo({
                  url: '../otherpay/otherpay',
                })
              }
           }}})
    this.setData({
      speeching: true,
     
    
    });
    this.pause();
    if (!this.data.sr) {
      console.log("sr is null")
      return
    }

    if (this.data.srStart) {
      console.log("sr is started!")
      return
    }
    let sr = this.data.sr
    try {

      await sr.start(sr.defaultStartParams())
      this.data.srStart = true
  
      console.log("走了这条路",this.data.srStart);
      this.setData({
        othersrStart: true,
      });
    } catch (e) {
      console.log("start failed:" + e)
      this.startRecord()
      // return
    }

    wx.getRecorderManager().start({
      duration: 600000,
      numberOfChannels: 1,
      sampleRate: 16000,
      format: "PCM",
      frameSize: 4
    })
    
  },


  stopRecord: async function () {
    let that = this
    this.setData({
      speeching: false,
   
        othersrStart: false,
  
    })
    wx.getRecorderManager().stop()
    await sleep(500)
    if (this.data.srStart && this.data.sr) {
      try {
        console.log("prepare close sr")
        await this.data.sr.close()
        this.data.srStart = false
      } catch (e) {
        console.log("close sr failed:" + e)
      }
      this.setData({
        thinking: false,
        mymsg: that.data.srResult,
        Identifying: false,
        speeching: false
      });
      if (this.data.type == 0) {
        if (that.data.freetime > 0) {
          that.send()
          that.setData({
            freetime: that.data.freetime - 1
          })
          wx.setStorage({
            data: that.data.freetime,
            key: "freetime",
          })
        } 
        else {
          if ((that.data.vipend - Date.now()) < 86400000) {
            that.butt("免费次数以用尽，请及时充值！")
            wx.navigateTo({
              url: '../otherpay/otherpay',
            })
          } else {
            that.butt("今天的免费次数已用完，明天再来吧！")
          }
        }
      } else {
        that.send()
      }

    }

  },
  // 显示tips提示
  showtipfun:function () {
    this.setData({
      showtip: !this.data.showtip
    })
    console.log("showtip",this.data.showtip)
  },
  // 弹窗方法
  butt: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      success: function () {}
    })
  },
  // 发送消息
  send: function () {
    this.points()
    var that = this;
    let msg = this.data.srResult
    console.log(msg)
    this.setData({
      thinking: true
    })
    // 利用当前生成时间id，用于消息标记
    var msgdata = JSON.stringify({
      map: that.data.map,
      msg: msg,
      me: that.data.me,
      teacher: that.data.teacher
    });

    console.log("??????", this.data.thinking);
    // 向阿里服务器请求
    wx.request({
      url: host + '/message',
      method: 'POST',
      data: msgdata,
      success: function (res) {
        if (res.statusCode == 200) {
          console.log("gptres:"+res.data.resmsg)
          let answer = res.data.resmsg; //获取的文字复；
          that.setData({
            //  preteachermsg: answer,
            preteachermsg: answer,
          })
          console.log("机器人语音转换中");
          console.log()
          var url = 'https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts';
          url = url + '?appkey=' + that.data.playkey;
          console.log("token" + that.data.token)
          url = url + '&token=' + that.data.token;
          url = url + '&text=' + answer;
          url = url + '&speech_rate=' + that.data.speed;
          url = url + '&format=' + "mp3";

          that.setData({
            playingSpeech: url
          })

          that.setData({
            msg: ''
          })
          that.normalPlay()
          that.save()
        }
      },
      fail: function (res) {
        let answer = app.globalData.error;
        const regex = /Tom|Eric|kate|Linda|Cindy|Alex/gi;
        const newName = wx.getStorageSync('alname');
        const username = wx.getStorageSync('username');
        //获取的文字答复
        const newStr = answer.replace(regex, newName);
        let re = new RegExp("(?<!Hi )" + "(my name is|i'm)" + "\\s*" + username + "(?=[。,])", "i");
        // let newParagraph = newStr.replace(re, "my name is " + newName);
        let newParagraph = newStr.replace(re, function (match) {
          return match.startsWith("my") ? "my name is " + newName : "I'm " + newName;
        });
        //上述RegExp中的'(?<!Hi! )'表示前面不能是"Hi! "，'\\s*'表示零个或多个空格，
        //'(?=[。,])'表示后面必须是句点或逗号，'i'表示忽略大小写
        console.log(answer);
        that.setData({
          preteachermsg: answer,
        })
        console.log("机器人语音转换中");
        var url = 'https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts';
        url = url + '?appkey=' + that.data.playkey;
        console.log("token" + that.data.token)
        url = url + '&token=' + that.data.token;
        url = url + '&text=' + newStr;
        url = url + '&speech_rate=' + that.data.speed;
        url = url + '&format=' + "mp3";

        that.setData({
          playingSpeech: url
        })

        that.setData({
          msg: ''
        })
        that.playRobotSpeech()
        that.save()
      }
    })

  },
  outputText: function (text) {
    let that = this
    const words = text.split(' ');
    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= words.length) {
        clearInterval(intervalId)
        return
      };
      that.setData({
        teachermsg: words.slice(0, i + 1).join(' '),
        thinking: false,
        rightshow: true,
      })
      console.log(words.slice(0, i + 1).join(' '));
      i++;
    }, 300)
  },
  // 播放机器人语音的方法
  playRobotSpeech: function () {
    let that = this
    let freevoice = that.data.freevoice
    if (freevoice) {
      that.free_play()
    } else {
      that.normalPlay()
    }
  },
  normalPlay: function () {
    console.log("正常语音合成")
    var that = this;
    if (that.data.preteachermsg.length > 300) {
      that.long_voice()
      try {
        console.log(that.data.preteachermsg)
        that.outputText(that.data.preteachermsg)
      } catch {
        console.log(that.data.preteachermsg)
        that.setData({
          teachermsg: that.data.preteachermsg,
          thinking: false,
          rightshow: true,
        })
      }
      let index = 0
      let max_index = that.data.voice_list.length
      let voice_now = that.data.voice_list[0]
      var FilePath = voice_now;
      console.log(FilePath)
      that.setData({
        playingSpeech: FilePath,
      });
      console.log("播放机器人语音")
      if (wx.setInnerAudioOption) {
        wx.setInnerAudioOption({
          obeyMuteSwitch: false,
          autoplay: true
        })
      } else {
        innerAudioContext.obeyMuteSwitch = false;
        innerAudioContext.autoplay = true;
      }
      innerAudioContext.src = FilePath;
      innerAudioContext.play();
      console.log("播放成功")
      innerAudioContext.onEnded(() => {
        if (index == (max_index - 1)) {
          that.setData({
            speechIcon: '/images/speech0.png',
            playingSpeech: '',
            audioplaying: that.data.audioplaying - 1,
            play: true,
            pause: false,
          });
          console.log(FilePath)
        } else {
          index += 1
          console.log(that.data.voice_list)
          console.log(that.data.voice_list[index])
          innerAudioContext.src = that.data.voice_list[index];
          innerAudioContext.play();
        }
      })

    } else {
      try {
        console.log(that.data.preteachermsg)
        that.outputText(that.data.preteachermsg)
      } catch {
        console.log(that.data.preteachermsg)
        that.setData({
          teachermsg: that.data.preteachermsg,
          thinking: false,
          rightshow: true,
        })
      }
      var FilePath = that.data.playingSpeech;

      console.log("播放机器人语音")
      if (wx.setInnerAudioOption) {
        wx.setInnerAudioOption({
          obeyMuteSwitch: false,
          autoplay: true
        })
      } else {
        innerAudioContext.obeyMuteSwitch = false;
        innerAudioContext.autoplay = true;
      }

      innerAudioContext.src = FilePath;
      innerAudioContext.play();
      console.log("播放成功")
      innerAudioContext.onEnded(() => {
        that.setData({
          speechIcon: '/images/speech0.png',
          playingSpeech: '',
          audioplaying: that.data.audioplaying - 1,
          play: true,
          pause: false,
        });
      })
    }
  },
  // 免费播放
  free_play: function () {
    console.log("免费语音合成")

    // 长文本处理
    console.log("超长文本")
    let sentences = this.data.preteachermsg.split(".");
    let result = [sentences[0]];
    let that = this
    for (let i = 1; i < sentences.length; i++) {
      console.log("处理中")
      if ((result[result.length - 1] + "." + sentences[i]).length <= 300) {
        result[result.length - 1] += "." + sentences[i];
      } else {
        result.push(sentences[i]);
      }
    }
    let text = result[0]
    that.outputText(text)
    wx.request({
      method: "POST",
      responseType: 'arraybuffer',
      url: 'https://api.elevenlabs.io/v1/text-to-speech/'+that.data.freemodel+'/stream',
      data: {
        "text": text,
        "model_id": "eleven_multilingual_v1"
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.statusCode != 200) {
          that.normalPlay()
        } else {
          let d = res.data
          let date = Date.now()
          let filepath = wx.env.USER_DATA_PATH + '/temp1' + date + '.mp3'
          console.log(filepath)
          wx.getFileSystemManager().writeFile({
            filePath: filepath,
            data: d,
            encoding: 'binary',

            success: function () {
              console.log('Save temp file success');
              innerAudioContext.src = filepath
              innerAudioContext.play()
              innerAudioContext.onEnded(() => {
                that.setData({
                  speechIcon: '/images/speech0.png',
                  playingSpeech: '',
                  play: true,
                  pause: false,
                });
              })
            },
            fail: function () {
              console.log('Save temp file fail');
            }
          });
        }
      },
      fail(res) {
        wx.setStorage({
          data: false,
          key: "freevoice",
        })
        that.normalPlay()
        console.log(res)
      }
    })
  },
  choice: function (options) {
    const index = Math.floor(Math.random() * (options.length - 5));
    console.log(index)
    let text = []
    for (var i = 0; i < 3; i++) {
      console.log(text)
      text.push(options[index + i])
      this.setData({

        top_text: text
      })
    }
  },
  long_voice: function () {
    // voice_list
    // 长文本处理
    console.log("超长文本")
    let sentences = this.data.preteachermsg.split(".");
    let result = [sentences[0]];
    let voice_list = []
    let that = this
    for (let i = 1; i < sentences.length; i++) {
      console.log("处理中")
      if ((result[result.length - 1] + "." + sentences[i]).length <= 300) {
        result[result.length - 1] += "." + sentences[i];
      } else {
        result.push(sentences[i]);
      }
    }
    for (var i in result) {
      var url = 'https://nls-gateway-cn-shanghai.aliyuncs.com/stream/v1/tts';
      url = url + '?appkey=' + that.data.playkey;
      console.log("token" + that.data.token)
      url = url + '&token=' + that.data.token;
      // url = url + '&text=' + answer;
      url = url + '&text=' + result[i]
      url = url + '&speech_rate=' + that.data.speed;
      url = url + '&format=' + "mp3";
      voice_list.push(url)
    }
    console.log(result)
    console.log(voice_list)
    that.setData({
      voice_list: voice_list
    })
  },
  free_voice: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  save: function () {
    let that = this
    const event = {
      map: that.data.map,
      teacher: that.data.teacher,
      me: that.data.me,
      usermsg: that.data.srResult,
      teachermsg: that.data.teachermsg
    }
    let filter = {
      openid: openid
    }
    wx.cloud.callFunction({
      name: 'savechat',
      data: {
        filter: filter,
        detail: event,
        date: Date.now(),
        info: [
          app.globalData.UserInfo,
          app.globalData.UserSystem
        ],
        openid: openid
      },
      success(res) {
        console.log("成功存储用户信息" + res)
      }
    })
  },
  onUnload() {
    this.pause()
    let that = this
    clearInterval(that.data.Interval)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我用1个按钮玩了11个国家，\n快来一起对话新世界！',
      path: '/pages/index/index',
      imageUrl: "../../images/sharebg.png"
    }
  }
})