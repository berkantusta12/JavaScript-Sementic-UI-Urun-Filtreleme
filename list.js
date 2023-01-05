async function getData() {

  let material = document.getElementById("material").value;
  let diameter = document.getElementById("thicknesss").value;
  // let stream = document.getElementById("flows").value;

  let payload = {
    material: material,
    diameter: parseFloat(diameter),
  };
  axios({
    method: "post",
    url: "http://localhost:4000/get_material",
    timeout: 2000,
    data: payload,
  })
    .then(function (response) {
      printdata(response.data.payload[0]);
    })
    .catch(function (error) {
      noProduct();
      // console.log(error);
    });
}
function noProduct() {


    deleteee();

  // materyal bulunamadı
  let listsElement = document.getElementById("lists")
  let materialTitle = "<h3>MATERYAL BİLGİLERİ</h3>"
  let materialBody = ""

  materialBody += `
  <p style='color:red'>Eşleşen Materyal Bulunamadı</p>
  `;
  listsElement.innerHTML =materialTitle + materialBody

  // önerilen ürün blunamadı
  let productsElement = document.getElementById("products")
  let cardTitle = "<h3>ÖNERİLEN ÜRÜNLER</h3>"
  let cardProduct = ""

  cardProduct += `
  <p>Eşleşen Ürün Bulunamadı</p>
  `;
  productsElement.innerHTML =cardTitle + cardProduct
}

function deleteee() {
  let materialELement = document.getElementById('material')
  materialELement.value = ''
  let thicknessELement = document.getElementById('thicknesss')
  thicknessELement.value = ''
  // let flowsELement = document.getElementById('flows')
  // flowsELement.value = ''

  let listsElement = document.getElementById("lists")
  let materialTitle = "<h3>MATERYAL BİLGİLERİ</h3>"
  let materialBody = ""

  materialBody += `
  <p style='color:black'><i>Materyal bilgileri için lütfen bir arama yapınız..</i></p>
  `;
  listsElement.innerHTML =materialTitle + materialBody

  // önerilen ürün blunamadı
  let productsElement = document.getElementById("products")
  let cardTitle = "<h3>ÖNERİLEN ÜRÜNLER</h3>"
  let cardProduct = ""

  cardProduct += `
  <p style='color:black'><i>Önerilen ürünler için lütfen bir arama yapınız..</i></p>
  `;
  productsElement.innerHTML =cardTitle + cardProduct

}


function printdata(data) {
  deleteee();
  productLoader()
  materialLoader()
 
  let material = data.material;
  let diameter = data.diameter;
  let stream = data.stream;
  let time = data.time;
  let power = data.power;
  let advices = data.advices;

  let listsElement = document.getElementById("lists")
  let materialTitle = "<h3>MATERYAL BİLGİLERİ</h3>"
  let dataList = new Array(material, diameter, stream, time, power, advices);
  let materialBody = `
    <p style="font-family: benRegular;">MATERYAL: <span style="color: #CDD84A;">${dataList[0]}</span></p>
    <p style="font-family: benRegular;">KALINLIK: <span style="color: #CDD84A;">${dataList[1]}</span></p>
    <p style="font-family: benRegular;">AKIM: <span style="color: #CDD84A;">${dataList[2]}</span></p>
    <p style="font-family: benRegular;">KUVVET: <span style="color: #CDD84A;">${dataList[3]} </span></p>
    <p style="font-family: benRegular;">ZAMAN: <span style="color: #CDD84A;">${dataList[4]} MS </span></p>
  `;
  listsElement.innerHTML = materialTitle + materialBody

  if (advices.length > 0) {
    let productsElement = document.getElementById("products")
    let cardTitle = "<h3>ÖNERİLEN ÜRÜNLER</h3>"
    let cardProduct = ""
    
    advices.forEach(el => {
    

      cardProduct += `
      <div id="productCard" style='padding:1px;float:left; margin:20px; border: solid 1px; border-radius:10px;' class="ui card">
        <div class="image">
          <img src="${el.image_url}">
        </div>
        <div class="content">
          <a target="_blank" href='${el.url}' class="productHeader" style="display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; 
          overflow:hidden;
      " maxlength="10"> ${(el.code)}</a>
          <div class="meta">
            <span  class="productCategory" style="display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical; 
            overflow:hidden;
        " maxlength="10"> ${kisaltt(el.category,20)} </span>
          </div>
          <div class="description">
            <p style='color:#000; font-size:15px' style="display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical; 
            overflow:hidden;
        " maxlength="10">${ kisalt( el.description, 20 ) }</p>
          </div>
        </div>
        <div style='justify-content:end; display:flex;' class="extra content">
          <a id="actionButton" target="_blank" href='${el.url}'>
            incele ➡
           
          </a>

        </div>
        
      </div>
      `;

    });

    productsElement.innerHTML = cardTitle + cardProduct
  }else{
    let productsElement = document.getElementById("products")
    let cardTitle = "<h3>ÖNERİLEN ÜRÜNLER</h3>"
    let cardProduct = ""

    cardProduct += `
    <p style='margin:0px !important'>Eşleşen Ürün Bulunamadı</p>
    `;
    productsElement.innerHTML =cardTitle + cardProduct
  }
  function kisalt(description, length){
    return description.substr(0,length)+ ".."
    
  
  }
  function kisaltt(category, length){
    return category.substr(0,length)+ ".."
    
  
  }

  



}



function productLoader() {
  let productsElement = document.getElementById("products")
  let cardTitle = "<h3>ÖNERİLEN ÜRÜNLER</h3>"
  let cardProduct = `
  <div class="ui">
  <div class="ui active dimmer">
    <div class="ui text loader">Loading</div>
  </div>
  <p></p>
</div>
  `;
  productsElement.innerHTML =cardTitle + cardProduct
}
function materialLoader() {
  let listsElement = document.getElementById("lists")
  let materialTitle = "<h3>MATERYAL BİLGİLERİ</h3>"
  let materialBody = `
  <div class="ui">
    <div class="ui active dimmer">
      <div class="ui text loader">Loading</div>
    </div>
    <p></p>
  </div>
  `;
  listsElement.innerHTML = materialTitle + materialBody
}

deleteee()
