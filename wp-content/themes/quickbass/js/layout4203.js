jQuery(document).ready(function() {

	jQuery("#contato, .wpcf7-form").submit(function(e){
    	e.preventDefault();
    	var erros = [];
    	ajaxSubmit(jQuery(this), erros);
    });

	/*jQuery('.three-line').click(function(){
        //jQuery('.menu').slideToggle();
        if(jQuery(this).hasClass('active')){
        	jQuery('.three-line i.fa').addClass('fa-navicon');
        	jQuery('.three-line i.fa').removeClass('fa-remove');
        	jQuery(this).removeClass('active');
        }else{
        	jQuery('.three-line i.fa').removeClass('fa-navicon');
        	jQuery('.three-line i.fa').addClass('fa-remove');
        	jQuery(this).addClass('active');
        }
    });*/

    jQuery('.three-line').click(function(){
        jQuery(this).toggleClass('active');
        jQuery('.menu').slideToggle();
    });

    /*jQuery('.menu li').click(function(){
        jQuery('.three-line').toggleClass('active');
        jQuery('.menu').slideToggle();
    });
*/
    jQuery(window).load(function(){    	
		jQuery(window).scroll(function(){  		
			checkScroll(); 
		}); 
	});
	
	checkScroll();

    /*jQuery(".header .menu li a").click(function(e){
        var div = "#"+jQuery(this).data('id');
        jQuery('html, body').animate({scrollTop: jQuery(div).offset().top - 80}, 1000);
    });

    jQuery(".header .logo-fixo a, .header .logo a").click(function(e){
        var div = "#"+jQuery(this).data('id');
        jQuery('html, body').animate({scrollTop: jQuery(div).offset().top - 80}, 1000);
    });*/

    jQuery('.scroll').on('click',function(e) {
        e.preventDefault();
        var offset = 0;
        var target = this.hash;
        if ($(this).data('offset') != undefined) offset = $(this).data('offset');
        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top - offset
        }, 500, 'swing', function() {
            // window.location.hash = target;
        });
    });


});

function checkScroll(){	
    if(jQuery(window).width() > 1199){
        if(jQuery(window).scrollTop()>10){	
            jQuery('header').addClass('fixo');
        }else{		
            jQuery('header').removeClass('fixo');
        }
    }
}


function ajaxSubmit(jForm, erros, args){
    args = args || {};
    if (erros.length > 0) {
        var _mensagem = "";
        jQuery(erros).each(function(idx, item) {
            _mensagem += item.msg + '<br/>\n';
        });
		if(jQuery(window).width() > 767) erros[0].obj.focus();
        alerta(_mensagem);
    } else {
        jQuery.ajax({
            url: jForm.attr('action'),
            data: jForm.serialize(),
            type: jForm.attr('method'),
            dataType: "json",
            beforeSend: function() {
                jQuery('input:submit').attr('disabled', 'disabled');
               jForm.find("button[type=submit]").html("<i class='fa fa-spinner fa-pulse'></i>");
            },
            error:function(data){
                if(args.error != null)args.error(data.responseText);
            },
            complete: function(data) {
				console.log(data);
                jQuery('input:submit').removeAttr('disabled');
                jForm.find("button[type=submit]").html("ENVIAR");
                //jForm.trigger('reset');
                if(args.complete != null){
					args.complete(data.responseJSON.mensagem);
					if(data.responseJSON.mensagem != null && data.responseJSON.status == "error"){
						alerta(data.responseJSON.mensagem);
					}
                }else{
                   alerta(data.responseJSON.mensagem);
				}
            }
        });

    }

}
