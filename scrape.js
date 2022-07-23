cats = [
    {"mainCategoryIdentification": 3001,"description": "Eigen rekening","sfcIcon_name": "money-bill-arrows"},
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


//const sleep = ms => new Promise(r => setTimeout(r, ms));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

content = "id|amount|time|bookingtime|description|other|other_iban|cat"+ "\n";

function GetRows(rows){
    console.log(rows);
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
                                      console.log(id + "|" + amount + "|" + time + "|" + bookingtime + "|" + description + "|" + other + "|" + other_iban + "|" + cat +"\n");
                                      content += id + "|" + amount + "|" + time + "|" + bookingtime + "|" + description + "|" + other + "|" + other_iban + "|" + cat +"\n";        
                                      }
                              ); // loop items      
                            } // row function 
                      ); // loop row     
}

async function LoadPage(jaartal, maand, category) {
    let w = window.open('https://bankieren.rabobank.nl/online/nl/dashboard/insights/categorie-overzicht/categorie-details?accountId=g3tQUYG-BCRy7FIZH1pgLQ&month='+ jaartal +'-'+ maand + '&category='+category, 's');
    await sleep(3000); 
    let rows = w.document.querySelectorAll("senses-timeline-group");
    GetRows(rows);
}

async function LoopMaanden() {
    var arr = [...Array(12).keys()];
    var maanden = arr.map((x)=> x +1);
    var arr7 = [...Array(3).keys()];
    var maanden7 = arr7.map((x)=> x +1);
    var scope = [
        //[2020, maanden],
        //[2021, maanden],
        [2022, maanden7]
    ]
    
  //  console.log(scope);
    scope.forEach(
        async (jaar) =>  { // inner functions also async https://bobbyhadz.com/blog/javascript-await-is-only-valid-in-async-functions#:~:text=The%20%22await%20is%20only%20valid,directly%20enclosing%20function%20as%20async%20.
            var jaartal = jaar[0];
            var maanden = jaar[1];   
            
            maanden.forEach( 
              async (maand) => {
                  //  console.log(jaartal + ' ' + maand )
                        await sleep(7000* maand); 
                        mint = maand;
                        maand = '00' + maand;
                        maand = maand.slice(-2);
                        category = '3004';
                        console.log(maand);                         
                        LoadPage(jaartal, maand, category);
              } //loop maand
                
            )            
        } // loop jaar         
    ) // loop scope
}

LoopMaanden(this); //starten vanaf deze page https://bankieren.rabobank.nl/online/nl/dashboard
//console.log(content);
