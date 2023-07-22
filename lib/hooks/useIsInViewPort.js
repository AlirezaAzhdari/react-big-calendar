"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var InViewPort = function InViewPort(props) {
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    inView = _useState2[0],
    setInView = _useState2[1];
  var ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var observer = new IntersectionObserver(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
        entry = _ref2[0];
      setInView(entry.isIntersecting);
    }, {
      rootMargin: '100px 0px 100px 0px',
      root: document.querySelector('.rbc-time-content')
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return function () {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  var cloned = /*#__PURE__*/(0, _react.cloneElement)(props.children, {
    itemRef: ref
  });
  if (inView) return cloned;
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: props.className
  }, props.groupProps, {
    ref: ref
  }));
};
var _default = InViewPort;
exports.default = _default;