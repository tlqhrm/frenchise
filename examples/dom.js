const { default: axios } = require("axios");
const cheerio = require("cheerio");

const getHTML = async(keyword) => {
  try {
    return await axios.get("https://www.inflearn.com/courses?s=" + encodeURI(keyword))
  } catch(err) {
 console.log(err)
  }
}

const parsing = async (keyword) => {
  const html = await getHTML(keyword);
  const $ = cheerio.load(html.data);
  const $courseList = $(".course_card_item");

  let courses = [];
  $courseList.each((idx, el) => {
    const title = $(el).find(".course_title:eq(0)").text();
    courses.push({
      title : $(el).find(".course_title:eq(0)").text(),
      instructor: $(el).find(".instructor").text(),
      price : $(el).find(".price").text(),
      rating: $(el).find(".star_solid").css("width"),
      img: $(el).find(".card-image > figure > img").attr("src")
    })
    
  })
  console.log(courses);
}

parsing('자바스크립트')