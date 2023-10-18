import redis
from redis.commands.json.path import Path
import json

# 免费用户的限额
PLAN_FREE = {
    "limits": { # 代表当前类型的用户使用 chat 的次数限额
        "edu": { # 代表使用 chatbot 的类型, edu 代表高考咨询 ai
            "limit": 50, # 限定次数
            "window": "8h" # 代表次数使用完毕后需要多长时间才能恢复
        },
        "glm": {
            "limit": 50,
            "window": "8h"
        },
        "gpt-3.5-turbo": {
            "limit": 50,
            "window": "8h",
        },
        "gpt-4": {
            "limit": 0,
            "window": "1d",
        }
    },
    "prices": { # 代表不同档位的价格
        "yearly": 0,    # 年卡
        "quarterly": 0, # 季卡
        "monthly": 0,   # 月卡
        "other": 0      # 其他方案
    }
}

# 更高一级的用户
PLAN_PRO = {
    "limits": { 
        "edu": { 
            "limit": 3000, 
            "window": "8h" 
        },
        "glm": {
            "limit": 3000,
            "window": "8h"
        },
        "gpt-3.5-turbo": {
            "limit": 50,
            "window": "8h",
        },
        "gpt-4": {
            "limit":50, 
            "window": "1d"
        }
    },
    "prices": { 
        "yearly": 120,
        "quarterly": 30,
        "monthly": 10,
        "other": 114
    }
}

# 最高级用户
PLAN_PREMIUM = {
    "limits": { 
        "edu": { 
            "limit": 3000, 
            "window": "8h" 
        },
        "glm": {
            "limit": 3000,
            "window": "8h"
        },
        "gpt-3.5-turbo": {
            "limit": 3000,
            "window": "8h",
        },
        "gpt-4": {
            "limit":3000, 
            "window": "1d"
        }
    },
    "prices": { 
        "yearly": 360,
        "quarterly": 90,
        "monthly": 30,
        "other": 514
    }
}

def load_config(file_path: str=".redis.json"):
    '''从给定的文件读取 upstash 配置信息'''
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def set_plans(r):
    '''设置 plan 字段的信息，可以用于初始化数据库以及后续 plan 字段改变的修改'''
    try:
        r.json().set("plan:free", "$", PLAN_FREE)
        r.json().set("plan:pro", "$", PLAN_PRO)
        r.json().set("plan:premium", "$", PLAN_PREMIUM)
        print("Plans are set successfully.")
    except Exception as e:
        print(e)

if __name__ == "__main__":
    config = load_config()
    r = redis.Redis(**config)
    set_plans(r)
