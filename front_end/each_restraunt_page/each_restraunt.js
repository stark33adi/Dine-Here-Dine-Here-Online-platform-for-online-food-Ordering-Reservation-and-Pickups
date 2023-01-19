// link to the final cart
const checkout_page_url = "google.com";
const rest_menu_api='';
// this function takes user to the checkout page
function take_to_final_checkout_page(){
    window.location.assign(checkout_page_url);
}


function get_dish(){

    const menu_portal= new XMLHttpRequest();

        menu_portal.open('POST',rest_menu_api);

        server_portal.onload = function (){
            //let obj = JSON.parse(this.responseText);
            window.alert(this.responseText);
            //document.getElementById('logo_img').src=img_bg.src;
        }

        let restaurantEmail = "";
        let restaurant = {
            'restaurantEmail' : restaurantEmail
        };

        menu_portal.send(JSON.stringify(restaurant));

}




    var tester = {
   "result":"0",
    "data":{
        "sides":[
                {
                "dishId":"3",
                "dishName":'farm house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                },
                {"dishId":"4",
                "dishName":'house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                }, {
                "dishId":"3",
                "dishName":'farm house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                }, {
                "dishId":"3",
                "dishName":'farm house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                },{
                "dishId":"3",
                "dishName":'farm house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                },
                {"dishId":"4",
                "dishName":'house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                }, {
                "dishId":"3",
                "dishName":'farm house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                }, {
                "dishId":"3",
                "dishName":'farm house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                },
                {
                "dishId":"3",
                "dishName":'farm house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                },
                {"dishId":"4",
                "dishName":'house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                }, {
                "dishId":"3",
                "dishName":'farm house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                }, {
                "dishId":"3",
                "dishName":'farm house pizza',
                "dishPrice":'20.0',
                "dishPhoto":'farm_house.jpeg',
                "genDate":"2022-02-28"
                },
        ],
       "maincourse":[
                {"dishId":"5",
                "dishName":'Peproni pizza',
                "dishPrice":'20.0',
                "dishPhoto":'peproni.jpeg',
                "genDate":"2022-02-28"
                }
        ]
    }
    }
    var cart_total=0;

    var order_stack=[];

    function first_to_upper(a){
        const arr= a.split(" ");
        text='';
        for(let x of arr){
            text=text+ (x[0].toUpperCase() + x.slice(1))+" ";
        }
        return text;
    }
    function add_item_info_to_cart(){
        obj={}
        obj.dishId=obj.data[food_type][course]['dishName'];
        obj.dishName='';
        obj.dishPrice='';
        obj.dishQuantity='';
    }
    function give_holder(a){
        return '"'+a+'"';
    }

    function make_cart(){ 
        //holder=obj.data[food_type][course]['dishId']+ "," +obj.data[food_type][course]['dishName'] +","+ obj.data[food_type][course]['dishPrice']+","+food_type;
        let sno =1;
        var arr;
        let text='<tr class="cart_cells">';
        
        for(let x of order_stack){
            arr=x.split(",");
            text=text+'<td class="cart_cells">'+sno+'</td>';
            text=text+'<td class="cart_cells">' + '<div><div class="item">'+first_to_upper(arr[1])+'</div><div class="subitem">Quantity : 1</div></div></td>';
            text=text+'<td class="cart_cells">'+arr[2]+" USD </td>";
            text=text+'</tr> <tr class="cart_cells">';
            sno=sno+1;
        }
        text=text+'</tr>';
        text=text+'<tr><td></td><td><button class="signing_button" style="width:6cm;" onclick=take_to_final_checkout_page()>Check Out</button></td><td></td></tr>'
        document.getElementById('cart_list').innerHTML=text;
    }

    function show_cart(){
        if(order_stack.length==0){
            window.alert('Empty Cart!!!');}else{
        //window.alert(order_stack);
        if(cart_status==false){
            make_cart();
            document.getElementById("cart_display").style.display="block";
        cart_status=true;}
        else{document.getElementById("cart_display").style.display="none";
    cart_status=false;}}

        
    }
    function add_in_cart(a){
        order_stack.push(a);
        cart_total=cart_total+1;
        // here we add item to cart
        let x = document.getElementById(a);
        x.innerHTML = Number(x.innerText)+1;
        document.getElementById('cart_item').innerHTML=("Cart "+cart_total);
    }
    function remove_in_cart(a){
        if(cart_total>0){  
            const n =order_stack.length;
            for(let i=0;i<n;i++){
                if (order_stack[i]==a){
                    order_stack.splice(i,1);
                    cart_total=cart_total-1;
                    let x = document.getElementById(a);
                    x.innerHTML = Number(x.innerText)-1;
                    break;
                }
            }
            }
        document.getElementById('cart_item').innerHTML=("Cart "+cart_total);
    }
    function create_img(img_link){
        let temp_img= new Image();
        temp_img.src=img_link;
        return temp_img.src;
    }
      function item_displayer(obj){
                // converting  it to an object
                //obj=JSON.parse(obj);
                window.console.log(obj);
                text='';
                var row_item=0;

                filter='<ul>';
                var holder='';
                for(food_type in obj.data){
                //here x will be the type of food
                        text=text+"<tr " + "id = '" + food_type+ "'" +"> <td class='bookmarks'>"+ (food_type[0].toUpperCase() + food_type.slice(1)) +"</td></div>";
                        text=text+"<tr >";
                        filter=filter+"<li> <a href = '#"+food_type+"' " + ">" +(food_type[0].toUpperCase() + food_type.slice(1))+" </a></li> ";
                    for (course in obj.data[food_type]){
                            // here we will acess the type of food array 
                            // here y will be the iterators or the total possible indexes
                            
                            if(row_item%4==0 && row_item!=0 ){
                                                text=text+'</tr><tr>';
                                                    }
                            text=text+'<td>';
                            text=text+" <div> <img class='restraunts'"+ "src="+first_to_upper(obj.data[food_type][course]['dishPhoto'])+'> </div>';
                            text=text+ "<div> <p class='restraunts_name'>"+first_to_upper(obj.data[food_type][course]['dishName'])+"</p> </div>";

                            //dishId, dishName, dishPrice, foodtype
                            holder=obj.data[food_type][course]['dishId']+ "," +obj.data[food_type][course]['dishName'] +","+ obj.data[food_type][course]['dishPrice']+","+food_type;
                            
                            text=text+ "<div class='restraunt_info' style='width: 40%;'> <p class='restraunts_info'>USD: "+obj.data[food_type][course]['dishPrice']+"</p> </div>";
                            text=text+ "<div class='restraunt_info' style='align-items: flex-end;'> <p class='restraunts_info_2' onclick='add_in_cart("+give_holder(holder)+")'>"+"+"+"</p> </div>";
                            text=text+ "<div class='restraunt_info' style='align-items: flex-end;'> <p class='restraunts_info_2' id="+ give_holder(holder) +" >"+Number(0)+"</p> </div>";
                            text=text+ "<div class='restraunt_info' style='align-items: flex-end;'> <p class='restraunts_info_2' onclick='remove_in_cart("+give_holder(holder)+")'>"+"-"+"</p> </div>";
                            text=text+'</td>';
                            row_item=row_item+1;
                    }
                    row_item=0;
                    text=text+'</tr>';     
                }
                filter=filter+"</ul>";

                document.getElementById('fil').innerHTML=filter;
                return text;
                }

                   


