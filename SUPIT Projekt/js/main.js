$(document).ready(function() {
  $("#dohvatiJSON").click(function() {
    dohvatiIPrikazi();
  });
  function dohvatiIPrikazi() {
    $.ajax({
      url: "http://www.fulek.com/VUA/SUPIT/GetCategoriesAndFoods",
      method: "GET",
      async: false
    }).done(function(meni) {
      var meniDiv = document.getElementById("meni");
      var i = 0;

      //Prolaz kroz sve sekcije i postavljanje atributa i elemenata za sekcije

      meni.forEach(function(post) {
        var divSekcija = document.createElement("h2");
        divSekcija.innerHTML = `${meni[i].Naziv}`;
        divSekcija.setAttribute("id", "sekcija");
        meniDiv.appendChild(divSekcija);

        //Prolaz kroz sva jela unutar sekcija

        var j = 0;
        meni[i].Ponuda.forEach(function(post) {
          //Postaljvanje varijabli

          var idJela = parseInt(`${meni[i].Ponuda[j].JeloId}`);
          var nazivJela = `${meni[i].Ponuda[j].Naziv}`;
          var opisJela = `${meni[i].Ponuda[j].Opis}`;
          var cijenaJela = parseInt(`${meni[i].Ponuda[j].Cijena}`);
          var cijenaTxt = `${meni[i].Ponuda[j].Cijena}.00 kn`;
          var tableMeni = document.createElement("table");
          var trMeni = document.createElement("tr");
          var tdNaziv = document.createElement("td");
          var tdCijena = document.createElement("td");
          var gumbCijena = document.createElement("button");
          var trOpis = document.createElement("tr");
          var tdOpis = document.createElement("td");
          var popoverContent = `<div id="testnipopover"><label for="kolicina" >Quantity:</label><p id="idJelaOrder" style="display:none;">${idJela}</p><p id="nazivJelaOrder" style="display:none;">${nazivJela}</p><p id="cijenaJelaOrder" style="display:none;">${cijenaJela}</p><br style="none" /><input id="kolicinaOrder" type="number" value="1" min="1" max="100" /><br style="none" /><div class="container"><form><div class="form-group"><label for="remark">Remark:</label><textarea class="form-control" rows="5" id="remarkORder" placeholder="message..."></textarea></div></form></div><button class="btn btn-danger btn-block" id=gumbOrder>Order</button></div>`;

          //gradnja DOM-a

          meniDiv.appendChild(tableMeni);
          tableMeni.appendChild(trMeni);
          tableMeni.appendChild(trOpis);
          trMeni.appendChild(tdNaziv);
          trMeni.appendChild(tdCijena);
          tdCijena.appendChild(gumbCijena);
          trOpis.appendChild(tdOpis);

          //Postavljanje atributa na HTML elemente i tektsa unutar elemenata

          tableMeni.setAttribute("class", "tableSekcije");
          tdNaziv.setAttribute("id", "nazivJela");
          tdNaziv.setAttribute("width", "100%");
          tdCijena.setAttribute("rowspan", "2");
          tdCijena.setAttribute("id", "cijena");
          gumbCijena.setAttribute(
            "class",
            "btn btn-warning popover-toggle popovergumb"
          );
          gumbCijena.setAttribute("data-toggle", "popover");
          gumbCijena.setAttribute("title", `<h4>${nazivJela}<h4/>`);
          gumbCijena.setAttribute("data-placement", "right");
          gumbCijena.setAttribute("data-content", `${popoverContent}`);
          gumbCijena.setAttribute("data-container", "body");
          gumbCijena.setAttribute("data-boundary", "viewport");
          gumbCijena.setAttribute("data-placement", "right");
          gumbCijena.setAttribute("data-html", "true");
          trOpis.setAttribute("id", "opis");
          tdNaziv.innerHTML = `${nazivJela}`;
          tdOpis.innerHTML = `${opisJela}`;
          gumbCijena.innerHTML = `${cijenaTxt}`;
          j++;
        });
        i++;
      });
    });
    $(function() {
      $('[data-toggle="popover"]').popover();
    });

    //Kreiranje narudzbe

    var narudzba = 0;
    $(document).on("click", "#gumbOrder", function() {
      var trOrder = document.createElement("tr");
      var thOrder = document.createElement("th");
      var tdNazivOrder = document.createElement("td");
      var tdKolicinaOrder = document.createElement("td");
      var tdCijenaOrder = document.createElement("td");
      var idJelaOrder = $("#idJelaOrder").text();
      var tbodyOrder = document.getElementById("tbodyOrder");
      tbodyOrder.appendChild(trOrder);
      trOrder.appendChild(thOrder);
      trOrder.appendChild(tdNazivOrder);
      trOrder.appendChild(tdKolicinaOrder);
      trOrder.appendChild(tdCijenaOrder);
      var nazivJelaOrder = $("#nazivJelaOrder").text();
      var cijenaJela = $("#cijenaJelaOrder").text();
      var kolicinaOrder = $("#kolicinaOrder").val();
      var remarkORder = $("#remarkORder").val();
      narudzba = narudzba + cijenaJela * kolicinaOrder;
      thOrder.innerHTML = `${idJelaOrder}`;
      tdNazivOrder.innerHTML = `${nazivJelaOrder}`;
      tdKolicinaOrder.innerHTML = `${kolicinaOrder}`;
      tdCijenaOrder.innerHTML = `${cijenaJela}.00 kn`;

      $(".popover").each(function() {
        $(this).popover("hide");
      });

      //Postavljanje tooltipa

      if (remarkORder.length > 0) {
        var facomment = document.createElement("i");
        tdNazivOrder.appendChild(facomment);
        facomment.setAttribute("class", "fa fa-circle");
        facomment.setAttribute("style", "color:orange;margin-left:5px");
        facomment.setAttribute("data-toggle", "tooltip");
        facomment.setAttribute("data-placement", "top");
        facomment.setAttribute("title", remarkORder);
        $('[data-toggle="tooltip"]').tooltip();
      }

      $("#ukupniOrder").text(`${narudzba}.00 kn`);
    });
  }
});
