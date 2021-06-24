if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

  swal("Вы используете мобильное устройство (телефон или планшет).")

} else swal("Вы используете ПК.")

var map = L.map('mapid', { doubleClickZoom: false, }).setView([54.779285910582296, 56.07228095554424], 7);

var PointLayer = L.layerGroup([]);
//описание слайдера
function funpolz1() {
  var rng = document.getElementById('rangelop'); //rng - это ползунок
  var i1 = document.getElementById('i1'); // i1 - input
  i1.value = rng.value;
  var rngrotor = document.getElementById('kpdrotor'); //rng - это ползунок
  var i2 = document.getElementById('i2'); // i1 - input
  i2.value = rngrotor.value;
  var rngreduc = document.getElementById('kpdreductora'); //rng - это ползунок
  var i3 = document.getElementById('i3'); // i1 - input
  i3.value = rngreduc.value;
}
function rangevalue() { //функция для ползунков
  vint = document.getElementById('rangelop').value;
  kpdrtr = document.getElementById('kpdrotor').value;
  kpdrdr = document.getElementById('kpdreductora').value;
}
//слайдера
jsondist = 0;
async function get_points() {
  map.removeLayer(PointLayer);
  // var url = "rp5gis/service/city";
  // var url2 = "rp5gis/service/monthdis";
     var url = "http://rp5gis.myxomopx.ru/service/city";
   var url2 = "http://rp5gis.myxomopx.ru/service/monthdis";
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  });
  let respregion = await fetch(url2, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },

  });
  if (response.ok) {
    let json = await response.json();
    jsondist = await respregion.json();//добавление региона на карту
    console.log(json);
    console.log(jsondist);
    set_points(json);

  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}
//Определение месяца
var monthgraph = new Array();
monthgraph[0] = "Январь";
monthgraph[1] = "Февраль";
monthgraph[2] = "Март";
monthgraph[3] = "Апрель";
monthgraph[4] = "Май";
monthgraph[5] = "Июнь";
monthgraph[6] = "Июль";
monthgraph[7] = "Август";
monthgraph[8] = "Сентябрь";
monthgraph[9] = "Октябрь";
monthgraph[10] = "Ноябрь";
monthgraph[11] = "Декабрь";
var yearpicker = [];
var textgraph = document.getElementById('textgraph');
var dismon2 = []; //массив для нахождения средней скорости ветра за год для графа 
var dismon = [];
dismonmid = [];  //массив для наивысшей скорости ветра в районе 
var yeargraph = []; //массив для определения года для постройки графика

//переменные для нахождения наибольшей скорости ветра в районе и его имени
var maxwind = 0;
var namemax = "";
//тут конец этим переменным
var sortmass = [];//ссортировка по регионам
var object = new Object(); // синтаксис "конструктор объекта"
var object = {};  //объект пустой
//

//
var geojsonlayer = new L.GeoJSON.AJAX("DistrictGeo33.geojson", { style: style, onEachFeature: onEachFeature }).addTo(map);
var jsonhakas = new L.GeoJSON.AJAX("hakasia.geojson", { style: style, onEachFeature: onEachFeature }).addTo(map);
var ymc = ymCal(
  $("#ymPicker"),
  null,
  "bottom",
  null,
  null,
  function (event, month, year, misc) {

    yeargraph = [];
    if (event == "cancel") {
      month = 13;
    };
    if (year == 2020) {
      yeargraph = ['x', '2020-08-01', '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01']
    } else {
      yeargraph = ['x', '2021-01-01', '2021-02-01', '2021-03-01', '2021-04-01', '2021-05-01', '2021-06-01', '2021-07-01', '2021-08-01', '2021-09-01', '2021-10-01', '2021-11-01', '2021-12-01',]
    }
    if ((event == "ok") || (event == "cancel")) {

      elev();
      document.getElementById('ddlViewBy').onchange = function () { elev() };

      fun1();
      function elev() {
        sortmass = []
        var e = document.getElementById("ddlViewBy");
        var value = e.options[e.selectedIndex].value;
        yearpicker = year;
        // console.log(value)
        if (month == 1) { month_name = " Январь"; month_name_table = " январь " + year + " года" };
        if (month == 2) { month_name = "Февраль"; month_name_table = " февраль " + year + " года" };
        if (month == 3) { month_name = "Март"; month_name_table = " март " + year + " года" };
        if (month == 4) { month_name = "Апрель"; month_name_table = " апрель " + year + " года" };
        if (month == 5) { month_name = "Май"; month_name_table = " май " + year + " года" };
        if (month == 6) { month_name = "Июнь"; month_name_table = " июнь " + year + " года" };
        if (month == 7) { month_name = "Июль"; month_name_table = " июль " + year + " года" };
        if (month == 8) { month_name = "Август"; month_name_table = " август " + year + " года" };
        if (month == 9) { month_name = "Сентябрь"; month_name_table = " сентябрь " + year + " года" };
        if (month == 10) { month_name = "Октябрь"; month_name_table = " октябрь " + year + " года" };
        if (month == 11) { month_name = "Ноябрь"; month_name_table = " ноябрь " + year + " года" };
        if (month == 12) { month_name = "Декабрь"; month_name_table = " декабрь " + year + " года" };
        if (month == 13) { month_name = "весь год"; month_name_table = "  " + year + " год" };
        console.log("event=" + event + "; month=" + month + "; year=" + year);
        (document.getElementById('ymPicker').innerHTML = " Месяц:" + month_name + " Год:" + year);
        Tabletext = ' Таблица скоростей ветра в районах за ' + month_name.toLowerCase() + " " + year + " года";
        if (month == 13) { Tabletext = ' Таблица скоростей ветра в районах  за' + month_name_table.toLowerCase() };
        dismon = [];
        dismon2 = [];
        texttable.innerHTML = Tabletext; //добавить текст в таблицу
        maxwind = 0;
        for (i of jsondist) {
          if ((i.month == month) && (i.year == year)) {
            dismon.push(i)
          }
          //для лучшего района
          if ((i.month == 13) && (i.year == year)) {
            dismonmid.push(i)
          }
          //тут конец для лучшего района
        }
        //DELETE 1
        if (map.hasLayer(jsonhakas) == true) {
          for (im in jsonhakas._layers) {
            for (jm of dismon) {
              if (jsonhakas._layers[im].feature.properties.DistrictID == jm.iddistrict) {
                object.NameD = jsonhakas._layers[im].feature.properties.NAME;
                object.wind10 = jm.wind10;
                object.wind50 = jm.wind50;
                object.wind80 = jm.wind80;
                object.wind100 = jm.wind100;
                sortmass.push(object);
                object = {};
              }
            }
          }
        } else sortmass = [];
        //DELETE 2
        if (map.hasLayer(geojsonlayer) == true) {
          for (im in geojsonlayer._layers) {
            for (jm of dismon) {
              if (geojsonlayer._layers[im].feature.properties.DistrictID == jm.iddistrict) {
                object.NameD = geojsonlayer._layers[im].feature.properties.NAME;
                object.wind10 = jm.wind10;
                object.wind50 = jm.wind50;
                object.wind80 = jm.wind80;
                object.wind100 = jm.wind100;

                sortmass.push(object);
                object = {};
              }
            }
          }
        }
        sortmass.sort((a, b) => a.wind10 > b.wind10 ? 1 : -1);
        console.log(sortmass);

        if ((year == 2020 && month >= 8) || (year == 2021 && month <= 5) || month == 13) {
          //DELETE1
          for (i in jsonhakas._layers) {
            for (j of dismon) {
              if (jsonhakas._layers[i].feature.properties.DistrictID == j.iddistrict) {

                switch (value) {
                  case "wind10":
                    var es = style(j.wind10)
                    break;
                  case "wind50":
                    var es = style(j.wind50)
                    break;
                  case "wind80":
                    var es = style(j.wind80)
                    break;
                  case "wind100":
                    var es = style(j.wind100)
                    break;
                }
                jsonhakas._layers[i].setStyle(es);
              };
            };
          }
          //DELETE 2
          for (i in geojsonlayer._layers) {
            for (j of dismon) {
              if (geojsonlayer._layers[i].feature.properties.DistrictID == j.iddistrict) {

                switch (value) {
                  case "wind10":
                    var es = style(j.wind10)
                    break;
                  case "wind50":
                    var es = style(j.wind50)
                    break;
                  case "wind80":
                    var es = style(j.wind80)
                    break;
                  case "wind100":
                    var es = style(j.wind100)
                    break;
                }
                geojsonlayer._layers[i].setStyle(es);
              };
            };
          }
        } else {
          swal("Данные за " + month_name + " " + year + " не найдены"); geojsonlayer.resetStyle();
          swal("Данные за " + month_name + " " + year + " не найдены"); jsonhakas.resetStyle();
          info.remove(map); info.addTo(map);
          toggle.remove(map); toggle.addTo(map);
          if ($('.legend').is(':visible')) { legend.remove(map); legend.addTo(map); console.log("remove") }
          else { legend.remove(map); console.log("notremove"); }; // ЭТО КОСТЫЛЬ ИСПРАВИТЬ!!!
        }

        //ЭТО ГРАФ
        for (i2 of jsondist) {
          if ((i2.year == year) && (i2.month != 13)) {
            dismon2.push(i2)
          }
        }
        //ЭТО ГРАФ
        //таблица отсюда
        var table = document.getElementById('table');
        var texttabl = document.getElementById('texttable');
        function printData(table, texttabl) {
          Popup($(table).html());
          Popup($(texttabl).html());
        }
        function Popup(data) {
          const mywindow = window.open('', 'printMe', 'height=600, width=1000');
          // стили таблицы 
          mywindow.document.write('<link rel="stylesheet" href="../graph/c3.css" type="text/css"/>');
          mywindow.document.write(texttabl.outerHTML);
          mywindow.document.write(table.outerHTML);
          mywindow.document.close(); // для IE >= 10 
          mywindow.focus();          // для IE >= 10 
          mywindow.print();
          //   mywindow.close();
          return true;
        }

        $(document).on('click', '#printTable', function () {
          printData();
          return false;
        });
        document.getElementById('picktable').onchange = function () { elev(); };
        $("#table > tr").remove();
        // var the = document.getElementById("the");
        // the.innerHTML = massdan; //указать число мощность 
        sortnum = 1;
        rangevalue();
        var picktable = document.getElementById("picktable");
        var tab10 = document.getElementById("10tab");
        var tab50 = document.getElementById("50tab");
        var tab80 = document.getElementById("80tab");
        var tab100 = document.getElementById("100tab");
        var valuetable = picktable.options[picktable.selectedIndex].value;
        for (let user of sortmass) {
          let tr = document.createElement('tr');
          let td1 = document.createElement('td');
          td1.innerHTML = sortnum + ") " + user.NameD;
          tr.appendChild(td1);
          sortnum++;
          if (valuetable == "windWT") {
            tab10.innerHTML = '10 метров\n(Ватт)';
            tab50.innerHTML = '50 метров\n(Ватт)';
            tab80.innerHTML = '80 метров\n(Ватт)';
            tab100.innerHTML = '100 метров\n(Ватт)';
            Tabletext = ' Таблица мощности ветроустановки  в районах за ' + month_name.toLowerCase() + " " + year + " года";
            if (month == 13) { Tabletext = ' Таблица мощности ветроустановки в районах  за' + month_name_table.toLowerCase() };
            texttable.innerHTML = Tabletext; //добавить текст в таблицу
            let td2 = document.createElement('td');
            td2.innerHTML = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(user.wind10, 3) * (kpdrdr / 100) * (kpdrtr) / 100); // умножаю и делю для округления
            tr.appendChild(td2);
            let td3 = document.createElement('td');
            td3.innerHTML = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(user.wind50, 3) * (kpdrdr / 100) * (kpdrtr) / 100);
            tr.appendChild(td3);

            let td4 = document.createElement('td');
            td4.innerHTML = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(user.wind80, 3) * (kpdrdr / 100) * (kpdrtr) / 100);
            tr.appendChild(td4);

            let td5 = document.createElement('td');
            td5.innerHTML = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(user.wind100, 3) * (kpdrdr / 100) * (kpdrtr) / 100);
            tr.appendChild(td5);
            table.appendChild(tr);
          } else {
            tab10.innerHTML = '10 метров';
            tab50.innerHTML = '50 метров';
            tab80.innerHTML = '80 метров';
            tab100.innerHTML = '100 метров';
            Tabletext = ' Таблица скоростей ветра в районах за ' + month_name.toLowerCase() + " " + year + " года";
            if (month == 13) { Tabletext = ' Таблица скоростей ветра в районах  за' + month_name_table.toLowerCase() };
            texttable.innerHTML = Tabletext; //добавить текст в таблицу
            let td2 = document.createElement('td');
            td2.innerHTML = (Math.trunc(user.wind10 * 100) / 100); // умножаю и делю для округления
            tr.appendChild(td2);

            let td3 = document.createElement('td');
            td3.innerHTML = (Math.trunc(user.wind50 * 100) / 100);
            tr.appendChild(td3);

            let td4 = document.createElement('td');
            td4.innerHTML = (Math.trunc(user.wind80 * 100) / 100);
            tr.appendChild(td4);

            let td5 = document.createElement('td');
            td5.innerHTML = (Math.trunc(user.wind100 * 100) / 100);
            tr.appendChild(td5);
            table.appendChild(tr);
          }
        }
        //таблица до сюда
          document.getElementById("refreshtable").onclick = function () {  $("#table > tr").remove(); elev(); };
        fun1();
      }
    }
  },
  5000,
  -8,
)
ymc.set(null, null, 2020, null, null);

L.control.defaultExtent().addTo(map);
//geojsonlayer.addTo(map);

// отсюда хороплет
function getColor(d) {
  return d > 8.6 ? '#0c2c84' :
    d > 7.1 ? '#225ea8' :
      d > 6.1 ? '#1d91c0' :
        d > 5.1 ? '#41b6c4' :
          d > 3.6 ? '#7fcdbb' :
            d > 2.1 ? '#c7e9b4' :
              '#ffffcc';
}
var granica;
function fun1() { //включение и отключение границ
  granica = document.getElementById('polygran')

  if (granica.checked) {
    geojsonlayer.setStyle({ weight: 2, });
    jsonhakas.setStyle({ weight: 2, })
  }
  else {
    geojsonlayer.setStyle({ weight: 0, });
    jsonhakas.setStyle({ weight: 0, })
  }
}

function style(d) {
  return {
    fillColor: getColor(d),
    weight: 2, //2
    opacity: 1,
    color: 'black',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 4,//5
    color: '#222',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  info.update(layer.feature.properties);
}
document.getElementById("demo").onclick = function () { myFunction(); fun1() };

var calcval = 0;
//
function OnClickFeature(e) {
  var e1 = document.getElementById("ddlViewBy");
  var value = e1.options[e1.selectedIndex].value;
  massdan = [];
  if (value == "wind10") { massdan = ["На 10 метрах"]; visotaname = 'на высоте 10 метров' }
  if (value == "wind50") { massdan = ["На 50 метрах"]; visotaname = 'на высоте 50 метров' }
  if (value == "wind80") { massdan = ["На 80 метрах"]; visotaname = 'на высоте 80 метров' }
  if (value == "wind100") { massdan = ["На 100 метрах"]; visotaname = 'на высоте 100 метров' }
  massdan10 = ["На 10 метрах"];
  massdan50 = ["На 50 метрах"];
  massdan80 = ["На 80 метрах"];
  massdan100 = ["На 100 метрах"];
  for (i2 of dismon2) {
    if (i2.iddistrict == e.target.feature.properties.DistrictID) {
      massdan10.push(Math.trunc(i2.wind10 * 100) / 100); //это для расчёта скорости
      if (value == "wind10") {// massdan.push(Math.trunc(i2.wind10 * 100) / 100);
        massdan.push(Math.round((0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(i2.wind10, 3) * (kpdrdr / 100) * (kpdrtr) / 100) * 24 / 1000 * 30.5))
      }
      if (value == "wind50") { massdan.push(Math.round((0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(i2.wind50, 3) * (kpdrdr / 100) * (kpdrtr) / 100) * 24 / 1000 * 30.5)) }
      if (value == "wind80") { massdan.push(Math.round((0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(i2.wind80, 3) * (kpdrdr / 100) * (kpdrtr) / 100) * 24 / 1000 * 30.5)) }
      if (value == "wind100") { massdan.push(Math.round((0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(i2.wind100, 3) * (kpdrdr / 100) * (kpdrtr) / 100) * 24 / 1000 * 30.5)) }
      massdan50.push(Math.trunc(i2.wind50 * 100) / 100);
      massdan80.push(Math.trunc(i2.wind80 * 100) / 100);
      massdan100.push(Math.trunc(i2.wind100 * 100) / 100);
    }
  }
  console.log(massdan10);
  console.log(massdan);


  map.fitBounds(e.target.getBounds(), { maxZoom: 7.4, })
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      x: 'x',
      columns: [
        yeargraph,
        massdan,
        //   massdan50,
        //   massdan80,
        //  massdan100,
      ],
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          // this also works for non timeseries data
          format: function (x) { return monthgraph[x.getMonth()]; }
        }
      },
      y: {
        label: { // ADD
          text: 'Кол-во выработанной энергии, кВт/ч',
          position: 'outer-middle'
        },
      }
    }
  });

  var customOptions =
  {
    className: 'popup1',
    keepInView: true,
  }
  for (i of dismon) {
    if (i.iddistrict == e.target.feature.properties.DistrictID) {
      SummSumm = 'График расчёта проектной мощности ВЭУ при скорости ветра ' + visotaname + ' в ' + e.target.feature.properties.NAME + 'e за ' + yearpicker + ' год';
      SummSumm = SummSumm.split('ий ').join('ом ');
      textgraph.innerHTML = SummSumm;
      if (value == "wind10") { calcval = i.wind10; calcval10 = i.wind10; calcval50 = i.wind50; calcval80 = i.wind80; calcval100 = i.wind100; }//chart.show([massdan10]);chart.hide([massdan50, massdan80, massdan100]);  }
      if (value == "wind50") { calcval = i.wind50; calcval10 = i.wind10; calcval50 = i.wind50; calcval80 = i.wind80; calcval100 = i.wind100; }//chart.show([massdan50]);  chart.hide([massdan10, massdan80, massdan100]);  }
      if (value == "wind80") { calcval = i.wind80; calcval10 = i.wind10; calcval50 = i.wind50; calcval80 = i.wind80; calcval100 = i.wind100; }//chart.show([massdan80]);chart.hide([massdan10, massdan50, massdan100]); }
      if (value == "wind100") { calcval = i.wind100; calcval10 = i.wind10; calcval50 = i.wind50; calcval80 = i.wind80; calcval100 = i.wind100; }//chart.show([massdan100]); chart.hide([massdan10, massdan80, massdan50]); }
      rangevalue();
      // calcobj = Math.round((Math.pow(vint, 3) * Math.pow(calcval, 2) * kpdrdr * kpdrtr) / 2080);
      calcobj = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval, 3) * (kpdrdr / 100) * (kpdrtr) / 100);
      disbutt = e.target.feature.properties.NAME;
      disbutt = disbutt.split('ий').join('ого');
      var popupContent = (` <p><b> Скорость за ${month_name_table} </b></p><h3> ${e.target.feature.properties.NAME}</h3> Скорость ветра на высоте 10 метров: ${Math.trunc(i.wind10 * 100) / 100} м/c
       <p>Скорость ветра на высоте 50 метров: ${Math.trunc(i.wind50 * 100) / 100} м/c 
       <p>Скорость ветра на высоте 80 метров: ${Math.trunc(i.wind80 * 100) / 100} м/c 
       <p>Скорость ветра на высоте 100 метров: ${Math.trunc(i.wind100 * 100) / 100} м/с</p> `)
      //  Ожидаемая мощность генератора при ${Math.trunc(calcval * 100) / 100} м/c: <b>${Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval, 3) * (kpdrdr / 100) * (kpdrtr) / 100)} Ватт </b>
      //  При расчетах по среднегодовой скорости ветра прогнозируемое получение энергии составит:
      //    <b>${Math.round(calcobj * 24 / 1000)} кВт в день </b><p><h4>  -${Math.round(calcobj * 24 / 1000 * 30.5)} кВт в месяц </h4><h4> <p> -${Math.round(calcobj * 24 / 1000 * 365)} кВт в год</h4>
      e.target.bindPopup(popupContent, customOptions).openPopup();
    }
  }
}

function resetHighlight(e) {
  //geojsonlayer.getColor(e.target);
  var layer = e.target;
  layer.setStyle({
    weight: 2, //2
  });
  fun1();
  info.update(layer);
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: OnClickFeature,
  });
  layer.bindTooltip(feature.properties.NAME, {
    permanent: true, direction: 'center', sticky: true,
    offset: [0, 0],
    opacity: 1,
    //interactive: true,
    className: 'leaflet-tooltip-own'
  }).addTo(map);

}
//DEMO TEST DELETE УДАЛИТЬ КНОПКА 
function myFunction() {
  var e = document.getElementById("ddlViewBy");
  var value = e.options[e.selectedIndex].value;
  rangevalue();
  if (value == "wind10") {
    calcobj = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval10, 3) * (kpdrdr / 100) * (kpdrtr) / 100);
    swal(`Ожидаемая мощность генератора при ${Math.trunc(calcval10 * 100) / 100} м/c: <b>${calcobj = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval10, 3) * (kpdrdr / 100) * (kpdrtr) / 100)} Ватт </b>
   При расчетах по среднегодовой скорости ветра прогнозируемое получение энергии для ${disbutt}а составит:
  <b>${Math.round(calcobj * 24 / 1000)} кВт/ч в день </b><p><h4>  ${Math.round(calcobj * 24 / 1000 * 30.5)} кВт/ч в месяц </h4><h4> <p> ${Math.round(calcobj * 24 / 1000 * 365)} кВт/ч в год</h4>`)
  }
  if (value == "wind50") {
    calcobj = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval50, 3) * (kpdrdr / 100) * (kpdrtr) / 100);
    swal(`Ожидаемая мощность генератора при ${Math.trunc(calcval50 * 100) / 100} м/c: <b>${calcobj = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval50, 3) * (kpdrdr / 100) * (kpdrtr) / 100)} Ватт </b>
     При расчетах по среднегодовой скорости ветра прогнозируемое получение энергии для ${disbutt}а составит:
    <b>${Math.round(calcobj * 24 / 1000)} кВт/ч в день </b><p><h4>  ${Math.round(calcobj * 24 / 1000 * 30.5)} кВт/ч в месяц </h4><h4> <p> ${Math.round(calcobj * 24 / 1000 * 365)} кВт/ч в год</h4>`)
  }
  if (value == "wind80") {
    calcobj = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval80, 3) * (kpdrdr / 100) * (kpdrtr) / 100);
    swal(`Ожидаемая мощность генератора при ${Math.trunc(calcval80 * 100) / 100} м/c: <b>${calcobj = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval80, 3) * (kpdrdr / 100) * (kpdrtr) / 100)} Ватт </b>
     При расчетах по среднегодовой скорости ветра прогнозируемое получение энергии для ${disbutt}а составит:
    <b>${Math.round(calcobj * 24 / 1000)} кВт/ч в день </b><p><h4>  ${Math.round(calcobj * 24 / 1000 * 30.5)} кВт/ч в месяц </h4><h4> <p> ${Math.round(calcobj * 24 / 1000 * 365)} кВт/ч в год</h4>`)
  }
  if (value == "wind100") {
    calcobj = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval100, 3) * (kpdrdr / 100) * (kpdrtr) / 100);
    swal(`Ожидаемая мощность генератора при ${Math.trunc(calcval100 * 100) / 100} м/c: <b>${calcobj = Math.round(0.5 * 0.4 * 1.25 * (Math.pow(vint, 2) * 3.14) * Math.pow(calcval100, 3) * (kpdrdr / 100) * (kpdrtr) / 100)} Ватт </b>
    При расчетах по среднегодовой скорости ветра прогнозируемое получение энергии для ${disbutt}а составит:
   <b>${Math.round(calcobj * 24 / 1000)} кВт/ч в день </b><p><h4>  ${Math.round(calcobj * 24 / 1000 * 30.5)} кВт/ч в месяц </h4><h4> <p> ${Math.round(calcobj * 24 / 1000 * 365)} кВт/ч в год</h4>`)
  }
}
//
var info = L.control({ position: 'bottomright' });

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  // props = (props == undefined) ? 
  // { 'OBJECTID_1': 8,'DistrictID': 9999 } : props
  var e = document.getElementById("ddlViewBy");
  var value = e.options[e.selectedIndex].value;
  for (j of dismon) {
    if (props.DistrictID == j.iddistrict) {
      switch (value) {
        case "wind10":
          this._div.innerHTML = '<h4>Скорость ветра в районе</h4>' + (props ?
            '<b>' + props.NAME + '</b><br />' + 'высота: 10 метров' + '</b><br />' + 'скорость: ' + Math.trunc(j.wind10 * 100) / 100 + ' м/с '
            : 'скорость');
          break;
        case "wind50":

          this._div.innerHTML = '<h4>Скорость ветра в районе</h4>' + (props ?
            '<b>' + props.NAME + '</b><br />' + 'высота: 50 метров' + '</b><br />' + 'скорость: ' + Math.trunc(j.wind50 * 100) / 100 + ' м/с '
            : 'скорость');
          break;
        case "wind80":
          this._div.innerHTML = '<h4>Скорость ветра в районе</h4>' + (props ?
            '<b>' + props.NAME + '</b><br />' + 'высота: 80 метров' + '</b><br />' + 'скорость: ' + Math.trunc(j.wind80 * 100) / 100 + ' м/с '
            : 'скорость');
          break;
        case "wind100":
          this._div.innerHTML = '<h4>Скорость ветра в районе</h4>' + (props ?
            '<b>' + props.NAME + '</b><br />' + 'высота: 100 метров' + '</b><br />' + 'скорость: ' + Math.trunc(j.wind100 * 100) / 100 + ' м/с '
            : 'скорость');
          break;
      }
    }
  }
};
info.addTo(map);
//ТУТ ЛЕГЕНДА ХОРОПЛЕТ

//рисовалка

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0.8, 2, 3.6, 5, 6.1, 7, 8.6],
    labels = [];
  // loop through our density intervals and generate a label with a colored square for each interval
  div.innerHTML += "Скорость ветра, м/с";
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div;
};
//legend.addTo(map);
//ТУТ НЕТ ЛЕГЕНДЫ ХОРОПЛЕТ
var toggle = L.easyButton({
  position: 'bottomright',
  states: [{
    stateName: 'remove-legend',
    icon: 'fa-map',
    title: 'Легенда',
    onClick: function (btn, map) {
      $('.legend').is(':visible') ? legend.remove(map) : legend.addTo(map)
    }
  }]
})
toggle.addTo(map);
// L.easyButton('fa-map', function(btn, map){
//   $('.legend').is(':visible') ? legend.remove(map) : legend.addTo(map)
// },"Легенда").addTo(map);

//ДО СЮДА ХОРОПЛЕТ
console.log(geojsonlayer);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


function set_points(points) {
  var rey = [];
  for (i in points) {
    var circle = L.circle([points[i].latitude, points[i].longitude], {
      color: 'red',
      fillColor: '#f03'
      // fillOpacity: 0.5,
      // radius: 500
    }).bindPopup(`<p>Название:${points[i].name}</p> <p>Название региона:${points[i].district.name}</p> <p>ID региона:${points[i].district.id}</p>`);
    // rey.push([points[i].latitude, points[i].longitude, points[i].windSpeed / 15])
    PointLayer.addLayer(circle);

  }
  // console.log(PointLayer); 
}
L.control.scale().addTo(map);
get_points();

var lc = L.control.locate({
  position: 'topleft',
  strings: {
    title: "Геолокация"
  },
  locateOptions: {
    enableHighAccuracy: false,
    maxZoom: 13
  }

}).addTo(map);

//sdadsa

// This add a Search bar
var searchControl = new L.esri.Controls.Geosearch({ position: 'topright', }).addTo(map);

var results = new L.LayerGroup().addTo(map);

searchControl.on('results', function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});


//выбор слоёв
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
urlstreet = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
var grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
  streets = L.tileLayer(urlstreet);
googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
var satellite = L.tileLayer(mbUrl, { id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

var baseLayers = {
  "Grayscale": grayscale,
  "Streets": streets,
  // "arcbase": googleTerrain,
  "Satellite": satellite,
};

var overlays = {
  "Башкирия": geojsonlayer,
  "Хакасия": jsonhakas,
  "City": PointLayer,
};
L.control.layers(baseLayers, overlays, { collapsed: true }).addTo(map);



var sidebar = L.control.sidebar({
  autopan: false,       // whether to maintain the centered map point when opening the sidebar
  closeButton: true,    // whether t add a close button to the panes
  container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
  position: 'left',     // left or right
}).addTo(map);
// выбор слоёв окончен
L.control.browserPrint().addTo(map) //печать

map.on("browser-print-start", function (e) {
  legend.addTo(e.printMap);
});
map.on("browser-print-end", function (e) {

  reload();
});
function reload() {
  location.reload();
}
map.removeLayer(PointLayer); //не добавляются точки на карту при её загрузки 

// if  (map.hasLayer(jsonhakas)!=true) {
//   jsonhakas.clearLayers(); console.log ("clear")} else {  jsonhakas = new L.GeoJSON.AJAX("hakasia.geojson", { style: style, onEachFeature: onEachFeature }); jsonhakas.addTo(map);}
 //  if  (map.hasLayer(geojsonlayer)!=true) {
  //   geojsonlayer.clearLayers();} else { geojsonlayer = new L.GeoJSON.AJAX("DistrictGeo33.geojson", { style: style, onEachFeature: onEachFeature }).addTo(map);}
