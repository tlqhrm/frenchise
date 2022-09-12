const { default: axios } = require("axios");
const fs = require("fs");
// const { data } = require("cheerio/lib/api/attributes");
// const FormData = require("form-data");

// const frm = new FormData()
// frm.append('applepay[]', "비자");
// frm.append('applepay[]', "마스터");
// frm.append('place',"444");
// frm.append("region_x","4444");
// frm.append("region_y","4444");
// frm.append("nickname","4444");

// axios.post("https://tapplace.co.kr/tapplace/test_update.php",frm,{
//   headers: frm.getHeaders()
// }).then((response) => {
//   console.log(response.data)
// })

async function payListCheck(data, pays) {
  const {address_name, category_group_name, id, phone, place_name,road_address_name, x, y} = data
  let result;
  await axios.post("http://localhost:3000/pay/list/check", 
    {
      store_id : id,
      place_name,
      address_name,
      road_address_name,
      category_group_name,
      x,
      y,
      phone,
      pays
    }
  ).then((res) => {
    result =  res.data;
    // console.log(res.data)
  })
  return result;
}

async function feedback(store_id,user_feedback) {
  let result;
  await axios.patch("http://localhost:3000/pay/feedback", 
    {
      store_id,
      user_feedback
      ,
      key:"1234"
    }
  ).then((res) => {
    result =  res.data;
    // console.log(res.data)
  })
  return result;
}

async function regist(store_name,pay) {
 await axios.get("https://dapi.kakao.com/v2/local/search/keyword.json" ,{
  headers : {"Authorization": "KakaoAK 48bef91e5643428c5d52556e0320e1ff"},
  params: {"query" : store_name},
}).then(async (response) => {
  const store = response.data['documents'][0];
  if(!store) return console.error("error",store_name);
  // console.log(store['id'],store_name,pay)
  const pays =  await payListCheck(store,pay);
  const store_id = store['id'];
  const user_feedback = [];
  const feed = pays['feedback'];
  if(!feed) console.log(pays)
  for (let pay of feed) {
    user_feedback.push({
      pay : pay['pay'],
      exist: pay['exist'],
      feed: true
    })
  }
  
  const feedback_result = await feedback(store_id,user_feedback);
  await console.log("success "+store_id+store_name);
 }).catch((err) => console.log("error2",err))
}

const data = fs.readFileSync('사전등록.json','utf-8', (err,data) => {
  if(err) {
    console.error("error3",err)
    return
  }
  return (data);
})

const gs25 = fs.readFileSync('gs25/gs25.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const cu = fs.readFileSync('cu/cu.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const seven11 = fs.readFileSync('seven11/s11.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 미니스톱 = fs.readFileSync('기타가맹점/미니스톱.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 롯데리아 = fs.readFileSync('기타가맹점/롯데리아.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 메가커피 = fs.readFileSync('기타가맹점/메가커피.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 빽다방 = fs.readFileSync('기타가맹점/빽다방.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 버거킹 = fs.readFileSync('기타가맹점/버거킹.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 올리브영 = fs.readFileSync('기타가맹점/올리브영.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 이디야 = fs.readFileSync('기타가맹점/이디야.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 파리바게트 = fs.readFileSync('기타가맹점/파리바게트.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 이니스프리 = fs.readFileSync('기타가맹점/이니스프리.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 이삭토스트 = fs.readFileSync('기타가맹점/이삭토스트.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 본죽 = fs.readFileSync('기타가맹점/본죽.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 할리스커피 = fs.readFileSync('기타가맹점/할리스커피.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 파스쿠찌 = fs.readFileSync('기타가맹점/파스쿠찌.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 매머드커피 = fs.readFileSync('기타가맹점/매머드커피.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 초록마을 = fs.readFileSync('기타가맹점/초록마을.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 컴포즈커피 = fs.readFileSync('기타가맹점/컴포즈커피.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 응응스크르 = fs.readFileSync('기타가맹점/응응스크르.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 던킨도너츠 = fs.readFileSync('기타가맹점/던킨도너츠.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 공차 = fs.readFileSync('기타가맹점/공차.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 갤러리아백화점 = fs.readFileSync('기타가맹점/갤러리아백화점.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 현대백화점 = fs.readFileSync('기타가맹점/현대백화점.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 이마트24 = fs.readFileSync('기타가맹점/이마트24.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 롯데슈퍼 = fs.readFileSync('기타가맹점/롯데슈퍼.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 아이파킹 = fs.readFileSync('기타가맹점/아이파킹.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})
const 서브웨이 = fs.readFileSync('서브웨이/서브웨이.json','utf-8', (err,data) => {if(err) { console.error(err); return }return (data);
})

const 프렌차이즈 = [
  // {
  //   data : gs25,
  //   pays : ['kakaopay','naverpay','payco','zeropay','apple_visa','conless_visa','conless_union','conless_jcb','google_visa']
  // },
  // {
  //   data : cu,
  //   pays : ['kakaopay','naverpay','payco','zeropay','apple_visa','apple_master','apple_jcb','conless_visa','conless_master','conless_union','conless_amex','conless_jcb','google_visa','google_master','google_maestro']
  // },
  {
    data : seven11,
    pays : ['kakaopay','naverpay','payco','zeropay','apple_visa','conless_visa','conless_jcb','google_visa']
  },
  {
    data : 미니스톱,
    pays : ['kakaopay','naverpay','payco','zeropay','apple_visa','apple_master','conless_visa','conless_master','conless_union','conless_amex']
  },
  {
    data : 롯데리아,
    pays : ['kakaopay','payco','zeropay','apple_master','conless_visa','conless_master','conless_union','conless_amex']
  },
  {
    data : 메가커피,
    pays : ['kakaopay','naverpay','payco']
  },
  {
    data : 빽다방,
    pays : ['kakaopay','payco','apple_visa','conless_visa','conless_master','conless_union']
  },
  {
    data : 버거킹,
    pays : ['payco']
  },
  {
    data : 올리브영,
    pays : ['kakaopay','payco','conless_visa','conless_union']
  },
  {
    data : 이디야,
    pays : ['kakaopay','naverpay','payco']
  },
  {
    data : 파리바게트,
    pays : ['kakaopay','naverpay','payco','zeropay','apple_master','conless_visa','conless_master','conless_union','conless_amex']
  },
  {
    data : 이니스프리,
    pays : ['kakaopay','payco']
  },
  {
    data : 이삭토스트,
    pays : ['kakaopay','payco']
  },
  {
    data : 본죽,
    pays : ['payco']
  },
  {
    data : 할리스커피,
    pays : ['kakaopay','payco']
  },
  {
    data : 파스쿠찌,
    pays : ['kakaopay','payco','conless_union']
  },
  {
    data : 매머드커피,
    pays : ['naverpay','payco']
  },
  {
    data : 초록마을,
    pays : ['kakaopay','payco','zeropay','conless_visa']
  },
  {
    data : 컴포즈커피,
    pays : ['payco']
  },
  {
    data : 응응스크르,
    pays : ['payco']
  },
  {
    data : 던킨도너츠,
    pays : ['kakaopay','naverpay','payco','conless_union']
  },
  {
    data : 공차,
    pays : ['kakaopay','payco','conless_visa','conless_union',]
  },
  {
    data : 갤러리아백화점,
    pays : ['kakaopay','naverpay','payco']
  },
  {
    data : 현대백화점,
    pays : ['kakaopay','naverpay','payco']
  },
  {
    data : 이마트24,
    pays : ['kakaopay','naverpay','payco','zeropay']
  },
  {
    data : 롯데슈퍼,
    pays : ['kakaopay','naverpay','payco']
  },
  {
    data : 아이파킹,
    pays : ['payco']
  },
  {
    data : 서브웨이,
    pays : ['kakaopay','naverpay','payco']
  },
]

async function registData(data) {
  for await(let ele of JSON.parse(data)) {
    await regist(ele["place"],[ele['payment']]);
  }
}

async function 프렌차이즈등록(프렌차이즈) {
  for await (let ele of 프렌차이즈) {
  let obj = await JSON.parse(ele['data']);
   await  console.log(ele['pays']);
    for await (let data of obj) {
      await regist(data, ele['pays']);
    }
  }
}


// registData(data);
프렌차이즈등록(프렌차이즈);

