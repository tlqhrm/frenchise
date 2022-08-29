const { default: axios } = require("axios");
const FormData = require("form-data");

const frm = new FormData()
frm.append('applepay[]', "비자");
frm.append('applepay[]', "마스터");
frm.append('place',"444");
frm.append("region_x","4444");
frm.append("region_y","4444");
frm.append("nickname","4444");

axios.post("https://tapplace.co.kr/tapplace/test_update.php",frm,{
  headers: frm.getHeaders()
}).then((response) => {
  console.log(response.data)
})





