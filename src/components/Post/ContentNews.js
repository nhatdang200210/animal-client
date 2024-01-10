import React, {useState } from 'react'
// import { Typography } from '@material-ui/core'

export default function ContentNews({ contentNews }) {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div>
      nhat
    </div>
  );
};

