import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { classNames, getDataAttrs, emit } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { f7ready, f7 } from '../utils/f7';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  noGap? : boolean
  tag? : string
  resizable? : boolean
  resizableFixed? : boolean
  resizableAbsolute? : boolean
  resizableHandler? : boolean
  onClick? : (event?: any) => void
  onGridResize? : (...args: any[]) => void
  COLOR_PROPS
*/

const Row = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    tag = 'div',
    noGap,
    resizable,
    resizableFixed,
    resizableAbsolute,
    resizableHandler = true,
  } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const onClick = (event) => {
    emit(props, 'click', event);
  };

  const onResize = (el) => {
    if (el === elRef.current) {
      emit(props, 'gridResize');
    }
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useEffect(() => {
    f7ready(() => {
      f7.on('gridResize', onResize);
    });
    return () => {
      f7.off('gridResize', onResize);
    };
  }, []);

  const RowTag = tag;

  const classes = classNames(
    className,
    'row',
    {
      'no-gap': noGap,
      resizable,
      'resizable-fixed': resizableFixed,
      'resizable-absolute': resizableAbsolute,
    },
    colorClasses(props),
  );

  return (
    <RowTag id={id} style={style} className={classes} ref={elRef} {...dataAttrs} onClick={onClick}>
      {children}
      {resizable && resizableHandler && <span className="resize-handler" />}
    </RowTag>
  );
});

Row.displayName = 'f7-row';

export default Row;
