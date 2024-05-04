const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  let pagesArray = {
    "/" :                     ['index.html', "text/html"],
    "/js/main.js" :           ['js/main.js', 'text/javascript'],
    '/css/style.css' :        ['css/style.css'],
    '/asset/Bronze_11.png' :  ['asset/Bronze_11.png', 'image/png'],
    '/asset/Bronze_30.png' :  ['asset/Bronze_30.png', 'image/png'],
    '/asset/fast.gif' :       ['asset/fast.gif', 'image/gif'],
  }

  let levelsArray = {
    "2" :     'novice',
    "5" :    'Udemy Hill',
    '8' :    'Aspirant',
    '12' :    'Novelty',
    '15' :    'Novelty Wearing Off',
    '20' :    'Trough of Sorrow',
    '24' :    'Pushing the ANKI',
    '28' :    'Still Trough of Sorrow',
    '32' :    'Releases of Improvement',
    '36' :   'Still Trough of Sorrow',
    '40' :   'Crash on Ineptitude',
    '45' :   'Still Trough of Sorrow',
    '50' :   'Wiggles of False Hope',
    '56' :   'Still Trough of Sorrow',
    '62' :   'The Promise Lands!',
    '70' :   'Software Developver',
  }

  if (page == '/api') {
    runAPI()
  }else if(pagesArray[page]){
    servePage(pagesArray[page][0], pagesArray[page][1])
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }

  function servePage(page, contentType){
    fs.readFile(page, function(err, data) {
      contentType => res.writeHead(200, {...headers,'Content-Type': contentType});
      res.write(data);
      res.end();
    });
  }

  function runAPI(){ 
    res.writeHead(200, {...headers, 'Content-Type': 'application/json'});
    const objToJson = {
      flip: Math.ceil(Math.random()*2),
      level: levelsArray[params.score],
    }

    res.end(JSON.stringify(objToJson));
  }//else if

  function levelCounter(score){
    return levelsArray[score][0]
  }
}); //create server

server.listen(8000);
