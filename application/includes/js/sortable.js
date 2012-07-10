/**
 * Starts the drag and drop functionality
 *
 * @method mw.edit.init_sortables()
 */
mw.edit.init_sortables = function () {
	mw.edit.remove_content_editable();
	$(".mw-sorthandle").show();
	mw.drag.fix_placeholders()
	mw.drag.fixes()
	// mw.edit.equal_height();

	



	mw.drag.init(".element,.row");
	mw.drag.init(".module-item");
	mw.drag.sort(".element > *,.edit,.column > *");
	mw.drag.edit(".element > *");
 mw.drag.fix_handles();
};



mw.isDrag = false;

mw.dragCurrent = null;

mw.drag = {
	init: function (selector, callback) {
		$(selector).not(".ui-draggable").draggable({
			handle: ".mw-sorthandle",
			cursorAt: {
				top: -20,
				left: -20
			},
			helper: 'original',
			start: function () {
				mw.isDrag = true;
				mw.dragCurrent = this;
				mw.drag.edit_remove();
				$(this).addClass("mw_drag_started");
			},
			stop: function () {
				mw.isDrag = false;
				$(this).removeClass("mw_drag_started");
				if (typeof callback === 'function') {
					callback.call(this);
				}

				if ($(mw.dragCurrent).hasClass("module-item")) {
					setTimeout(function () {
						mw.drag.load_new_modules();
						mw.drag.edit_remove();
						//   mw.drag.fix_placeholders()
					}, 50);
				}
				
				
				setTimeout(function () {
						 
						mw.drag.edit_remove();
						//   mw.drag.fix_placeholders()
					}, 150);

			}
		});
	},
	
	sort_handles_events: function (selector) {
		
		if(selector == undefined){
		selector = '.mw-sorthandle';	
		}
		
		
		$(selector).unbind('mopusedown');
		$(selector).bind("mopusedown", function (event) {
			if (mw.isDrag) {
				mw.drag.destroy_dropables();
				mw.drag.display_dropables(this);

				if (window.console != undefined) {
					console.log('mouseenter while dragging ');
				}

				event.stopPropagation();
			}
		});
		
		
		
	},	

	sort: function (selector) {
		$(selector).unbind('mouseenter mouseleave');
		$(selector).bind("mouseenter", function (event) {
			if (mw.isDrag) {
				mw.drag.destroy_dropables();
				mw.drag.display_dropables(this);

				if (window.console != undefined) {
					console.log('mouseenter while dragging ');
				}

				event.stopPropagation();
			}
		});
		$(selector).bind("mouseleave", function (event) {
			if (mw.isDrag) {
				setTimeout(function () {
					if ($(".mw_dropable_hover").length == 0) {
						mw.drag.destroy_dropables();
					}
				}, 37); //must have setTimeout cause of the droppable hover


				if (window.console != undefined) {
					console.log('mouseleave while dragging ');
				}

				event.stopPropagation();
			}
		});

		mw.drag.the_drop(selector);
	},
	the_drop: function (selector) {
		$(selector).mouseup(function (event) {
			if (mw.isDrag) {
				var el = this;
				setTimeout(function () {
					$(mw.dragCurrent).hide();
					$(".mw_dropable").replaceWith(mw.dragCurrent);
					$(mw.dragCurrent).fadeIn('slow');
					mw.drag.fixes();
					mw.drag.fix_placeholders()
					event.stopPropagation();
				}, 37);
			}
		});
	},
	create_dropable: function (elem) {
		var dropable = document.createElement('div');
		dropable.className = 'mw_dropable';
		dropable.innerHTML = 'Drop your module here';
		$(dropable).hover(function () {
			$(this).addClass("mw_dropable_hover")
		}, function () {
			$(this).removeClass("mw_dropable_hover")
		});
		var w = $(elem).width();
		$(dropable).width(w);
		$(dropable).addClass('mw_dropable_hover');
		return dropable;
	},
	destroy_dropables: function () {
		$(".mw_dropable").remove();
	},
	display_dropables: function (selector) {
		var drop_bottom = mw.drag.create_dropable(selector);
		drop_bottom.style.display = 'none';
		$(drop_bottom).addClass("drop_bottom");
		$(selector).after(drop_bottom);
		$(drop_bottom).fadeIn(200);
	},
	fixes: function () {
		$(".column, .element, .row", '.edit').height('auto');
		$('.row', '.edit').equalWidths();
		$(mw.dragCurrent).removeAttr('style');
		$(".element", '.edit').removeAttr('style');

		$(".column", '.edit').each(function () {
			var el = $(this);
			if (el.children().length == 0) {




				el.height(el.parent().height());
			}
		});

	},


	/**
	 * fix_placeholders in the layout
	 *
	 * @method mw.drag.fix_placeholders()
	 */
	fix_placeholders: function () {





		$('.column').each(function () {
			$this = $(this);

			if ($("div.element", this).size() == 0) {


				text = mw.settings.empty_column_placeholder.toString();


				$some_el_id = 'mw-placeholder-' + mw.random();
				text = text.replace(/_ID_/g, $some_el_id);


				$(this).html(text);
				mw.drag.sort('#' + $some_el_id);

			}
			else {
				$(this).children('.empty-element').remove()
			}
		});
	},





	/**
	 * Makes handles for all elements
	 *
	 * @method mw.drag.fix_handles()
	 */
	fix_handles: function () {
		 
	
			 
		
		if (mw.isDrag == false) {
			$('.row', '.edit').each(function (index) {
				$has = $(this).children("div:first").hasClass("mw-sorthandle-row");
				if ($has == false) {
					$(this).prepend(mw.settings.sorthandle_row);
				}
				$el_id = $(this).attr('id');
				if ($el_id == undefined || $el_id == 'undefined') {
					$el_id = 'mw-row-' + new Date().getTime() + Math.floor(Math.random() * 101);
					$(this).attr('id', $el_id);
				}
				mw.edit.init_row_handles($el_id);
			});

			$('.element:not(.empty-element)').each(function (index) {
				$el_id = $(this).attr('id');
				if ($el_id == undefined || $el_id == 'undefined') {
					$el_id = 'mw-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
					$(this).attr('id', $el_id);
				}
				$has = $(this).children(":first").hasClass("mw-sorthandle-col");
				if ($has == false) {
					$has_module = $(this).children(".module").size();
					if ($has_module == false) {
						text = mw.settings.sorthandle_col
					}
					else {
						$m_name = $(this).children(".module").attr('data-module-title');

						$m_id = $(this).children(".module").attr('module_id');
						text = mw.settings.sorthandle_module
						text = text.replace(/MODULE_NAME/g, "" + '' + $m_name + "");
						text = text.replace(/MODULE_ID/g, "'" + $m_id + "'");
					}
					text = text.replace(/ELEMENT_ID/g, "'" + '' + $el_id + "'");
					$(this).prepend(text);
				}
			})
			
			
		$('.mw-sorthandle-main-level', '.edit').removeClass('mw-sorthandle-main-level');
		$('.mw-sorthandle-row-in-column', '.edit').removeClass('mw-sorthandle-row-in-column');
		$('.mw-sorthandle-row-in-element', '.edit').removeClass('mw-sorthandle-row-in-element');
		 $('.mw-sorthandle-img-in-element', '.edit').removeClass('mw-sorthandle-img-in-element');
		$('.edit>.row').children('.mw-sorthandle').addClass('.mw-sorthandle-main-level');
		$('.element').find('.row').children('.mw-sorthandle').addClass('mw-sorthandle-row-in-element');
        $('.element').find('img').addClass('mw-sorthandle-img-in-element');
		$('.column').find('.row').children('.mw-sorthandle').addClass('mw-sorthandle-row-in-column');



 mw.drag.sort_handles_events();
		mw.edit.fix_zindex();
		}
	},








	/**
	 * Makes contentEditable events on selector
	 *
	 * @method mw.drag.edit(".element > *");
	 */
	edit: function (selector) {
		$(selector).unbind('mousedown.edit');
		$(selector).bind("mousedown.edit", function (e) {
			if (!mw.isDrag) {



				$is_this_module = $(this).hasClass('mw-module-wrap');
				$is_freshereditor = $(this).hasClass('freshereditor');
				$is_this_row = $(this).hasClass('row');
				$is_this_handle = $(this).hasClass('mw-sorthandle');
				$is_mw_delete_element = $(this).hasClass('mw.edit.delete_element');
				$columns_set = $(this).hasClass('columns_set');

				is_image = this.tagName == 'IMG' ? true : false;
				if (window.console != undefined) {
					console.log('mousedown on element : ' + this.tagName);
				}

				if ($is_freshereditor == false) {
					$(this).closest('.mw-sorthandle').show();

					$el_id = $(this).attr('id');
					if ($el_id == undefined || $el_id == 'undefined') {
						$el_id = 'mw-element-' + mw.random();
						$(this).attr('id', $el_id);
					}
					mw.settings.element_id = $el_id;
					mw.settings.sortables_created = true;
					if (window.console != undefined) {
						console.log('contenteditable started on element id: ' + $el_id);
					}
					mw.settings.text_edit_started = true;

					$is_this_element = $(this).hasClass('.element');
					$(this).addClass('freshereditor');
					//	$(this).freshereditor("edit", true);
					$(this).parent('.element').freshereditor("edit", true);
					$(this).parent('.element').children('.mw-sorthandle').freshereditor("edit", false);
					$(this).parent('.element').children().removeAttr("contenteditable");
					//$(this).parent('.element').children('.mw-sorthandle').freshereditor("edit", false);
					setTimeout("mw.settings.sorthandle_hover=false", 300);
					e.stopPropagation();
				}
				else {
					mw.settings.sorthandle_hover = true;
				}
			}
		});
	},

/**
	 * Removes contentEditable for ALL elements
	 *
	 * @method mw.drag.edit_remove();
	 */
	edit_remove: function () {
		 
				 
	
	$('.freshereditor', '.edit').freshereditor("edit", false);
	$('.freshereditor', '.edit').removeClass("freshereditor");
						$('.element').children("[contenteditable]").removeAttr("contenteditable");

					 
				 
			 
		},





	/**
	 * Loads new dropped modules
	 *
	 * @method mw.drag.load_new_modules()
	 */
	load_new_modules: function () {
		$(".edit .module-item img").each(function () {
			var clone = $(this).clone(true);
			$(this).parent().replaceWith(clone);
		});
		$need_re_init = false;
		$(".module_draggable", '.edit').each(function (c) {
			//$(this).unwrap(".module-item");
			$name = $(this).attr("data-module-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-col-' + mw.random();
				$(this).after("<div class='element mw-module-wrap' id='" + $el_id_new + "'></div>");
				mw.drag.load_module($name, '#' + $el_id_new);

			}
			$name = $(this).attr("data-element-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-layout-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
				$(this).after("<div class='mw-layout-holder' id='" + $el_id_new + "'></div>");
				mw.drag.load_layout_element($name, '#' + $el_id_new);
			}
			$need_re_init = true;
		});

		//

		if ($need_re_init == true) {
			if (!mw.isDrag) {

				setTimeout(function () {
					mw.drag.fix_handles();
					mw.drag.fixes();
				}, 100);

				setTimeout("mw.edit.init_sortables()", 300);




			}
		}
	},

	/**
	 * Loads new dropped layouts
	 *
	 * @method mw.edit.load_layout_element()
	 */
	load_layout_element: function ($layout_element_name, $update_element) {

		var attributes = {};
		attributes.element = $layout_element_name;

		url1 = mw.settings.site_url + 'api/content/load_layout_element';
		$($update_element).load(url1, attributes, function () {
			window.mw_sortables_created = false;
		});
		//	mw.edit.unwrap_layout_holder()
	},





	/**
	 * Loads module is element id
	 *
	 * @method mw.edit.load_layout_element()
	 */
	load_module: function ($module_name, $update_element) {
		var attributes = {};
		attributes.module = $module_name;

		url1 = mw.settings.site_url + 'api/module';
		$($update_element).load(url1, attributes, function () {
			window.mw_sortables_created = false;
		});

	},









}