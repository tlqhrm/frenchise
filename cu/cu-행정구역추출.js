const { default: axios } = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const qs = require('qs');
const fs = require('fs');
/// gs25는 크롤링 필요 x

let cu = {
'pageIndex': 1,
'listType': "", 
'jumpoCode': "",
'jumpoLotto': "",
'jumpoToto': "",
'jumpoCash': "",
'jumpoHour': "",
'jumpoCafe': "",
'jumpoDelivery': "",
'jumpoBakery': "",
'jumpoFry': "",
'jumpoMultiDevice': "",
'jumpoPosCash': "",
'jumpoBattery': "",
'jumpoAdderss': "",
'jumpoSido': '',
'jumpoGugun': '',
'jumpodong': '',
'user_id': "",
'sido':'',
'Gugun': '',
'jumpoName': ""
}

const data = [
  {
    sido: "경기도"
  }
]

const gugun = {
  method: 'POST',
  url: "https://cu.bgfretail.com/store/GugunList.do",
  headers: { 'content-type': 'application/x-www-form-urlencoded',"Accept-Language": "ko,en;q=0.9,ko-KR;q=0.8,en-US;q=0.7"},
  data: qs.stringify(cu),
  responseType:"arraybuffer"
};

const dong = {
  method: 'POST',
  url: "https://cu.bgfretail.com/store/DongList.do",
  headers: { 'content-type': 'application/x-www-form-urlencoded',"Accept-Language": "ko,en;q=0.9,ko-KR;q=0.8,en-US;q=0.7"},
  data: qs.stringify(cu),
  responseType:"arraybuffer"
};

const options = {
  method: 'POST',
  url: "https://cu.bgfretail.com/store/list_Ajax.do",
  headers: { 'content-type': 'application/x-www-form-urlencoded'},
  data: qs.stringify(cu),
};

const sidos = [
  "경기도",
  "서울특별시",
  "경상남도",
  "부산광역시",
  "인천광역시",
  "충청남도",
  "경상북도",
  "강원도",
  "충청북도",
  "제주특별자치도",
  "대구광역시",
  "전라북도",
  "전라남도",
  "대전광역시",
  "광주광역시",
  "울산광역시",
  "세종특별자치시"
]

const results = {
  results:[]
}

const sigungudong = [];

async function gugunList(sido) {
  let cu = {
    'pageIndex': 1,
    'listType': "", 
    'jumpoCode': "",
    'jumpoLotto': "",
    'jumpoToto': "",
    'jumpoCash': "",
    'jumpoHour': "",
    'jumpoCafe': "",
    'jumpoDelivery': "",
    'jumpoBakery': "",
    'jumpoFry': "",
    'jumpoMultiDevice': "",
    'jumpoPosCash': "",
    'jumpoBattery': "",
    'jumpoAdderss': "",
    'jumpoSido': '',
    'jumpoGugun': '',
    'jumpodong': '',
    'user_id': "",
    'sido':sido,
    'Gugun': '',
    'jumpoName': ""
    }

    await axios({
      method: 'POST',
      url: "https://cu.bgfretail.com/store/GugunList.do",
      headers: { 'content-type': 'application/x-www-form-urlencoded',"Accept-Language": "ko,en;q=0.9,ko-KR;q=0.8,en-US;q=0.7"},
      data: qs.stringify(cu),
      responseType:"arraybuffer"
    }).then((response) => {
      const guguns = JSON.parse(iconv.decode(response.data,"EUC-KR")).GugunList
      // console.log()
      for(const gugun of guguns) {
        // console.log(gugun)
        if(sido == "세종특별자치시") {
          sigungudong.push({
            시도 : sido,
            시군구 : gugun["CODE_NAME"],
            동읍면 : ""
          })
        }else {
          dongList(sido, gugun["CODE_NAME"]);
        }
       
      }
    
    })
}


async function dongList(sido,gugun) {
  let cu = {
    'pageIndex': 1,
    'listType': "", 
    'jumpoCode': "",
    'jumpoLotto': "",
    'jumpoToto': "",
    'jumpoCash': "",
    'jumpoHour': "",
    'jumpoCafe': "",
    'jumpoDelivery': "",
    'jumpoBakery': "",
    'jumpoFry': "",
    'jumpoMultiDevice': "",
    'jumpoPosCash': "",
    'jumpoBattery': "",
    'jumpoAdderss': "",
    'jumpoSido': '',
    'jumpoGugun': '',
    'jumpodong': '',
    'user_id': "",
    'sido':sido,
    'Gugun': gugun,
    'jumpoName': ""
    }

    await axios({
      method: 'POST',
      url: "https://cu.bgfretail.com/store/DongList.do",
      headers: { 'content-type': 'application/x-www-form-urlencoded',"Accept-Language": "ko,en;q=0.9,ko-KR;q=0.8,en-US;q=0.7"},
      data: qs.stringify(cu),
      responseType:"arraybuffer"
    }).then((response)=> {
      const dongs = JSON.parse(iconv.decode(response.data,"EUC-KR")).GugunList
      for(const dong of dongs) {
        // console.log(dong["CODE_NAME"])
        sigungudong.push({
          시도 : sido,
          시군구 : gugun,
          동읍면 : dong["CODE_NAME"]
        })
      }
    })
}

// 행정구역 json 
(async function() {
for(const sido of sidos){
 await  gugunList(sido);
}
fs.writeFileSync("cu-행정2.json",JSON.stringify(sigungudong))

})();
