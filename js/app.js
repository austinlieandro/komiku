var $$ = Dom7;

var device = Framework7.getDevice();
function GetCategory(){
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/kategori.php", {},
    function (data) {
      var arr = JSON.parse(data);
      var list_category = arr['data'];
      for(var i = 0; i < list_category.length; i++) {
        $$("#comic_category").append("<a href='/daftarkomikbykategori/" + list_category[i]['id'] + "' class='col button button-fill''>"+list_category[i]['nama']+"</a>")
      }
    }
  )
}
function getKategoris() {
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/kategori.php",
    function (data) {
      var arr = JSON.parse(data);
      var kategoris = arr["data"];

      for (var i = 0; kategoris.length; i++) {
        $$("#ul_listkategori").append(
            "<li>" + 
              "<div class='item-content'>" + 
                "<div class='item-inner'>" +
                  "<div class='item-title'><a href='/daftarkomikbykategori/" + kategoris[i]["id"] + "'>" + kategoris[i]["nama"] + "</a></div>" +
                "</div>" +
              "</div>" +
            "</li>"
        );
      }
    }
  );
}
function GetRecommendation(){
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/getrecommendation.php", {},
    function (data) {
      var arr = JSON.parse(data);
      var comic_list = arr['data'];
      
      for (var i = 0; comic_list.length; i++) {
        var rating = comic_list[i]['AVG(r.nilai)']+ "/10";
        if(rating == "null/10"){
          rating = "-";
        }
        $$("#recomendation").append(
          "<div class='col-50'>" +
          "<div class='card'>" +
          "<div class='card-header'><a href='/detailcomic/" + comic_list[i].id + "' style='color: #344e41;font-weight:bold;'>"+comic_list[i]?.judul+"</a></div>" +
          "<div class='card-content'>" +
          "<img src='" + comic_list[i]?.url_poster + "' width='100%'>" +
          "</div>"
          + "<div class='card-footer'>" +
          "<p>Rating : "+rating+"</p>" +
          "</div>" +
          "</div>" +
          "</div>");
      }
    }
  )
}
function GetComic(category_id){
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/komiklist.php", {"category_id": category_id},
    function (data) {
      var arr = JSON.parse(data);
      var list_comic = arr['data'];

      for(var i = 0; i < list_comic.length; i++) {
        var rating = list_comic[i]?.nilai+ "/10";
        if(rating == "null/10"){
          rating = "-";
        }
        $$("#comic_list").append(
          "<div class='col-50'>" +
          "<div class='card'>" +
          "<div class='card-header'><a href='/detailcomic/" + list_comic[i].id + "' style='color: #344e41;font-weight:bold;'>"+list_comic[i]?.judul+"</a></div>" +
          "<div class='card-content'>" +
          "<img src='" + list_comic[i]?.url_poster + "' width='100%'>" +
          "</div>"
          + "<div class='card-footer'>" +
          "<p>Rating : "+rating+"</p>"+
          "</div>" +
          "</div>" +
          "</div>");
      }
    }
  )
}
function CariKomik(keyword) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/carikomik.php", { "keyword": keyword },
    function (data) {
      var arr = JSON.parse(data);
      var comic_list = arr['data'];
      for (var i = 0; comic_list.length; i++) {
        var rating = comic_list[i]['avg(r.nilai)'] + "/10";
        if(rating == "null/10"){
          rating = "-";
        }
        $$("#comic_list").append(
          "<div class='col-50'>" +
          "<div class='card'>" +
          "<div class='card-header'><a href='/detailcomic/" + comic_list[i].id + "' style='color: #344e41;font-weight:bold;'>"+comic_list[i]?.judul+"</a></div>" +
          "<div class='card-content'>" +
          "<img src='" + comic_list[i]?.url_poster + "' width='100%'>" +
          "</div>"
          + "<div class='card-footer'>" +
          "<p>Rating : "+rating+"</p>" +
          "</div>" +
          "</div>" +
          "</div>")
      }
    }
  )
}
function GetDetail(comic_id){
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/detailkomik.php", {"comic_id": comic_id},
    function (data) {

      var arr = JSON.parse(data);
      var detail_comic = arr['data'];
      var category = detail_comic['kategori'];
      var comment = detail_comic['comment'];

      $$("#judul").html("<h1 style='text-align: center;'>"+detail_comic[0]["judul"]+"</h1>");
      $$("#deskripsi").html(detail_comic[0]["deskripsi"]);
      $$("#poster").attr("src",detail_comic[0]["url_poster"]);

      for (i = 0; i < category.length; i++) {
        $$("#detail_category").append("<li style='color:#588157;font-weight:bold;'>" + category[i]["nama"] + "</li>");
      }
      for (i = 0; i < comment.length; i++) {
        $$("#detail_comment").append("<li class='item-content'>" +
        "<div class='item-media'>"+
          "<img src='https://cdn.framework7.io/placeholder/fashion-88x88-5.jpg' width='44' />"+
        "</div>"+
        "<div class='item-inner'>"+
          "<div class='item-title-row'>"+
            "<div class='item-title'>"+comment[i]['name']+"</div>"+
          "</div>"+
          "<div class='item-subtitle'>"+comment[i]['comment']+"</div>"+
        "</div>"+
      "</li>");
    }
    $$("#btnreadcomic").attr("href","/readcomic/"+comic_id+"/pagecomic/1");
    $$("#txttotalcomment").html(comment.length+" comments");
    }
  )
}
function ReadComic(comic_id,page){
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/halaman.php", {"comic_id": comic_id,"page":page},
    function (data) {
      var arr = JSON.parse(data);
      var pagecomic = arr["data"];
      for(var i = 0; i < pagecomic.length; i++) {
        
        if(pagecomic[i]?.page == 1){
          halmundur = 1;
        }
        if(pagecomic[i]?.halaman == page){
          $$("#page").attr("src", pagecomic[i]?.url_gambar);
          var halmaju = pagecomic[i]?.halaman+1;
          var halmundur = pagecomic[i]?.halaman-1;

        }
      }
      if(page == pagecomic.length){
        halmaju = pagecomic.length;
      }

      var maju = "/readcomic/" + comic_id + "/pagecomic/" + halmaju;
      var mundur = "/readcomic/" + comic_id + "/pagecomic/" + halmundur;


      $$("#back").attr("href",mundur);
      $$("#next").attr("href", maju);
    }
  )
}
function AddFavorite(user_id,komik_id){
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/addfavorite1.php", {"komik_id": komik_id, "user_id": user_id},
    function (data) {
      var arr = JSON.parse(data);
      
      if(arr["result"] == "success"){
        app.dialog.alert("Berhasil menambahkan komik ke dalam favorit");
      }
      else  {
        app.dialog.alert("Gagal menambahkan komik ke dalam favorit");
      }
    }
  )
}
function GetFavorite(user_id){
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/favorituser.php", {"user_id": user_id},
    function (data) {
      var arr = JSON.parse(data);
      var comic_list = arr['data'];
      for (var i = 0; i < comic_list.length; i++) {
        var rating = comic_list[i]?.nilai + "/10";
        if(rating == "null/10"){
          rating = "-";
        }
        $$("#favorite_user_comic_list").append(
          "<div class='col-50'>" +
          "<div class='card'>" +
          "<div class='card-header'><a href='/detailcomic/" + comic_list[i].id + "' style='color: #344e41;font-weight:bold;'>"+comic_list[i]?.judul+"</a></div>" +
          "<div class='card-content'>" +
          "<img src='" + comic_list[i]?.url_poster + "' width='100%'>" +
          "</div>"
          + "<div class='card-footer'>" +
          "<p>Rating : "+rating+"</p>" +
          "</div>" +
          "</div>" +
          "</div>");
      }
    }
  )
}
function AddComment(comic_id,user_id,comment){
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/addcomment.php", {"comic_id": comic_id, "user_id": user_id,"comment":comment},
    function (data) {
      var arr = JSON.parse(data);
              if(arr['result'] == 'success') {
                app.dialog.alert('Berhasil menambahkan comment');
              }
              else{
                app.dialog.alert('Gagal menambahkan comment');
              }
    }
  )
}
function AddRating(user_id,comic_id,rating){
  app.request.post(
    "https://ubaya.fun/hybrid/160420079/api/addrating.php", {"user_id":user_id, "comic_id":comic_id,"rating":rating},
    function (data) {
      var arr = JSON.parse(data);
      if(arr['result'] == 'success') {
        app.dialog.alert('Berhasil menambahkan rating');
      }
      else{
        app.dialog.alert('Gagal menambahkan rating');
      }
    }
  )
}
var app = new Framework7({
  name: 'Komiku', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element

  id: 'io.framework7.myapp', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
      localStorage.firstin = 0;
      $$(document).on('page:afterin', function (e, page) {
        if (!localStorage.username) {
          page.router.navigate("/login/");
        }
      });
      $$(document).on('page:init', function (e, page) {
        if (page.name == "login") {
          localStorage.removeItem("username");
          localStorage.removeItem("nama");
          localStorage.removeItem("id");
          $$('#btnsignin').on('click', function () {
            app.request.post('https://ubaya.fun/hybrid/160420079/api/login.php', {
              "user_id": $$('#username').val(),
              "user_password": $$('#password').val()
            },
              function (data) {
                var arr = JSON.parse(data);
                var result = arr['result'];
                var data = arr['data'];
                if (result == 'success') {
                  localStorage.username = $$("#username").val();
                  localStorage.nama = data[0]['name'];
                  localStorage.user_id = data[0]['id'];
                  username = localStorage.username;
                  page.router.back('/');
                } else app.dialog.alert('Username atau password salah');
              });
          });
        }
        else if(page.name == "searchcomic"){
          localStorage.removeItem('comic_id');
          category_id = page.router.currentRoute.params.kategori_id;
          getKategoris()
          GetCategory();
          GetComic(category_id);
          $$("#btncari").on('click', function () {
            $$("#comic_list").html(" ");
            $$("#listkomik").html(" ")
            CariKomik($$('#txtkeyword').val());
          })
        }
        else if(page.name == 'home'){
          if(localStorage.firstin == 0){
            page.router.refreshPage();
            localStorage.firstin = 1;
          }
          $$(".tittle-large-text").html("Halo " + localStorage.nama);
          GetRecommendation();
        }
        else if(page.name == "detailcomic"){
          var comic_id = page.router.currentRoute.params.id;
          localStorage.comic_id = comic_id;
          GetDetail(comic_id);
        }
        else if(page.name == "favoriteuser"){
          var user_id = localStorage.user_id;
          GetFavorite(user_id);
        }
        $$("#btnreadcomic").on('click', function(){
          ReadComic(localStorage.comic_id,1);
        });
        $$("#next").on('click', function(){
          var halaman = page.router.currentRoute.params.halaman;
          ReadComic(localStorage.comic_id,halaman);
        });
        $$("#btnaddfav").on('click', function(){
          var user_id = localStorage.user_id;
          var comic_id = localStorage.comic_id;
          AddFavorite(user_id,comic_id);
        });
        $$("#back").on('click', function(){
          var halaman = page.router.currentRoute.params.halaman;
          ReadComic(localStorage.comic_id,halaman);
        });
        $$("#btnAddComment").on('click', function(){
          var comic_id = localStorage.comic_id;
          var user_id = localStorage.user_id;
          var comment = $$("#txtcomment").val();
          AddComment(comic_id, user_id,comment); 
        });
        $$("#btnaddrating").on('click', function(){
          var rating = $$("#txtrating").val();

          if(rating <= 10){
            AddRating(localStorage.user_id,localStorage.comic_id,rating);
          }
        });
      });
    },
  },
});