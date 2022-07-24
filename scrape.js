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
            if(w.document.querySelectorAll(querySelector).length > 0){
                let rows = w.document.querySelectorAll("senses-timeline-group");
                GetRows(rows);  
                console.log('loaded');
                console.log(content);
                clearInterval(timer);
                resolve();
            }else if(timeout && now - startTime >= timeout){
                clearInterval(timer);
                reject();
            }
        }, 1000);
    });
}




var jaartal = 2021;
var maandpar2 = '11';
var category = 3024;


content = "id|amount|time|bookingtime|description|other|other_iban|cat"+ "\n";
urls = ["https://bankieren.rabobank.nl/online/nl/dashboard/insights/categorie-overzicht/categorie-details?accountId=g3tQUYG-BCRy7FIZH1pgLQ&month=2021-01&category=3024",
"https://bankieren.rabobank.nl/online/nl/dashboard/insights/categorie-overzicht/categorie-details?accountId=g3tQUYG-BCRy7FIZH1pgLQ&month=2021-02&category=3024",
    "https://bankieren.rabobank.nl/online/nl/dashboard/insights/categorie-overzicht/categorie-details?accountId=g3tQUYG-BCRy7FIZH1pgLQ&month=2021-03&category=3024"]
    


function loop_url(i) {
      let w = window.open(urls[i], 'new');
      waitForElement("senses-timeline-group", 15000).then(function(){
            //w.close();
            if (i<3) {
              i++;
              loop_url(i);
            }
      }).catch(()=>{
          console.log("element did not load in 15 seconds");
      });
}

loop_url(0);
