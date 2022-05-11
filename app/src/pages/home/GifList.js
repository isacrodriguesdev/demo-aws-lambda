import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios"

function GitList(props) {

  useEffect(() => {
    console.log(props)
  }, [props.gifs])

  return (
    <Fragment>
      {
        props.gifs.length > 0 && props.gifs.sort((a, b) => b.createdAt - a.createdAt).map((gif) => (
          <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <img
              src={gif.url}
              class="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />
          </div>
        ))
      }
    </Fragment>
  );
}

export default GitList;
