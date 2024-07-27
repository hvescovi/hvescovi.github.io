$(document).ready(function () {

    $("#busca").focus();


    


    
    // overwrite of the default contains selector
    // https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
    $.expr[":"].contains = $.expr.createPseudo(function (arg) {
        return function (elem) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });


    $("#busca").keyup(function () {

        var procura = $(this).val();

        if (procura.length >= 3) {

            
            // oculta todos os elementos
            $("li:contains('.')").each(function () {
                var elem = $(this);
                elem.css("border", "solid 3px red");
                elem.hide();
            });

            var anterior = $("#anterior").val();

            var jaBuscou = (anterior.lenght > 0);

            //alert("anterior="+anterior+", novo="+procura);


            $("#anterior").val(procura);


            // procura aqueles que contém a string de busca
            //var procura = $(this).val();

            $("li:contains(" + procura + ")").each(function () {

                if (procura.length >= 3) {

                    // retira o texto de orientação
                    //$("#aviso").text("");

                    // obtem o DL, que contém o elemento procurado
                    var elem = $(this);
                    elem.show();

                    // obtem o conteudo que possui o texto buscado
                    var conteudo = elem.html();
                    var original = conteudo; // faz uma copia
                    //console.log(conteudo);
                    // retorna o texto ao estado anterior, caso já tenha buscado
                    if (jaBuscou) {
                        conteudo = conteudo.replace(new RegExp("<span class=destaca>" + original + "</span>", "ig"), original);
                    }

                    // destaca o texto buscado
                    var novo = conteudo.replace(new RegExp(procura, "ig"), "<span class=destaca>" + procura + "</span>");
                    //alert(novo);
                    //var novo = conteudo.replace(new RegExp(procura, "ig"), "<span class=destaca>"+procura+"</span>");

                    //adiciona ao novo o conteudo original novamente
                    novo = novo + "<div class=original>" + original + "</div>";
                    elem.html(novo);

                }



            });

        } else {
            // texto de orientação
            //$("#aviso").text("Digite ao menos 3 letras para exibir apenas as seções com o texto procurado. Acentos ainda não são ignorados: devem ser idênticos ao texto buscado.");

            
            // mostra todos os elementos
            $("li").each(function () {
                var elem = $(this).parent();
                elem.css("border", "0");
                elem.show();
            });
        }

    });

});