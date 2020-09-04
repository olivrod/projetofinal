function logout(){

    localStorage.removeItem("user");
    window.location = "login.html";

}

function logar(){

    if (document.getElementById("txtemail").value.indexOf("@") < 1 && document.getElementById("txtemail").value.length != 7){
        window.alert("Login incorreto!");
        return null;
    } 

    var mensagem = {
        email:document.getElementById("txtemail").value,
        racf:document.getElementById("txtemail").value,
        senha:document.getElementById("txtsenha").value
    };

    var cabecalho = {
        method:"POST",
        body:JSON.stringify(mensagem),
        headers:{
            "Content-type" : "application/json"
        }
    }

    fetch("http://localhost:8080/login", cabecalho)
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("user", JSON.stringify(res));
            window.location = "dashboard.html";
        })
        .catch(err => {
            window.alert("Usuário ou senha incorreto!");
        });

}

function exibirUsuario(){

    if (localStorage.getItem("user")){
    var usuario = JSON.parse(localStorage.getItem("user"));

    document.getElementById("foto").innerHTML = "<img src='img/" + usuario.foto + "' width='50px'>";
    document.getElementById("dados").innerHTML = usuario.nome + " (" + usuario.racf + ")";
    }
    else{
        window.location = "login.html";
    }

}

function preencherTabelaDashboard(lista,acao){

    var tabela = "<table class='table table-striped table-sm' width='100%' style='font-size: small;'>" + 
                    "<tr>" +
                        "<td><b>PDV</b></td>"+
                        "<td><b>Nome Técnico</b></td>"+
                        "<td><b>Documento</b></td>"+
                        "<td align='center'><b>Operadora</b></td>"+
                        "<td align='center'><b>Data</b></td>"+
                        "<td align='center'><b>";
                        if (acao == "exportar") { 
                            tabela+= "Status" 
                        }else{
                            tabela+= "Ação"
                        } 
            tabela+= "</b></td>"+
                    "</tr>";
       
    for (cont=0; cont < lista.length; cont++){
        if (acao == "exportar") {
            tabela+= "<tr>" +
                    "<td>" + lista[cont].pdv.numero_ponto + " " + lista[cont].pdv.nome + "</td>" +
                    "<td>" + lista[cont].nomeTecnico + "</td>" +
                    "<td>" + lista[cont].doc + "</td>" +
                    "<td align='center'>" + lista[cont].operadora + "</td>" +
                    "<td align='center'>" + lista[cont].data + " " + lista[cont].hora.substring(0, lista[cont].hora.length - 3) + "</td>" +
                    "<td align='center'>" + lista[cont].status + "</td></tr>";
        } else {
            tabela+= "<tr>" +
                    "<td>" + lista[cont].pdv.numero_ponto + " " + lista[cont].pdv.nome + "</td>" +
                    "<td>" + lista[cont].nomeTecnico + "</td>" +
                    "<td>" + lista[cont].doc + "</td>" +
                    "<td align='center'>" + lista[cont].operadora + "</td>" +
                    "<td align='center'>" + lista[cont].data + " " + lista[cont].hora.substring(0, lista[cont].hora.length - 3) + "</td>" +
                    "<td align='center'><input type='button' class='btn btn-success btn-sm' onclick=alterarStatus('aprovada','" + lista[cont].numSeq + "') value='Aprovar'";
                    if (lista[cont].status == "aprovada") {
                        tabela+= " disabled";
                    }
                    tabela+= ">&nbsp;&nbsp;<input type='button' class='btn btn-warning btn-sm' onclick=alterarStatus('negada','" + lista[cont].numSeq + "') value='Negar'";
                    if (lista[cont].status == "negada") {
                        tabela+= " disabled";
                    }
                    tabela+= ">&nbsp;&nbsp;<input type='button' class='btn btn-danger btn-sm' onclick=alterarStatus('cancelada','" + lista[cont].numSeq + "') value='Cancelar'";
                    if (lista[cont].status == "cancelada") {
                        tabela+= " disabled";
                    }
                    tabela+= ">" +
                "</td></tr>";
        }
    }
    
    tabela +=   "</table>";
    
    document.getElementById("solicitacoes").innerHTML=tabela;   
}

function carregarSolicitacoes(acao,status){
    fetch ("http://localhost:8080/solicitacao/status/" + status)
        .then(res => res.json())
        .then(res => preencherTabelaDashboard(res,acao));
}

function carregarPdv(){
    fetch ("http://localhost:8080/pdvs")
        .then(res => res.json())
        .then(res => preencherCombo(res));
}

function preencherCombo(lista){
    var dados = "";

    for (cont = 0; cont < lista.length; cont++){
        dados += "<option value='" + lista[cont].id + "'>" + lista[cont].numero_ponto + " - " + lista[cont].nome + "</option>";
    }

    document.getElementById("cmbpdv").innerHTML = dados;
}

function gravar(){
    var data = document.getElementById("txtdata").value;
    var ano = data.substring(0,4);
    var mes = data.substring(5,7);
    var dia = data.substring(8);
    var nossadata = dia + "/" + mes + "/" + ano;
     
    var mensagem = {
        nomeTecnico : document.getElementById("txtnometecnico").value.toUpperCase(),
        operadora : document.getElementById("txtoperadora").value.toUpperCase(),
        telefone : document.getElementById("txttelefone").value,
        doc : document.getElementById("txtdocumento").value,
        pdv : {id : document.getElementById("cmbpdv").value},
        data : nossadata,
        status : "inicial",
        hora : document.getElementById("txthora").value
    }
 
    var cabecalho = {
        method:"POST",
        body: JSON.stringify(mensagem),
        headers:{
            "Content-Type": "application/json"
        }
    }
 
    fetch("http://localhost:8080/novasolicitacao", cabecalho)
        .then(res => res.json())
        .then(res => {
            window.alert("Gravado com sucesso!");
            window.location="solicitacao.html";
        })
        .catch(err => {
            window.alert("Erro");
        });
}

function alterarStatus(status, numSeq){
    var mensagem = {
        numSeq : numSeq,
        status : status
    }
 
    var cabecalho = {
        method:"POST",
        body: JSON.stringify(mensagem),
        headers:{
            "Content-Type": "application/json"
        }
    }
 
    fetch("http://localhost:8080/alterarstatus", cabecalho)
        .then(res => res.json())
        .then(res => {
            //window.alert("Gravado com sucesso");
            window.location="dashboard.html";
        })
        .catch(err => {
            window.alert("Erro");
        });
}

function imprimirDashboard(qual){
    document.getElementById('btnImprimir').onclick = function() {
        var conteudo = document.getElementById(qual).innerHTML,
            tela_impressao = window.open('about:blank');

        tela_impressao.document.write(conteudo);
        tela_impressao.window.print();
        tela_impressao.window.close();
    };
}

function exportar()
{
    tela_impressao = window.open('dashboardexport.html');
}

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}

function export_table_to_csv(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
    var row = [], cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++) 
        row.push(cols[j].innerText);

    csv.push(row.join(";"));		
    }

    // Download CSV
    download_csv(csv.join("\n"), filename);
}

    