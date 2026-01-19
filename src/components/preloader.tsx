import React, { useEffect } from 'react';
import $ from 'jquery';

const Preloader: React.FC = () => {
  useEffect(() => {
    const onLoad = () => {
      if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
          $(this).remove();
        });
      }
    };

    $(window).on('load', onLoad);

    return () => {
      $(window).off('load', onLoad);
    };
  }, []);

  return <div id="preloader"></div>;
};

export default Preloader;
