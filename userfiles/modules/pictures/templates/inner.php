<?php

/*

type: layout

name: Inner

description: Inner Slider

*/

  ?>




 <?php if(isarr($data )): ?>

 <?php $id = "slider-".uniqid(); ?>



<div class="autoscale mw-rotator mw-rotator-template-inner" id="<?php print $id; ?>">
  <div class="autoscale mw-gallery-holder">
    <?php foreach($data  as $item): ?>
    <div class="autoscale mw-gallery-item mw-gallery-item-<?php print $item['id']; ?>">


            <img  class="autoscale-x" src="<?php print thumbnail($item['filename'], 900); ?>" alt="" />




    </div>
    <?php endforeach ; ?>
  </div>
</div>


<script type="text/javascript">
    mw.require("<?php print $config['url_to_module']; ?>css/style.css", true);
    mw.require("<?php print $config['url_to_module']; ?>js/api.js", true);

    $(document).ready(function(){
      var el = mwd.getElementById('<?php print $id; ?>');
      var module = mw.tools.firstParentWithClass(el, 'module');
      module.style.paddingBottom = '130px';
    });

</script>

<script type="text/javascript">

  Rotator = null;
  $(document).ready(function(){
    if($('#<?php print $id; ?>').find('.mw-gallery-item').length>1){
        Rotator = mw.rotator('#<?php print $id; ?>');
        if (!Rotator) return false;
        Rotator.options({
            paging:true,
            pagingMode:"thumbnails",
            next:true,
            prev:true,
            reflection:true
        });
    }
  });

</script>


<?php else : ?>
 <?php  mw_text_live_edit("<div class='pictures-module-default-view mw-open-module-settings'><img src='" .$config['url_to_module'] . "pictures.png' /></div>"); ?>
<?php endif; ?>