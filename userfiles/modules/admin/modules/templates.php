<?php
if(isset($params['for-module'])){
	$params['parent-module'] = $params['for-module'];
}
if(!isset($params['parent-module'])){
error('parent-module is required');	
	
}

if(!isset($params['parent-module-id'])){
error('parent-module-id is required');	
	
}
 $templates = module_templates($params['parent-module']);
 
 //$params['type'];

$cur_template = get_option('data-template', $params['parent-module-id']);
 ?><?php  if(is_arr( $templates)): ?>
<label class="mw-ui-label"><?php _e("Current Skin / Template"); ?></label>
<div class="mw-ui-select" style="width: 100%"><select name="data-template"     class="mw_option_field" option_group="<?php print $params['parent-module-id'] ?>"  data-refresh="<?php print $params['parent-module-id'] ?>"  >

<option  value="default"   <?php if(('default' == $cur_template)): ?>   selected="selected"  <?php endif; ?>><?php _e("Default"); ?></option>

  <?php  foreach($templates as $item):	 ?>
  <?php if((strtolower($item['name']) != 'default')): ?>
  <option value="<?php print $item['layout_file'] ?>"   <?php if(($item['layout_file'] == $cur_template)): ?>   selected="selected"  <?php endif; ?>     > <?php print $item['name'] ?> </option>
  <?php endif; ?>
  <?php endforeach; ?>
</select></div>


<label class="mw-ui-label">
    <hr>
    <small>
        <?php _e("Need more designs"); ?>?<br>
        <?php _e("You can use all templates you like and change the skin"); ?>.
    </small>
</label>

<a class="mw-ui-link" href="javascript:;"><?php _e("Browse Templates"); ?></a>

<?php //d($templates); ?>
<?php endif; ?>