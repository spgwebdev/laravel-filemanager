(function( $ ){

  $.fn.filemanager = function(type, options) {
    type = type || 'file';

    this.on('click', function(e) {
      var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
      var target_input = $('#' + $(this).data('input'));
      var target_preview = $('#' + $(this).data('preview'));
      var image_to_clone = $('#image_to_clone');
      window.open(route_prefix + '?type=' + type, 'FileManager', 'width=900,height=600');
      window.SetUrl = function (items) {
        var file_path = items.map(function (item) {
          item.url = item.url.replace(window.location.protocol + "//" + window.location.host+"/","/");
          return item.url;
        }).join(',');

        // set the value of the desired input to image url
        target_input.val('').val(file_path).trigger('change');

        // clear previous preview
        // target_preview.html('');

        // set or change the preview image src
        items.forEach(function (item) {
          item.thumb_url = item.thumb_url.replace(window.location.protocol + "//" + window.location.host+"/","/");
          if(image_to_clone.length)
          {
            var image_clone = image_to_clone.clone();

            image_clone.attr('id','');
            image_clone.find('img').attr('src', item.thumb_url)
            image_clone.find('input').val(item.url);
            image_clone.find('input').attr('name','media[image][]');
            image_clone.css('display','flex');

            target_preview.append(image_clone);
          }
          else
          {
            target_preview.append(
              $('<img>').css('height', '5rem').attr('src', item.thumb_url)
            );
            var target_input_clone = target_input.clone();

            target_preview.append(
               target_input_clone.val(item.url)
            );
          }
          
        });

        // trigger change event
        target_preview.trigger('change');
      };
      return false;
    });
  }

})(jQuery);
