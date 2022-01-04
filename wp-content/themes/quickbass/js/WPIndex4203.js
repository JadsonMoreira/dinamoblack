jQuery(document).ready(function() {

	jQuery('.menu-servicos li').on('click',function(){
        var id = jQuery(this).data('id');
        jQuery('.menu-servicos li').removeClass('active');
        jQuery(this).addClass('active');
        jQuery('.box').hide();
        jQuery('#'+id).show();
    });

});
