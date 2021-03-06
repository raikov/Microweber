<?php

/*

type: layout

name: Columns

description: Columns

*/
?>

<div class="clearfix container-fluid module-posts-template-columns">
  <?php if (!empty($data)): ?>
  <div class="row-fluid">
    <?php  $j=1;  foreach ($data as $item): ?>
    <?php $i=1 ; ?>
    <div class="span4">
      <?php if($show_fields == false or in_array('thumbnail', $show_fields)): ?>
      <a class="img-polaroid img-rounded" href="<?php print $item['link'] ?>"> <span class="valign"><img src="<?php print thumbnail($item['image'], 290, 210); ?>" alt="<?php print $item['title'] ?>" title="<?php print $item['title'] ?>"  /></span> </a>
      <?php endif; ?>
      <?php if($show_fields == false or in_array('title', $show_fields)): ?>
      <h3><a  class="lead" href="<?php print $item['link'] ?>"><?php print $item['title'] ?></a></h3>
      <?php endif; ?> 
      <?php 
 
 
	  if($show_fields == false or (is_array($show_fields) and  in_array('description', $show_fields))): ?>
      <p class="description">
        <?php  print $item['description'] ?>
      </p>
      <?php endif; ?>
      <div class="product-price-holder clearfix">
        <?php if($show_fields == false or in_array('price', $show_fields)): ?>
        <?php if(isset($item['prices']) and isarr($item['prices'])){  ?>
        <?php 
		$vals2 = array_values($item['prices']);
		$val1 = array_shift($vals2); ?>
        <span class="price"><?php print currency_format($val1); ?></span>
        <?php } else{ ?>
  
         
        <?php } ?>
        <?php endif; ?>
        <?php if($show_fields == false or in_array('add_to_cart', $show_fields)): ?>
        <?php

			  $add_cart_text = get_option('data-add-to-cart-text', $params['id']);
			  if( $add_cart_text == false){
				     $add_cart_text =  _e("Add to cart", true);
			  }
			  ?>
				 <?php if(isarr( $item['prices'])): ?>
                <button class="btn" type="button" onclick="mw.cart.add('.mw-add-to-cart-<?php print $item['id'].$i ?>');"><i class="icon-shopping-cart"></i>&nbsp;<?php print $add_cart_text ?></button>
                <?php endif; ?>
        <?php endif; ?>
      </div>
      <?php if(isarr( $item['prices'])): ?>
      <?php foreach($item['prices']  as $k  => $v): ?>
     
      <div class="clear products-list-proceholder mw-add-to-cart-<?php print $item['id'].$i ?>">
        <input type="hidden"  name="price" value="<?php print $v ?>" />
        <input type="hidden"  name="content_id" value="<?php print $item['id'] ?>" />
      </div>
      <?php
			break;
			$i++; endforeach ; ?>
      <?php  endif; ?>
    </div>
    <?php  if($j % 3 == 0):  ?>
  </div>
  <div class="row-fluid">
    <?php  endif; ?>
    <?php  $j++; endforeach; ?>
  </div>
  <?php endif; ?>
</div>
<?php if (isset($pages_count) and $pages_count > 1 and isset($paging_param)): ?>
<?php print paging("num={$pages_count}&paging_param={$paging_param}") ?>
<?php endif; ?>
