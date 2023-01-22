  //Globale Variablen für die Adresse der Abgabestelle
  let HomePostcode = "12345";
  let HomeCity = "Musterstadt";
  let HomeStreet = "Musterstraße";
  let HomeHousenumber = "12";

  //Trägt die Werte der Adresse der Abgabestelle in alle dafür vorgesehenen Platzhalter
  //Sucht alle Elemente mit den Klassen "HomeStreet", "HomeCity", "HomePostcode" und "HomeHousenumber" und trägt die Werte der globalen Variablen ein
  function homeAddress(){
    let homeAddressFields = [["HomeStreet",HomeStreet],["HomeCity",HomeCity],["HomePostcode",HomePostcode],["HomeHousenumber",HomeHousenumber]]
    for (let i = 0; i < homeAddressFields.length; i++) {
      const element = homeAddressFields[i];
      const placeholder = document.getElementsByClassName(element[0]);
      for (let j = 0; j < placeholder.length; j++) {
        placeholder[j].innerText = element[1];
      }
    }
  }
  
  //Laden aller Projektbezeichnungen in das Auswahlfeld des Spendenformulars
  //Sucht alle Elemente mit der Klasse "projectHeadline" und trägt die enthaltenen Werte in das Auswahlfeld
  function fillProjectField(){
    let strOptions;
    lstProjects = document.getElementsByClassName("projectHeadline");
    for (let i = 0; i < lstProjects.length; i++) {
      strOptions = strOptions + "<option>" + lstProjects[i].innerText + "</option>";
    }
    document.getElementById("selectProject").insertAdjacentHTML("afterbegin",strOptions) ;   
  }

  //Prüft das Spendenformular beim Absenden
  //Rückgabewert true/false
  function chkForm(){
    let chkList = ["inputFirstname","inputLastname", "inputClothingDescription"]; //Zu prüfende Felder
    let alertText = ""; //Ausgabetext bei Fehler
    let formCheck = true; //Rückgabewert

    //Bei Lieferart Abholung: Adressfelder zur Prüfung einbeziehen
    if(document.getElementById("selectDeliveryType").value == "pickup"){
      chkList.push("inputStreet","inputHouseNumber","inputCity","inputPostcode")   
    }

    //Prüfen ob die in chkList eingetragenen Felder Werte enthalten
    for (let i = 0; i < chkList.length; i++) {
      const inputID = chkList[i];
      if(document.getElementById(inputID).value==""){
        document.getElementById(inputID).style.borderColor = "red";
        formCheck =  false;
        alertText ="Bitte alle Pflichtfelder ausfüllen!";
      }
      else{
        document.getElementById(inputID).style.borderColor = "#ced4da" ;
      }
    }

    //Prüfen ob Telefonnummer oder E-Mail Werte enthalten
    if(document.getElementById("inputMail").value == "" && document.getElementById("inputPhone").value == "" ){
      document.getElementById("inputMail").style.borderColor = "orange";
      document.getElementById("inputPhone").style.borderColor = "orange";
      alertText = alertText + "\n" + "Bitte eine Telefonnummer ODER eine E-Mailadresse eintragen!"
      formCheck =  false;
    }
    else{
      document.getElementById("inputMail").style.borderColor = "#ced4da";
      document.getElementById("inputPhone").style.borderColor = "#ced4da";
    }

    //Bei Lieferart Abholung: Prüfen ob Postleitzahl eine Abholung zulässt
    if(document.getElementById("selectDeliveryType").value == "pickup"){
      if(document.getElementById("postcodeAlert").style.display == "block"){
        document.getElementById("inputPostcode").style.borderColor="red"
        alertText = alertText + "\n" + "Bitte beachten Sie den Hinweis zu Ihrer eingegebenen Postleitzahl."
        formCheck = false;
      }
    }
    
    //Ausgabe des Fehlertextes
    if(formCheck==false){
      alert(alertText);
    }
    return formCheck;
  }

  //Blendet jedes Element der Klasse page aus
  //Zeigt das im Parameter übergebene Element an
  function showPage(pageID){
    let pages = document.getElementsByClassName("page");

    for (let i = 0; i < pages.length; i++) {
      pages[i].style.display = "none";
    }
    document.getElementById(pageID).style.display = "block";
  }

  //Ein- und Ausblenden des im Parameter übergebenen Elements
  function showSection(sectionID){
    if (document.getElementById(sectionID).style.display=="block"){
      document.getElementById(sectionID).style.display="none";
    }
    else{
      document.getElementById(sectionID).style.display="block";
    }
  }

  //Blendet abhängig von der ausgewählten Lieferart Adressfelder und einen Hinweistext im Spendenformular ein/aus
  function chkDeliveryType(type){
    if(type.value=="pickup"){
      document.getElementById("pickupAddress").style.display="block";
      document.getElementById("deliveryInformation").style.display ="none";
    }
    else{
      document.getElementById("pickupAddress").style.display="none";
      document.getElementById("deliveryInformation").style.display ="block";
    }
  }

  //Anzeigen des Spendenformulars, Auswahl des als Parameter erhaltene Projekt im Auswahlfeld
  function donateProject(project){
    showPage("pgFormular");
    document.getElementById("selectProject").value = project;
  }

  //Prüft ob die ersten beiden Stellen der im Spendenformular eingetragene Postleitzahl_
  //den ersten beiden Stellen der Postleitzahl der Geschäftsstelle entsprechen und blendet Hinweistext ein
  function checkPostcode(){
    let postcode = document.getElementById("inputPostcode").value;
    if (postcode.length >= 2){
      let regioncode = postcode.substring(0,2);
      if (regioncode == HomePostcode.substring(0,2)){
        document.getElementById("postcodeAlert").style.display = "none";
      }
      else{
        document.getElementById("postcodeAlert").style.display = "block";
      }
    }
    else{
      document.getElementById("postcodeAlert").style.display = "none";
    }
  }

  //Durchsucht die URL nach einem Parameter
  //Rückgabewert: Dem Parameter zugeordneten wert
  function getParameter(parameter){

    let url = window.location.search.substring(1);
    let parameters = url.split("&");
    
    for (let i = 0; i < parameters.length; i++) {
      let singleParameter = parameters[i].split("=");
      if (parameter == singleParameter[0]){
        return(singleParameter[1]);
      }
    }
  
  }

  //Füllt die Ausgabeliste auf redirect.html
  function fillForm(){
    
      //Zetvariablen
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth();
      let year = today.getFullYear();
      let hours = today.getHours();
      let minute = today.getMinutes();
      let seconds = today.getSeconds();

      //Auslesen der Werte aus der URL
      let firstname = decodeURIComponent(getParameter("firstname"));
      let lastname = decodeURIComponent(getParameter("lastname"));
      let phone = getParameter("phone");
      let gender = getParameter("gender");
      let mail = decodeURIComponent(getParameter("mail"));
      let description = decodeURIComponent(getParameter("description").replace(/\+/g, ' '));
      let project = decodeURIComponent(getParameter("project"));
      let street = decodeURIComponent(getParameter("street"));
      let housenumber = getParameter("housenumber");
      let postcode = getParameter("postcode");
      let city = decodeURIComponent(getParameter("city"));
      
      //Zeiteinheiten in die Form dd.mm.yyyy konvertieren
      month = month + 1;
      if (String(month).length == 1){
          month = '0' + month;
      }

      if (String(day).length == 1){
        day = '0' + day;
      }

      if (String(hours).length == 1){
        hours = '0' + hours;
      }

      if (String(minute).length == 1){
          minute = '0' + minute;
      }

      //ID Code erstellen
      let IDCode = firstname.substring(0,1) + lastname.substring(0,1) + day + month + String(year).substring(2,4) + seconds;
      
      //Eintragung der Werte in die dafür vorgesehen Platzhalter
      document.getElementById("id").innerHTML = IDCode;
      document.getElementById("date").innerHTML = day + '.' + month + '.' + year + ', ' + hours + ":" + minute;
      document.getElementById("gender").innerHTML = gender; 
      document.getElementById("firstname").innerHTML = firstname;
      document.getElementById("lastname").innerHTML = lastname;
      document.getElementById("phone").innerHTML = phone; 
      document.getElementById("mail").innerHTML = mail;
      document.getElementById("clothingDescription").innerHTML = description; 
      document.getElementById("project").innerHTML = project;      
  
      if(getParameter("deliveryType")=="pickup"){
          document.getElementById("deliveryType").innerHTML = "Abholung durch Sammelfahrzeug an folgender Adresse:";
          document.getElementById("street").innerHTML = street; 
          document.getElementById("housenumber").innerHTML = housenumber; 
          document.getElementById("postcode").innerHTML = postcode;
          document.getElementById("city").innerHTML = city;
      }
      else{
          document.getElementById("deliveryType").innerHTML = "Persönliche Übergabe an unserer Geschäftsstelle:";
          document.getElementById("street").innerHTML = HomeStreet;
          document.getElementById("housenumber").innerHTML = HomeHousenumber;
          document.getElementById("postcode").innerHTML = HomePostcode;
          document.getElementById("city").innerHTML = HomeCity;
      }  
  }
  
