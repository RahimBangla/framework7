import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  tabs?: boolean;
  COLOR_PROPS
*/

const Views = forwardRef((props, ref) => {
  const { className, id, style, children, tabs } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(
    className,
    'views',
    {
      tabs,
    },
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

Views.displayName = 'f7-views';

export default Views;