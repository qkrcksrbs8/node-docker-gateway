const express = require('express'); // npm i express
const router = express();
// api npm // npm i axios

const bodyParser = require("body-parser");
const axios = require("axios"); // npm i body-parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
    console.log('URL: ', req.url);
    console.log('모든 경로 필터')
    next();
})

//테스트 라우터
router.get('/test', (req, res) => {
    res.json({'code':'S001'});
})

//get gateway
router.get('/*', async (req, res) => {

    let startPath = req.path.split('/', 2)[1];
    let url = require('./config/urlConfig')[startPath].url;
    if (!url) return res.json({'code':'E001', 'msg':'유효하지 않은 요청입니다.'});
    url = `${url}${req.path}`;
    console.log(url);
    let response = await axios.get(url, {
        params: {
            id: 'test'
            ,pw: '1234'
        }
    });
    res.json({'code': response.data.code, 'message':response.data.message, 'data':response.data.data});
})

//포트 연결
router.listen(9000,()=>console.log(`http://localhost:9000`));