/*跳頁*/
function page(page){
    location.href=page;
}
  /*跳頁及儲存跳頁資料 */
  function storage(page){
    let search = document.getElementById("search_block").value;
    localStorage.setItem("search",search);
    location.href=page;
  }
 /*獲取購物車商品 */
 window.onload=function reload(){
    let product=[
        ['肥美鮭魚','原產地(國):智利','特價:320元','product/product1.jpg','320']
        ,['特級鮮乳','原產地(國):臺灣','特價:90元','product/product2.jpg','90']
        ,['豪華咖啡蛋糕','原產地(國):美國','特價:129元','product/product3.jpg','129']
        ,['點點糖果','原產地(國):美國','特價:79元','product/candy.jpg','79']
        ,['高級巧克力','原產地(國):澳洲','特價:435元','product/chocolate.jpg','435']
        ,['漢堡','原產地(國):美國','特價:149元','product/hamburger.jpg','149']
        ,['柳橙果汁','原產地(國):臺灣','特價:60元','product/juice.jpg','60']
        ,['檸檬','原產地(國):臺灣','特價:29元','product/lemon.jpg','29']
        ,['義大利麵','原產地(國):義大利','特價:169元','product/noodles.jpg','169']
        ,['披薩','原產地(國):美國','特價:495元','product/pizza.jpg','495']
    ];
    for(i=0;i<10;i++) {
       value= localStorage.getItem("product"+i);
       if (value>0){
        /*購物車商品列Div */
        let container=document.getElementById("container");
        let block_big =document.createElement("div");
        block_big.className+="cart_block";
        block_big.setAttribute('id','block_big'+i);
        container.appendChild(block_big);
        /*checkbox製作*/
        let block_b=document.getElementById('block_big'+i);
        let check =document.createElement("div");
        check.className+="cart_block_s check";
        check.setAttribute('id','check'+i);
        block_b.appendChild(check);
        let checkbox =document.createElement("input");
        checkbox.className+="checkbox";
        checkbox.setAttribute('id','check_box'+i);
        checkbox.setAttribute('type','checkbox');
        check.appendChild(checkbox);
        /*商品簡介div */
        let pro_content=document.createElement("div");
        pro_content.setAttribute('id','pro_content'+i);
        pro_content.className+="pro_content";
        block_b.appendChild(pro_content);
        /*商品名稱 */
        let pro_content_b=document.getElementById('pro_content'+i);
        let title_div=document.createElement("div");
        title_div.className+="pro_title";
        pro_content_b.appendChild(title_div)
        title_div.setAttribute('onclick','product_pages('+i+')')
        let title=document.createTextNode(product[i][0]);
        title_div.appendChild(title);
        /*商品圖片 */ 
        let img_pro=document.createElement("img");
        img_pro.src=product[i][3];
        img_pro.className+="product_img";
        img_pro.setAttribute('id','product_id'+i);
        pro_content_b.appendChild(img_pro);
        /*商品內容 */
        let con_div=document.createElement("div");
        con_div.className+="pro_con";
        pro_content_b.appendChild(con_div)
        let con_mad=document.createTextNode(product[i][1]+"。");
        con_div.appendChild(con_mad);
        /*商品內容 */
        let single_price=document.createElement("div");
        single_price.className+="single red";
        block_b.appendChild(single_price)
        let single=document.createTextNode("$"+product[i][4]);
        single_price.appendChild(single);
        /*建立數量下拉式選單 */
        let counts=document.createElement("div");
        counts.className+="counts";
        counts.setAttribute("id","counts"+i);
        block_b.appendChild(counts);
        let counts_id = document.getElementById("counts"+i);
        let value = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]; 
        let select = document.createElement("select");
        select.setAttribute("id","select"+i);
        select.setAttribute("onchange","totals_s(this.id)");
        counts_id.appendChild(select);
        select.length = 0;
        for(let x = 0;x<value.length;x++){ 
          let option = document.createElement("option"); 
          option.appendChild(document.createTextNode(value[x])); 
          select.appendChild(option);
        }
        value= localStorage.getItem("product"+i);
        select.options[value-1].selected = true;
        /*小計*/
        let totals = document.createElement("div");
        totals.setAttribute("id","totals"+i);
        totals.className+="totals";
        block_b.appendChild(totals);
        let totals_price=document.createTextNode(product[i][4]*value);
        totals.appendChild(totals_price);
        /*刪除按鈕 */
        let del_div = document.createElement("div");
        del_div.className+="del";
        block_b.appendChild(del_div);
        let del = document.createElement("input");
        del.className+="del_button";
        del.setAttribute("id","del"+i);
        del.setAttribute("type","button");
        del.setAttribute("value","取消");
        del.setAttribute("onclick","delete_cart(this.id)");
        del_div.appendChild(del);
}
}
    /*購物車上數量 */
    let totals =0;
    for(i=0;i<10;i++) {
      let value= localStorage.getItem("product"+i);
      totals = Number(totals)+Number(value);
    }
    let all = document.getElementById('all_pro');
    all.textContent = totals;
}

/*刪除 */
function delete_cart(id){
  let all=0;
  let all_fa = 0;
  for(let i=0;i<10;i++){
    let value= localStorage.getItem("product"+i)
    if(value>0){
    
      all++;
      let check = document.getElementById("check_box"+i);
      if(check.checked===false){
        all_fa++
        }
      }
    }
    if(all===all_fa){
      alert("請勾選欲刪除商品");
      return;
  }
  let top_check =document.getElementById("check_all"); 
  if (top_check.checked===true){
    let yes = confirm('確定清空購物車？');
    if (yes) {
      for(let i =0;i<10;i++){
        let value= localStorage.getItem("product"+i)
        if (value>0){
          localStorage.setItem("product"+i,"0");
       }
      }
    } 
  }else{
    let yes = confirm('確定清除商品？');
    if (yes) {
    for(let i =0;i<10;i++){
      let value= localStorage.getItem("product"+i)
      if (value>0){
        let check = document.getElementById("check_box"+i);
        if(check.checked===true){
          localStorage.setItem("product"+i,"0");
        }
      }
    }
    }
  }
    window.location.reload(); 
  }

/*計算小計 */
function totals_s(id){
  let i = id.slice(6,10);
  let selected = document.getElementById(id);
  let value = selected.value;
  localStorage.setItem("product"+i,value);
  window.location.reload(); 
}
/*全選 */
function check_all(){
  let top_check =document.getElementById("check_all"); 
  if(top_check.checked==false){
    for(let i =0;i<10;i++){
      value= localStorage.getItem("product"+i)
      if (value>0){
        let check = document.getElementById("check_box"+i);
        check.checked=false;
     }
    }
  }else{
    for(let i =0;i<10;i++){
      value= localStorage.getItem("product"+i)
      if (value>0){
        let check = document.getElementById("check_box"+i);
        check.checked=true;
     }
    }
  }

}

  /*呼叫商品頁面 */
  function product_pages(product){
    localStorage.setItem("product_pages",product);
    location.href="product_pages.html";
  }