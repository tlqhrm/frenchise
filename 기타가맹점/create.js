const { default: axios } = require("axios");
const qs = require('qs');
const fs = require('fs');


const options = {
  method: 'GET',
  url: "https://partner.payco.com/merchant/search/offline/detail/list?currentPage=1&perPage=400&partnerType=FRANCHISE&partnerCode=CHOROCMAEUL&searchWord="
  
};

점포명 = "초록마을"

const data = [];
axios(options).then((response) => {
  results = response.data.partnerList;

  for (result of results){
    data.push(result.partnerName)
  }
  // fs.writeFile("파리바게트.json",JSON.stringify(data))
  fs.writeFileSync(점포명+".json",JSON.stringify(data))

})




