import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  onClick,
  className,
  disabled,
  active,
  ...attrs
}) => {
  const onClickAction = e => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onclick(e);
    }
  };
  const classes = classNames('btn', className, { active });
  const Tag = attrs.href ? 'a' : 'button';
  return (
    <Tag
      {...attrs}
      className={classes}
      disabled={disabled}
      onClick={onClickAction}
    >
      {children}
    </Tag>
  );
};

export default Button;
