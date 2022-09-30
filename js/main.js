$(window).on("scroll", function() {

    if ($(".navbar").offset().top > 40) {
       $(".navbar").addClass("navbar-fixed");
       $(".go-top").show();
 
    } else {
       $(".navbar").removeClass("navbar-fixed");
       $(".go-top").hide();
 
    }
 })
 
 $(document).ready(function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
       itemSelector: '.portfolio-item'
    });
 
    $('#portfolio-filters li').on('click', function() {
       $("#portfolio-filters li").removeClass('filter-active');
       $(this).addClass('filter-active');
 
       portfolioIsotope.isotope({
          filter: $(this).data('filter')
       });
    });
 
    $('.popup-image').magnificPopup({
       type: 'image',
       closeOnContentClick: true,
       gallery: {
          enabled: true,
          navigateByImgClick: true
       }
    });
 
    $("#navbarNav").on('show.bs.collapse', function() {
 
       $(".navbar").addClass("navbar-fixed");
 
       $('a.nav-link, a.btn-custom').click(function() {
          $("#navbarNav").collapse('hide');
       });
    });
 
 
 });






