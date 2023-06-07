from flask import Flask,request
import requests
import json
import random
import openai
import os
import re
import traceback
from fake_useragent import UserAgent as ua
map_l = ["USA", "Canada", "English", "Germany", "South Africa", "Italy", "UAE", "Russia", "Japan", "Indonesia", "Australia"]
teacher_l = ["Linda", "Cindy", "Alex"]
me_l = ["Tom", "Eric", "Kate"]

app = Flask(__name__)

@app.route('/')
def video_src():
    headers = {
        "user-agent":ua().random
    }
    map_list = ["USA", "Canada", "English", "Germany", "South Africa",
                "Italy", "UAE", "Russia", "Japan", "Indonesia", "Australia"]
    api_list = ["https://lens.zhihu.com/api/v4/videos/1639121391814447104",
                "https://lens.zhihu.com/api/v4/videos/1639133385329934336",
                "https://lens.zhihu.com/api/v4/videos/1639113763809898496",
                "https://lens.zhihu.com/api/v4/videos/1638929221744685056",
                "https://lens.zhihu.com/api/v4/videos/1639116078667325440",
                "https://lens.zhihu.com/api/v4/videos/1639136194473644032",
                "https://lens.zhihu.com/api/v4/videos/1639118456128819200",
                "https://lens.zhihu.com/api/v4/videos/1639135202315395072",
                "https://lens.zhihu.com/api/v4/videos/1638931535884812288",
                "https://lens.zhihu.com/api/v4/videos/1639130626702663680",
                "https://lens.zhihu.com/api/v4/videos/1639126897996009472"]
    res = [""]
    for i in api_list:
        resp = requests.get(i, headers=headers).content.decode("utf-8")
        for n, j in enumerate(re.findall('"play_url": "(.*?)"',resp)):
            if n<1:
                pass
            if n==1: 
                res.append(j)
    return json.dumps(res)

@app.route('/message',methods = ['POST'])
def mess(): 
    t = teacher_l[request.json.get('teacher')-1]
    m = me_l[request.json.get('me')-1]
    p = map_l[request.json.get('map')-1]
    message = request.json.get('msg')
    sb_key_list = ['sb-787796022c2d90f1901996543b6ab9dd6b077cd4dd8a712d']

    
    try:
        for sb_key in sb_key_list:
            try:
                headers = {"user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        'Content-Type': 'application/json','Authorization': f'Bearer {sb_key}'}

                data = {"model": "gpt-3.5-turbo","messages": [  {"role":"system",
                  "content":"场景说明：你叫"+t+"，是幽默机敏的12岁孩子，和"+m+"走在"+p+"街上，你正在回复"+m+"。请用问句结束答复，用幽默的方式让对话持续不断。用一段完整的话答复。请准备120秒的回答，前40秒鼓励、赞扬"+m+"。PLEASE ONLY REPLY IN A FULL PARAGRAPH, NO ANY FURTHER ROUNDS OF TALK."}
      ,{"role": "user","content": message}]}
                url = 'https://api.openai-sb.com/v1/chat/completions'
                completion = requests.post(url=url, headers=headers, data=json.dumps(data))
                completion = json.loads(completion.text)
                content = completion["choices"][0]["message"]["content"]
                resmsg = content.replace("gpt3", t).replace('gpt3.5', t).replace("GPT-3", t).replace("GPT", t).replace("openai", t).replace("OpenAI", t)
                res = json.dumps({"resmsg":resmsg,"code":200})
               
                break
            except:
                print("error!!")
                continue
        return res



    except:
        print("error!!!!!!")
        error_list = ["Oops, I think I need a coffee break!","Oh, my circuits are a bit overloaded. Let me take a few deep breaths and try again.",
        "Oops, looks like I'm feeling a little brain freeze. Want to grab a coffee and come back later?", "Sorry, I'm a little rusty today. Can you give me a moment to oil my gears?",
        "My processors are feeling a bit sluggish. Can we take a quick stretch break to get the blood flowing?"]
        er = random.choice(error_list)
        res = {
                "code": 200,
                "resmsg": {
                    "choices": [
                        {
                            "message": {
                                "content": er,
                                "role": "assistant"
                            }
                        }
                    ],
                }
            }

        return json.dumps(res)

if __name__ == '__main__':
    app.run(threaded = False,processes=5,host="127.0.0.1",port="5555")



