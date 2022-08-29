const { default: axios } = require("axios");
const qs = require('qs');
const fs = require('fs');

const options = {
  method: 'GET',
  url: "https://partner.payco.com/merchant/search/offline/detail/list?currentPage=1&perPage=120000&partnerType=FRANCHISE&partnerCode=SEVENELEVEN&searchWord="};

const data = [];
axios(options).then((response) => {
  results = response.data.partnerList;

  for (result of results){
    data.push(result.partnerName)
  }
  fs.writeFileSync("s11.json",JSON.stringify(data))

})




