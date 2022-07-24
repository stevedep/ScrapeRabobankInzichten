cats =   [{"mainCategoryIdentification": 3001,"description": "Eigen rekening","sfcIcon_name": "money-bill-arrows"},
    {"mainCategoryIdentification": 3002,"description": "Sparen & beleggen","sfcIcon_name": "piggybank"},
    {"mainCategoryIdentification": 3003,"description": "Hobby’s & vrije tijd","sfcIcon_name": "ticket"},
    {"mainCategoryIdentification": 3004,"description": "Boodschappen","sfcIcon_name": "cart"},
    {"mainCategoryIdentification": 3005,"description": "Uit eten & drinken","sfcIcon_name": "cocktail"},
    {"mainCategoryIdentification": 3033,"description": "Vakantie","sfcIcon_name": "parasol"},
    {"mainCategoryIdentification": 3006,"description": "Sport","sfcIcon_name": "reward"},
    {"mainCategoryIdentification": 3007,"description": "Kleding & sieraden","sfcIcon_name": "coat-hanger"},
    {"mainCategoryIdentification": 3008,"description": "Verzorging & gezondheid","sfcIcon_name": "heart-pulse-line"},
    {"mainCategoryIdentification": 3039,"description": "Vervoer","sfcIcon_name": "car"},
    {"mainCategoryIdentification": 3009,"description": "Cadeaus","sfcIcon_name": "gift"},
    {"mainCategoryIdentification": 3012,"description": "Goede doelen","sfcIcon_name": "hand-heart"},
    {"mainCategoryIdentification": 3013,"description": "Internet, TV & bellen","sfcIcon_name": "signal"},
    {"mainCategoryIdentification": 3040,"description": "Huishouden & elektronica","sfcIcon_name": "table-lamp"},
    {"mainCategoryIdentification": 3041,"description": "Tuin & dier","sfcIcon_name": "bird"},
    {"mainCategoryIdentification": 3019,"description": "Onderwijs","sfcIcon_name": "book-cover"},
    {"mainCategoryIdentification": 3020,"description": "Kinderopvang","sfcIcon_name": "baby-bottle"},
    {"mainCategoryIdentification": 3042,"description": "Zak- & kleedgeld","sfcIcon_name": "purse"},
    {"mainCategoryIdentification": 3021,"description": "Verzekeringen","sfcIcon_name": "security"},
    {"mainCategoryIdentification": 3022,"description": "Energie & water","sfcIcon_name": "house-tree"},
    {"mainCategoryIdentification": 3023,"description": "Klussen & onderhoud","sfcIcon_name": "wrench"},
    {"mainCategoryIdentification": 3024,"description": "Salaris","sfcIcon_name": "money-bills"},
    {"mainCategoryIdentification": 3025,"description": "Uitkering","sfcIcon_name": "envelope-euro"},
    {"mainCategoryIdentification": 3026,"description": "Pensioen","sfcIcon_name": "sunrise"},
    {"mainCategoryIdentification": 3027,"description": "Stufi","sfcIcon_name": "baret"},
    {"mainCategoryIdentification": 3028,"description": "Alimentatie","sfcIcon_name": "family"},
    {"mainCategoryIdentification": 3029,"description": "Huur","sfcIcon_name": "calendar-check"},
    {"mainCategoryIdentification": 3030,"description": "Hypotheek","sfcIcon_name": "house-check"},
    {"mainCategoryIdentification": 3031,"description": "Belastingen","sfcIcon_name": "paper-tax"},
    {"mainCategoryIdentification": 3032,"description": "Toeslagen","sfcIcon_name": "paper-euro"},    
    {"mainCategoryIdentification": 3034,"description": "Creditcard","sfcIcon_name": "bankcard"},
    {"mainCategoryIdentification": 3035,"description": "Lenen","sfcIcon_name": "bag-money"},
    {"mainCategoryIdentification": 3036,"description": "Contanten","sfcIcon_name": "wallet"},
    {"mainCategoryIdentification": 3037,"description": "Bankkosten","sfcIcon_name": "building"},
    {"mainCategoryIdentification": 3038,"description": "Betaalverzoeken","sfcIcon_name": "hand-euro"},
    {"mainCategoryIdentification": 3000,"description": "Overig","sfcIcon_name": "label"}];

urls = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function MaakUrls() {

var catteller = 0;
    cats.forEach( (x)=> {
    category = x['mainCategoryIdentification'];
    var teller = 0;  

    var arr2020 = [...Array(6).keys()];
    var maanden2020 = arr2020.map((x)=> [x +8, category, catteller]);
    var arr7 = [...Array(7).keys()];
    var arr = [...Array(12).keys()];
    var maanden = arr.map((x)=> [x +1, category, catteller]);
    var arr7 = [...Array(7).keys()];
    var maanden7 = arr7.map((x)=> [x +1, category, catteller]);
    var scope = [
        [2020, maanden2020],
        [2021, maanden],
        [2022, maanden7]
    ]
            scope.forEach(
                 (jaar) =>  { 
                    var jaartal = jaar[0];
                    var maanden = jaar[1];   
                     for(let i = 0; i < maanden.length; i++) {                       
                                teller++;
                                let mint = maanden[i][0];
                                let maandparr = '00' + maanden[i][0];
                                maandparr = maandparr.slice(-2);  
                                let category = maanden[i][1];
                         
                                urls.push('https://bankieren.rabobank.nl/online/nl/dashboard/insights/categorie-overzicht/categorie-details?accountId=g3tQUYG-BCRy7FIZH1pgLQ&month='+ jaartal +'-'+ maandparr + '&category='+category);
                      } //loop maand                
                                
                } // loop jaar         
            ) // loop scope
    catteller++;
    }) // loop cat
}

MaakUrls();


content = "id|amount|time|bookingtime|description|other|other_iban|cat"+ "\n";

function GetRows(rows){
    //console.log(rows);
        rows.forEach(function(row) {
                              var items = row.__ngContext__[22].items;                              
                              items.forEach(
                                  function(item){
                                
                                      var trans = item.transaction;
                                      var id = trans.id;
                                      var amount = trans.amount;
                                      var bookingtime = trans.bookingtime;
                                      var description = trans.description;
                                      var other = trans.otherParty.fullName;
                                      var cat = trans.category.mainCategoryIdentification;
                                      var other_iban = trans.otherParty.iban;
                                      var time= trans.timestamp;
                                      //console.log(id + "|" + amount + "|" + time + "|" + bookingtime + "|" + description + "|" + other + "|" + other_iban + "|" + cat +"\n");
                                      content += id + "|" + amount + "|" + time + "|" + bookingtime + "|" + description + "|" + other + "|" + other_iban + "|" + cat +"\n";        
                                      }
                              ); // loop items      
                            } // row function 
                      ); // loop row     
}


function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}


/**
// https://stackoverflow.com/questions/34863788/how-to-check-if-an-element-has-been-loaded-on-a-page-before-running-a-script
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout              
 */
function waitForElement(querySelector, timeout=0){
    const startTime = new Date().getTime();
    return new Promise((resolve, reject)=>{
        const timer = setInterval(()=>{
            const now = new Date().getTime();
              //if(w.document.querySelectorAll(querySelector).length > 0){
            //modify below to define a successfull load, nested if because or statement was not working..
            if(w.document.querySelectorAll(".category-details--info-text").length > 0) {
                let rows = w.document.querySelectorAll("senses-timeline-group");
                    GetRows(rows);  
                    clearInterval(timer);
                    resolve();
            } else {
                if(w.document.querySelectorAll("sfc-card-content > senses-timeline-item-host > senses-insights-transaction > div > sfc-item > a > div.sfc-item__content > section > div > div.sfc-item__label > span").length > 0) {
                    //console.log('items: ' + w.document.querySelectorAll("sfc-card-content > senses-timeline-item-host > senses-insights-transaction > div > sfc-item > a > div.sfc-item__content > section > div > div.sfc-item__label > span").length);
                    //console.log('info tex: ' + w.document.querySelectorAll(".category-details--info-text").length);
                    let rows = w.document.querySelectorAll("senses-timeline-group");
                    GetRows(rows);  
                    clearInterval(timer);
                    resolve();
                } else if (timeout && now - startTime >= timeout){
                            clearInterval(timer);
                            reject();
                                    }
            }}, 100);
    });
}


content = "id|amount|time|bookingtime|description|other|other_iban|cat"+ "\n";
var w; //declare globally

function loop_url(i) {
      w = window.open(urls[i], 'new');
      waitForElement("senses-timeline-group", 4000).then(function(){
            //w.close();
            if (i<=urls.length-1) {
                console.log(i);
              i++;
              loop_url(i);
            } else {
                download("rabodata.csv", content);
            }
      }).catch(()=>{
          console.log("element did not load in 15 seconds");
          if (i<=urls.length-1) {
              i++;
              loop_url(i);
            } else {
                download("rabodata.csv", content);
            }
      });
}

loop_url(100);
