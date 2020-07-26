$(document).ready(function(){
	$(".menu").click(function(){
		$("nav").slideToggle(500);
	});

	var body = jQuery( 'body' );
	var menu = jQuery( '#nav-menu' );
	
	var homeburger = jQuery( '#homeburger' );
	homeburger.on( 'click', function( e ) {
		e.preventDefault();
		
		if ( this.className.indexOf( 'on' ) != -1 ) {
			hidehomeburger();
		} else {
			homeburger.addClass( 'on' );
			body.addClass( 'menu-on' );
			menu.stop().slideDown( 400 );
		}
	});
	
	var menu_links = document.getElementById('nav-menu').querySelectorAll('a');

	if(menu_links.length){
		menu_links.forEach(function(a) {
			a.addEventListener("click",function(e) {
				hidehomeburger();
			});
		});
	}

	function hidehomeburger(){
		homeburger.removeClass( 'on' );
		body.removeClass( 'menu-on' );
		menu.stop().slideUp( 250 );
	}
	
	jQuery('.acc-single').each(function(){
		var list = jQuery(this);
		var dt = list.children('dt');
		dt.on('click', function(e){
			dt.removeClass('on');
			jQuery(this).addClass('on');
		});
	});
	
	var h = window.innerHeight * 0.8;

	$( window ).on( 'scroll', function() {
		if ( $( this ).scrollTop() > h ) {
			$( '#scroll' ).fadeIn();
		} else {
			$( '#scroll' ).fadeOut();
		}
	});
	
	jQuery( '.tabbed' ).each( function() {
		var list = jQuery( this );
		var controls = list.children( '.tabbed-controls' );
		var contents = list.children( '.tabbed-contents' );
		
		var controlItems = controls.find( 'a' );
		var contentItems = contents.children();
		
		controlItems.on( 'mouseover', function() {
			var index = controlItems.index( jQuery( this ));
			contentItems.slideUp().eq( index ).slideDown();
		});
		
	});
	
	$('#scroll').on( 'click', function(e){
				e.preventDefault();
				$("html,body").animate({scrollTop:0},400);		
			});

});
$( window ).on( 'load', function() {
    $( '#content-wrap' ).delay(350).fadeIn( 800 );
});	

var dbxUI = {
	Accordion: {
		config: {},
		init: function( args ) {
			this.setup( args );
			
			var items = document.body.querySelectorAll( this.config.selector );
			var count = items.length;
			if ( !count ) { return; }
			for ( var i = 0; i != count; ++i ) {
				this.bootstrap( items[ i ] );
			}
		},
		bootstrap: function( el ) {
			var _ = this.config;
			var acc = jQuery( el );
			var controls = acc.children( _.controlSelector );
			var contents = acc.children( _.contentSelector );
			var mode = el.getAttribute( 'mode' );
			
			controls.each( function() {
				var control = jQuery( this );
				var content = control.next( _.contentSelector );
				
				if ( !content.length ) { return; }
				
				control.on( 'click', function( e ) {
					e.preventDefault();
					
					switch ( mode ) {
						case 'or':
							if ( control.hasClass( _.activeClass )) {
								control.removeClass( _.activeClass );
								content.slideUp( _.timeOut );
							} else {
								contents.slideUp( _.timeOut );
								controls.removeClass( _.activeClass );
								control.addClass( _.activeClass );
								content.slideDown( _.timeIn );
							}
							break;
							
						case 'xor':
							if ( control.hasClass( _.activeClass )) { return; }
							
							contents.slideUp( _.timeOut );
							controls.removeClass( _.activeClass );
							control.addClass( _.activeClass );
							content.slideDown( _.timeIn );
							break;
							
						default:
							control.toggleClass( _.activeClass );
							if ( control.hasClass( _.activeClass )) {
								content.slideDown( _.timeIn );
							} else {
								content.slideUp( _.timeOut );
							}
							break;
					}
				});
			});
		},
		getDefaults: function() {
			return {
				activeClass: 'on',
				contentSelector: '.ui-accordion--content',
				controlSelector: '.ui-accordion--control',
				selector: '.ui-accordion',
				timeIn: 250,
				timeOut: 250
			};
		},
		setup: function( args ) {
			this.config = this.getDefaults();
			if ( !args ) { return; }
			
			for ( var property in args ) {
				this.config[ property ] = args[ property ];
			}
		}
	}
};
jQuery( document ).ready( function() {
	dbxUI.Accordion.init();
	//dbxUI.Accordion.init({ timeIn: 100, selector: '#accordion-widget' });
	//dbxUI.Accordion.init({ timeIn: 600, selector: '#accordion-widget-2' });
});
	