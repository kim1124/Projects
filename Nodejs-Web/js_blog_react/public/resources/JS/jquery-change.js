$.fn.changeColor = function() {

    this.each(function() {

        var $dom = $(this);

        $dom.click(function() {

            $dom.css("background-color", "skyblue");

        });

    });

};

(function($){

    $(document).ready(function(){

      let divTag = $("#clickDiv, #sencondDiv");

      divTag.changeColor();

    });

})(jQuery);
