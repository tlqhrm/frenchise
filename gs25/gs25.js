const { default: axios } = require("axios");
const qs = require('qs');
const fs = require('fs');
/// gs25는 크롤링 필요 x

let data = {
  'pageNum' : 1,
  'pageSize': 15895,
  'searchShopName': "" ,
  'searchSido': "",
  'searchGugun': "" ,
  'searchDong': "",
  'searchType': "",
  'searchTypeService': 0,
  'searchTypeToto': 0,
  'searchTypeCafe25': 0,
  'searchTypeInstant': 0,
  'searchTypeDrug': 0,
  'searchTypeSelf25':0,
  'searchTypePost':0,
  'searchTypeATM':0,
  'searchTypeWithdrawal':0,
  'searchTypeTaxrefund':0,
  'searchTypeSmartAtm':0,
  'searchTypeSelfCookingUtensils':0,
  'searchTypeDeliveryService':0,
}

const options = {
  method: 'POST',
  url: "http://gs25.gsretail.com/gscvs/ko/store-services/locationList?CSRFToken=a78584e0-3038-4e5f-9aef-d2e87e3b151a",
  headers: { 'content-type': 'application/x-www-form-urlencoded',
'Cookie':'JSESSIONID=2DFCD099441F2FD688A45E8DB9E5CA75.htomcat1' },
  data: qs.stringify(data),
};

const results = {
  results:[]
}
axios(options).then(async (response) => {
  result = JSON.parse(response.data).results;

  for(let title of result){
    await results.results.push(title.shopName);
  }

  fs.writeFileSync("gs25.json",JSON.stringify(results))
  console.log(results)
})




