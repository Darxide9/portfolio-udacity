$(document).ready(function(){

	//menu showing on mobile view
	$("#menu-wrapper").click(function(){
		if($("nav").hasClass("show")){
			$("nav").removeClass("show");
			$("#menu-icon").removeClass("active");
		}
		else{
			$("nav").addClass("show");
			$("#menu-icon").addClass("active");
		}
	});

	var is_desktop_layout = window.matchMedia("screen and (min-width: 960px)").matches ? true : false;

	/******** Menu Hover Behaviour ********/

	main_title_timeout = undefined;

	function menuMouseEnter(section_id){
		if(window.matchMedia("screen and (min-width: 960px)").matches){
			if(main_title_timeout != undefined){
				clearTimeout(main_title_timeout);
			}					
			$("#opening-screen-outer").scrollTo($(section_id), 300)
		};			
	}

	function menuMouseLeave(){
		if(window.matchMedia("screen and (min-width: 960px)").matches){
			main_title_timeout =setTimeout(function(){$("#opening-screen-outer").scrollTo(0, 300)}, 2000);
		}
	}

	//show titles according to hover
	function addMenuHoverListener(){
		$("nav ul li").hover(
			function(){
				var section_to_show_id = '#' + $(this).attr('title').toLowerCase(); 
				menuMouseEnter(section_to_show_id)
			}, 
			menuMouseLeave
			);
	}

	//kick off
	addMenuHoverListener();

	/******** Menu Click Behaviour ********/

	//tracks the active section id
	var active_section_id = "";

	//make sections appears when nav buttons are clicked
	$('nav ul li').click(function(){
		if(window.matchMedia("screen and (min-width: 960px)").matches){

			$("nav ul li").off("mouseenter mouseleave");

			var section_to_show_id = '#' + $(this).attr("title").toLowerCase();

			if(active_section_id == ""){
				$(section_to_show_id + ' .section-content').addClass('show');
				active_section_id = section_to_show_id; 
			}
			else if (section_to_show_id == '#works' && active_section_id == '#works'){
				$('.work-single').removeClass('show');
			}
			else if(section_to_show_id != active_section_id){
				if(section_to_show_id == '#works'){
					$('.work-single').removeClass('show');
				}

				var section_to_hide = $(active_section_id + ' .section-content.show');

				section_to_hide.removeClass('show');
				setTimeout(function(){
					$('#opening-screen-outer').scrollTo($(section_to_show_id), 300);
				}, 300);
				setTimeout(function(){
					$(section_to_show_id + ' .section-content').addClass('show');
				}, 600);
				active_section_id = section_to_show_id;
			}					
		};

	});

	//make opening screen appear when h1 is clicked
	$("header h1").click(function(){
		$(active_section_id + " .section-content").removeClass('show');
		setTimeout(function(){
			$('#opening-screen-outer').scrollTo(0, 300);
		},300)
		addMenuHoverListener();
		active_section_id = "";
	})


	/********   Single Works Behaviour    **********/

	var works_mapping = {
		0 : '#bastian-contrario-single' ,
		1 : '#gdb-single' ,
		2 : '#pdc-single' 
	}

	//make work details section appears according to the card clicked
	$("#works .item").click(function(){
		var pane_to_show_id= works_mapping[$(this).index()];
		$(pane_to_show_id).addClass("show");
		//$("#works-wrapper").addClass("hide-left");
	})

	//make work details appears when work title is clicked/tapped
	$(".work-single h3").click(function(){
		$(this).parent().hasClass("expand") ? $(this).parent().removeClass("expand") : $(this).parent().addClass("expand");
	})

	
	//prev/next behaviour
	$("#works .navigation").click(function(){

		var next = $(this).hasClass("next") ? true : false;
		this_work_pane= $(this).parents(".work-single");
		this_work_index = $(this_work_pane).index(".work-single");
		if(this_work_index >= 0 && this_work_index < $(".work-single").length){
			var pane_to_show= next ? $(".work-single").get((this_work_index + 1)) : $(".work-single").get((this_work_index - 1));
			$(pane_to_show).addClass("show");
			$(this_work_pane).removeClass("show");
		}
	})


	/************ Contacts Behaviour ************/

	//contacts form label animation
	$("#contacts input").focusin(function(){
		$(this).siblings("label").addClass("active");
	})

	$("#contacts input").focusout(function(){

		//do this only if field is empty
		if (!$(this).val()){
			$(this).siblings("label").removeClass("active");
		}
	})
})