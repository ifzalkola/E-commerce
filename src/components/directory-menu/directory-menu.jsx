import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory-selectors";
import "./directory-menu.scss";
import MenuItem from "../menu-item/menu-item";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ id, title, imageUrl, size, linkUrl }) => (
        <MenuItem
          key={id}
          imageUrl={imageUrl}
          title={title}
          size={size}
          linkUrl={linkUrl}
        />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
