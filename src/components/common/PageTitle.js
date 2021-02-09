import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Col } from "shards-react";

const PageTitle = ({ title, subtitle, className, ...attrs }) => {
  const classes = classNames(
    className,
    "text-center",
    // "text-md-left",
    "mb-sm-0"
  );

  return (
    <Col xs="12" sm="12" className={classes} { ...attrs }>
      <span className="text-uppercase page-subtitle">{subtitle}</span>
      <h1 className="page-title gradient-text page-title-h1">{title}</h1>
    </Col>
  )
};

PageTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
  /**
   * The page subtitle.
   */
  subtitle: PropTypes.string
};

export default PageTitle;
