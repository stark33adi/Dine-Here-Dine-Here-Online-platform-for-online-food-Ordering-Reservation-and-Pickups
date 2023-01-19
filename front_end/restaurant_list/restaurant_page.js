const all_restraunt_api="http://123.56.14.64/Restaurant_Automation/restaurant/getAllRestaurant.do";

function color_to_hex(){ 
            const menu_portal= new XMLHttpRequest();
            window.alert('boom');
            menu_portal.open('POST',all_restraunt_api);

            menu_portal.onload = function (){
                window.alert(this.responseText);
                let obj = JSON.parse(this.responseText);
                sessionStorage.setItem('restraunt_list',obj);
                document.getElementById('the_r_display').innerHTML= restraunt_displayer(obj); 
            }
            menu_portal.send(JSON.stringify({}));

    }


// handles the filter values

let filters_parameters={'restaurantTypeFilter':[], 'rateValueFilter':null, 'deliveryTimeFilter':'30'};
function fetch_filtered_values_ft(id){
        var flag=false;
        var temp=[];
        for(let x of filters_parameters['restaurantTypeFilter']){
            if (x == String(document.getElementById(id).value)){
                flag=true;
            }else{ 
                temp.push(x);
            }
        }
        if(flag==true){
            // means user wans to de select it
            filters_parameters['restaurantTypeFilter']=temp;
        }else{  
            filters_parameters['restaurantTypeFilter'].push(document.getElementById(id).value);
        }
              
}

function fetch_filtered_values_rate(){
    if (filters_parameters['rateValueFilter']=='5.0'){
        // means user wans to de select it
        filters_parameters['rateValueFilter']=null;
    }else{
        filters_parameters['rateValueFilter']='5.0';
    }
}

function fetch_filtered_values_dt(id){
    //displays dt scale value
    document.getElementById('dt_display').innerHTML= document.getElementById('dt_scale').value +' mins';
    //stores the the dt scale value
    filters_parameters['deliveryTimeFilter']=document.getElementById(id).value;
}


// fetch the filtered values
function display_values(){
    window.alert(JSON.stringify(filters_parameters));

    const menu_portal= new XMLHttpRequest();
    window.alert('boom');
    menu_portal.open('POST',"http://123.56.14.64/Restaurant_Automation/restaurant/filter.do");

    menu_portal.onload = function (){
        window.alert(this.responseText);
        //let obj = JSON.parse(this.responseText);
        //sessionStorage.setItem('restraunt_list',obj);
        //document.getElementById('the_r_display').innerHTML= restraunt_displayer(obj); 
    }
    menu_portal.send(JSON.stringify(filters_parameters));
}

let sample = {
    "result": 0,
    "data": {
        "African": [
            {
                "restaurantId": 7,
                "email": "rogrady7@gmail.com",
                "restaurantName": "Tawakal Halal Cafe",
                "restaurantAbbrName": "THC",
                "address": "389 Maverick St\nBoston, MA 02128",
                "phone": "(617) 418-5890",
                "openStatus": "open",
                "rateValue": 4.6,
                "deliveryTime": "30",
                "foodType": "Non-Veg",
                "genDateFromList": "2010-02-05"
            },
            {
                "restaurantId": 7,
                "email": "rogrady7@gmail.com",
                "restaurantName": "Tawakal Halal Cafe",
                "restaurantAbbrName": "THC",
                "address": "389 Maverick St\nBoston, MA 02128",
                "phone": "(617) 418-5890",
                "openStatus": "open",
                "rateValue": 4.6,
                "deliveryTime": "30",
                "foodType": "Non-Veg",
                "genDateFromList": "2010-02-05"
            },
            {
                "restaurantId": 7,
                "email": "rogrady7@gmail.com",
                "restaurantName": "Tawakal Halal Cafe",
                "restaurantAbbrName": "THC",
                "address": "389 Maverick St\nBoston, MA 02128",
                "phone": "(617) 418-5890",
                "openStatus": "open",
                "rateValue": 4.6,
                "deliveryTime": "30",
                "foodType": "Non-Veg",
                "genDateFromList": "2010-02-05"
            },
            {
                "restaurantId": 7,
                "email": "rogrady7@gmail.com",
                "restaurantName": "Tawakal Halal Cafe",
                "restaurantAbbrName": "THC",
                "address": "389 Maverick St\nBoston, MA 02128",
                "phone": "(617) 418-5890",
                "openStatus": "open",
                "rateValue": 4.6,
                "deliveryTime": "30",
                "foodType": "Non-Veg",
                "genDateFromList": "2010-02-05"
            },
            {
                "restaurantId": 7,
                "email": "rogrady7@gmail.com",
                "restaurantName": "Tawakal Halal Cafe",
                "restaurantAbbrName": "THC",
                "address": "389 Maverick St\nBoston, MA 02128",
                "phone": "(617) 418-5890",
                "openStatus": "open",
                "rateValue": 4.6,
                "deliveryTime": "30",
                "foodType": "Non-Veg",
                "genDateFromList": "2010-02-05"
            }
        ],
        "American": [
            {
                "restaurantId": 5,
                "email": "voldford5@163.com",
                "restaurantName": "Pammy's",
                "restaurantAbbrName": "PAM",
                "address": "928 Massachusetts Ave\nCambridge, MA 02139",
                "phone": "(617) 945-1761",
                "openStatus": "closed",
                "rateValue": 4.7,
                "deliveryTime": "45",
                "foodType": "Non-Veg",
                "genDateFromList": "2017-01-04"
            }
        ],
        "Chinese": [
            {
                "restaurantId": 11,
                "email": "vligoeb@huffingtonpost.com",
                "restaurantName": "Gene's Chinese Flatbread Cafe",
                "restaurantAbbrName": "GCF",
                "address": "86 Bedford St\nBoston, MA 02111",
                "phone": "(617) 482-1888",
                "openStatus": "open",
                "rateValue": 4.6,
                "deliveryTime": "30",
                "foodType": "Gluten-Free",
                "genDateFromList": "2019-01-08"
            },
            {
                "restaurantId": 13,
                "email": "kosmard@reuters.com",
                "restaurantName": "Dumpling Cafe",
                "restaurantAbbrName": "DC",
                "address": "695 Washington St\nBoston, MA 02111",
                "phone": "(617) 338-8859",
                "openStatus": "open",
                "rateValue": 3.8,
                "deliveryTime": "35",
                "foodType": "Mix",
                "genDateFromList": "2015-01-10"
            },
            {
                "restaurantId": 14,
                "email": "cdougane@hibu.com",
                "restaurantName": "Peach Farm",
                "restaurantAbbrName": "PF",
                "address": "4 Tyler St \nBoston, MA 02111",
                "phone": "(617) 482-3332",
                "openStatus": "open",
                "rateValue": 3.9,
                "deliveryTime": "25",
                "foodType": "Non-Veg",
                "genDateFromList": "2021-05-10"
            }
        ],
        "English": [
            {
                "restaurantId": 2,
                "email": "sturrell2@gmail.com",
                "restaurantName": "Puritan & Company",
                "restaurantAbbrName": "PC",
                "address": "1166 Cambridge St\nCambridge, MA 02139",
                "phone": "(617) 615-6195",
                "openStatus": "open",
                "rateValue": 4.5,
                "deliveryTime": "28",
                "foodType": "Gluten-Free",
                "genDateFromList": "2012-01-12"
            }
        ],
        "Italian": [
            {
                "restaurantId": 1,
                "email": "pkildale1@gmail.com",
                "restaurantName": "Brewer's Fork",
                "restaurantAbbrName": "BF",
                "address": "7 Moulton St\nCharlestown, MA 02129",
                "phone": "(617) 337-5703",
                "openStatus": "open",
                "rateValue": 4.6,
                "deliveryTime": "35",
                "foodType": "Gluten-Free",
                "genDateFromList": "2019-01-04"
            },
            {
                "restaurantId": 16,
                "email": "twymang@who.int",
                "restaurantName": "Sportello",
                "restaurantAbbrName": "SP",
                "address": "348 Congress St\nBoston, MA 02210",
                "phone": "(617) 737-1234",
                "openStatus": "closed",
                "rateValue": 4.4,
                "deliveryTime": "35",
                "foodType": "Veg",
                "genDateFromList": "2011-01-09"
            }
        ],
        "Japanese": [
            {
                "restaurantId": 3,
                "email": "rstabler3@gmail.com",
                "restaurantName": "Cafe Sushi",
                "restaurantAbbrName": "CS",
                "address": "1105 Massachusetts Ave\nCambridge, MA 02138",
                "phone": "(617) 492-0434",
                "openStatus": "open",
                "rateValue": 4.6,
                "deliveryTime": "40",
                "foodType": "Veg",
                "genDateFromList": "2012-11-01"
            },
            {
                "restaurantId": 9,
                "email": "kkopmann9@indiatimes.com",
                "restaurantName": "Pagu",
                "restaurantAbbrName": "PAG",
                "address": "310 Massachusetts Ave\nCambridge, MA 02139",
                "phone": "(617) 945-9290",
                "openStatus": "closed",
                "rateValue": 4.1,
                "deliveryTime": "45",
                "foodType": "Mix",
                "genDateFromList": "2014-01-08"
            },
            {
                "restaurantId": 12,
                "email": "fkohrdingc@oracle.com",
                "restaurantName": "O Ya",
                "restaurantAbbrName": "OYA",
                "address": "9 East St\nBoston, MA 02111",
                "phone": "(617) 654-9900",
                "openStatus": "closed",
                "rateValue": 4.6,
                "deliveryTime": "45",
                "foodType": "Veg",
                "genDateFromList": "2017-01-12"
            }
        ],
        "Mediterranean": [
            {
                "restaurantId": 4,
                "email": "jheavens4@gmail.com",
                "restaurantName": "Oleana",
                "restaurantAbbrName": "OLE",
                "address": "134 Hampshire St\nCambridge, MA 02139",
                "phone": "(617) 661-0505",
                "openStatus": "open",
                "rateValue": 4.7,
                "deliveryTime": "30",
                "foodType": "Mix",
                "genDateFromList": "2021-01-04"
            },
            {
                "restaurantId": 8,
                "email": "blorraway8@shinystat.com",
                "restaurantName": "Neptune Oyster",
                "restaurantAbbrName": "NO",
                "address": "63 Salem St # 1\nBoston, MA 02113",
                "phone": "(617) 742-3474",
                "openStatus": "open",
                "rateValue": 4.4,
                "deliveryTime": "50",
                "foodType": "Allergy-friendly",
                "genDateFromList": "2020-01-02"
            },
            {
                "restaurantId": 15,
                "email": "sacumf@cbslocal.com",
                "restaurantName": "Saltie Girl",
                "restaurantAbbrName": "SG",
                "address": "279 Dartmouth St\nBoston, MA 02116",
                "phone": "(617) 267-0691",
                "openStatus": "open",
                "rateValue": 4.5,
                "deliveryTime": "30",
                "foodType": "Mix",
                "genDateFromList": "2013-01-11"
            }
        ],
        "Vietnamese": [
            {
                "restaurantId": 6,
                "email": "mrandall6@gmail.com",
                "restaurantName": "Cicada",
                "restaurantAbbrName": "CIC",
                "address": "106 Prospect St\nCambridge, MA 02139",
                "phone": "(617) 714-4766",
                "openStatus": "closed",
                "rateValue": 4.8,
                "deliveryTime": "25",
                "foodType": "halal",
                "genDateFromList": "2017-06-05"
            }
        ],
        "Wine bar": [
            {
                "restaurantId": 10,
                "email": "jfieldinga@t.co",
                "restaurantName": "Haley Henry",
                "restaurantAbbrName": "HH",
                "address": "45 Province St\nBoston, MA 02108",
                "phone": "(617) 208-6000",
                "openStatus": "closed",
                "rateValue": 4.5,
                "deliveryTime": "40",
                "foodType": "Non-Veg",
                "genDateFromList": "2018-11-10"
            }
        ]
    }
}

sample=JSON.parse(sample);

function search_restraunt(){
    if(document.getElementById('search').value==''){
        document.getElementById('the_r_display').innerHTML=restraunt_displayer(sample);
    }
    else {let target=RegExp(String(document.getElementById('search').value),'gi');
    let obj = sample ; //sessionStorage.getItem('restraunt_list');
    let temp_obj={  "data": {  } };
    for(let food_type in obj.data){
          for (let restraunt of obj.data[food_type]){
            if (restraunt['restaurantName'].search(target)!=-1){
                    // check if there is a key for food_type 
                    if(food_type in temp_obj.data){
                        temp_obj.data[food_type].push(restraunt);
                    }else{
                        // create one and push 
                        temp_obj.data[food_type]=[];
                        temp_obj.data[food_type].push(restraunt)
                    }    
            }
          }
        }
    //window.alert(temp_obj);  
    document.getElementById('the_r_display').innerHTML=restraunt_displayer(temp_obj);}
}

function take_me_to_restraunt(id){
        let temp = id.split(",");
        window.alert(document.getElementById(temp[0]).src);
        // 0 is the id  1 is the email and rest is the name
        //window.alert(document.getElementById(temp[0]+'_name').innerHTML);
        //window.alert(temp);
        sessionStorage.setItem('restrauntImage',document.getElementById(temp[0]).src);
        sessionStorage.setItem("restrauntEmail",temp[1]);
        let name='';
        for(let x of temp.slice(2)){
            name=name+x+" ";
        }
        sessionStorage.setItem('restrauntName',document.getElementById(temp[0]+'_name').innerHTML);
        window.location.assign('../each_restraunt_page/each_restraunt_page.html');
        //window.alert(sessionStorage.getItem('restrauntImage'));
}

function restraunt_displayer(obj){
      // saving it to session

      text='';
      let filter='<p class="filter_text_heading" style="text-align:center">By Country</p> <ul>';
      var row_item=0;
      for(let food_type in obj.data){
        //window.alert(food_type);
      //here x will be the type of food
          filter=filter+"<li class='filter_text'><a href = '#"+food_type+"' " + ">" +food_type+" </a></li> "; //<a href = '#"+food_type+"' " + ">" +food_type+" </a>

              text=text+"<tr id ='"+food_type+"'> <td class='bookmarks'>"+ food_type +"</td></tr> <tr>";
            row_item=0;
          for (let restraunt of obj.data[food_type]){
                  // here we will acess the type of food array 
                  // here y will be the iterators or the total possible indexes
                  
                  //create an image obj
                  let img_bg = new Image();
                  img_bg.src = restraunt['bgPhoto']
                  if(row_item%3==0 && row_item!=0 ){
                                      text=text+'</tr><tr>';
                                          }
                  text=text+'<td>';
                  //text=text+" <div><img class='restraunts' src="+img_bg.src+"> </div>"; // this is the original line
                  text=text+" <div class='img_container'><img id='"+restraunt['restaurantId']+"'class='restraunts' src="+img_bg.src+" onclick=take_me_to_restraunt('"+(restraunt['restaurantId']+","+restraunt['email'] )+"')> <div class='rating'>"+restraunt['rateValue']+"</div></div>";             
                  text=text+ "<div> <p id='"+restraunt['restaurantId']+"_name'class='restraunts_name'>"+restraunt['restaurantName']+"</p> </div>";
                  text=text+ "<div> <p class='restraunts_info'>Delivery "+restraunt['deliveryTime'] +"mins</p> </div>";


                  text=text+'</td>';
                  row_item=row_item+1;
          }
          text=text+'</tr>';     
      }
      filter=filter+"</ul>";
      document.getElementById('food_index').innerHTML=filter;
      return text;
}



// this function displays client information
function display_client_info(){
    //window.alert(sessionStorage.getItem('address'));
        document.getElementById('customer_address').innerHTML=sessionStorage.getItem('address');
        document.getElementById('client_profile').innerHTML=sessionStorage.getItem('firstname');
        
}


function service_type(id){
        let ids=['delivery_button', 'pickup_button', 'dinein_button'];
        
        document.getElementById(id).style.backgroundColor='rgb(166, 252, 252)';
        sessionStorage.setItem('service_type',id);
        for(let x of ids){
            if(x != id){
                document.getElementById(x).style.backgroundColor='rgb(229, 235, 235)';
            }
        }

}